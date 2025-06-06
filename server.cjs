const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

console.log('서버 코드가 실행되고 있습니다!');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// 네이버 검색광고 API (키워드 검색량)
async function getKeywordSearchCount(keyword) {
  const API_KEY = process.env.NAVER_AD_API_KEY;
  const SECRET_KEY = process.env.NAVER_AD_SECRET_KEY;
  const CUSTOMER_ID = process.env.NAVER_AD_CUSTOMER_ID;
  const BASE_URL = 'https://api.naver.com';
  const uri = '/keywordstool';
  const method = 'GET';
  const timestamp = String(Date.now());
  const keywordNoSpace = keyword.replace(/\s/g, '');
  const params = { hintKeywords: keywordNoSpace };

  const message = `${timestamp}.${method}.${uri}`;
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', SECRET_KEY);
  hmac.update(message);
  const signature = hmac.digest('base64');

  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Timestamp': timestamp,
    'X-API-KEY': API_KEY,
    'X-Customer': CUSTOMER_ID,
    'X-Signature': signature,
  };

  try {
    const response = await axios.get(BASE_URL + uri, { params, headers });
    const data = response.data;
    const keywordList = data.keywordList || [];
    // 공백 없는 버전이 있으면 그걸 우선 반환, 없으면 첫 번째
    const mainKeyword = keywordList.find(k => k.relKeyword === keywordNoSpace) || keywordList[0] || {};
    return [mainKeyword, keywordList.slice(0, 10)];
  } catch (error) {
    console.error('Error fetching keyword search count:', error);
    return [{}, []];
  }
}

// 네이버 블로그 문서량
async function getDocsCount(keyword) {
  const client_id = process.env.NAVER_BLOG_CLIENT_ID;
  const client_secret = process.env.NAVER_BLOG_CLIENT_SECRET;
  const url = `https://openapi.naver.com/v1/search/blog?query=${encodeURIComponent(keyword)}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret,
      },
    });
    return { totaldoc: response.data.total || 0 };
  } catch (error) {
    console.error('Error fetching docs count:', error);
    return { totaldoc: 0 };
  }
}

// 네이버 블로그 상위 10개
async function getBlogPC10(keyword) {
  const client_id = process.env.NAVER_BLOG_CLIENT_ID;
  const client_secret = process.env.NAVER_BLOG_CLIENT_SECRET;
  const url = `https://openapi.naver.com/v1/search/blog?query=${encodeURIComponent(keyword)}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret,
      },
    });

    return response.data.items.map(blog => {
      const link = blog.link;
      const title = blog.title.replace(/<[^>]*>/g, '').trim();
      let date = '';
      if (blog.postdate && /^\d{8}$/.test(blog.postdate)) {
        // YYYYMMDD 형식일 때만 파싱
        date = new Date(
          blog.postdate.slice(0, 4) + '-' +
          blog.postdate.slice(4, 6) + '-' +
          blog.postdate.slice(6, 8)
        ).toISOString().split('T')[0];
      } else {
        date = '';
      }
      const bloggerName = blog.bloggername.slice(0, 6);
      const blogType = link.includes('naver') ? 'N' :
                      link.includes('tistory') ? 'T' :
                      link.includes('daum') ? 'D' : 'E';

      return {
        블로그링크: link,
        블로그제목: title,
        발행날짜: date,
        블로그타입: blogType,
        블로그이름: bloggerName
      };
    });
  } catch (error) {
    console.error('Error fetching blog PC 10:', error);
    return [];
  }
}

// 네이버 데이터랩 API (최근 30일 트렌드)
async function getDatalabData(keyword) {
  const client_id = process.env.NAVER_DATALAB_CLIENT_ID;
  const client_secret = process.env.NAVER_DATALAB_CLIENT_SECRET;
  const url = 'https://openapi.naver.com/v1/datalab/search';

  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const body = {
    startDate: monthAgo.toISOString().split('T')[0],
    endDate: yesterday.toISOString().split('T')[0],
    timeUnit: 'date',
    keywordGroups: [
      { groupName: keyword, keywords: [keyword] }
    ],
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching datalab data:', error);
    return { results: [{ data: [] }] };
  }
}

// 탭순서 (PC)
async function getTabOrderPC(keyword) {
  try {
    const response = await axios.get(`https://search.naver.com/search.naver?query=${encodeURIComponent(keyword)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    const sections = [];
    $('.main_pack section h2').each((i, el) => {
        let title = $(el).text().trim();
        if(title) sections.push(title);
    });

    const result = {};
    const tabsToFind = ['VIEW', '지식iN', '쇼핑', '뉴스', '동영상', '이미지', '블로그', '카페'];
    tabsToFind.forEach(tab => {
        const foundIndex = sections.findIndex(s => s.includes(tab));
        result[tab] = foundIndex !== -1 ? foundIndex + 1 : 'X';
    });

    return result;
  } catch (error) {
    console.error('Error fetching PC tab order:', error);
    return {};
  }
}

// 탭순서 (MO)
async function getTabOrderMO(keyword) {
  try {
    const response = await axios.get(`https://m.search.naver.com/search.naver?query=${encodeURIComponent(keyword)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1'
      }
    });
    const $ = cheerio.load(response.data);
    const sections = [];
     $('#container section h2').each((i, el) => {
        let title = $(el).text().trim();
        if(title) sections.push(title);
    });

    const result = {};
    const tabsToFind = ['VIEW', '지식iN', '쇼핑', '뉴스', '동영상', '이미지', '블로그', '카페'];
    tabsToFind.forEach(tab => {
        const foundIndex = sections.findIndex(s => s.includes(tab));
        result[tab] = foundIndex !== -1 ? foundIndex + 1 : 'X';
    });

    return result;
  } catch (error) {
    console.error('Error fetching MO tab order:', error);
    return {};
  }
}

// 자동완성 키워드
async function getAutoKeywords(keyword) {
  const chosungList = ['', 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  const randomChosung = chosungList.sort(() => Math.random() - 0.5).slice(0, 5);
  
  try {
    const promises = randomChosung.map(chosung => 
      axios.get(`https://mac.search.naver.com/m/ac?q_enc=UTF-8&st=1&frm=mobile_nv&r_format=json&r_enc=UTF-8&r_unicode=0&t_koreng=1&q=${encodeURIComponent(keyword + ' ' + chosung)}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
        }
      })
    );

    const responses = await Promise.all(promises);
    const allKeywords = responses.flatMap(response => response.data.items);
    const uniqueKeywords = [...new Set(allKeywords.flat())];
    
    return uniqueKeywords;
  } catch (error) {
    console.error('Error fetching auto keywords:', error);
    throw error;
  }
}

// API 엔드포인트
app.get('/api/list_1', async (req, res) => {
  console.log('API 요청 도착:', req.query);
  console.log('API 요청 핸들러 진입!');
  try {
    console.log('요청 들어옴:', req.query);
    const keyword = req.query.keyword_give;
    if (!keyword) {
      return res.status(400).json({ error: 'No keyword provided' });
    }

    const [keywordAmountRaw, keywordAmount10Raw] = await getKeywordSearchCount(keyword);
    const docsAmountRaw = await getDocsCount(keyword);
    const blogPC10Raw = await getBlogPC10(keyword);
    const datalab30Raw = await getDatalabData(keyword);
    const vwjsPCRaw = await getTabOrderPC(keyword);
    const vwjsMORaw = await getTabOrderMO(keyword);

    // 안전하게 기본값 처리 (각 필드별)
    const keywordAmount = keywordAmountRaw || {};
    const relKeyword = keywordAmount.relKeyword || '';
    const monthlyPcQcCnt = keywordAmount.monthlyPcQcCnt || 0;
    const monthlyMobileQcCnt = keywordAmount.monthlyMobileQcCnt || 0;
    const monthlySumQcCnt = monthlyPcQcCnt + monthlyMobileQcCnt;
    const keywordAmount10 = Array.isArray(keywordAmount10Raw) ? keywordAmount10Raw : [];
    const docsAmount = docsAmountRaw || {};
    const totalDoc = docsAmount.totaldoc || 0;
    const blogPC10 = Array.isArray(blogPC10Raw) ? blogPC10Raw : [];
    const blogPcType = blogPC10.map(b => b.블로그타입 || '').join('');
    const datalab30 = datalab30Raw || { results: [{ data: [] }] };
    const vwjsPC = vwjsPCRaw || {};
    const vwjsMO = vwjsMORaw || {};

    res.json({
      keyword_amount: {
        relKeyword,
        monthlyPcQcCnt,
        monthlyMobileQcCnt,
        monthlySumQcCnt
      },
      keyword_amount_10: keywordAmount10,
      docs_amount: { totaldoc: totalDoc },
      blog_pc_10: blogPC10,
      vwjs_PC: vwjsPC,
      vwjs_MO: vwjsMO,
      datalab_30: datalab30
    });
  } catch (error) {
    console.error('Error in /api/list_1:', error.stack);
    res.status(500).json({ error: error.message || 'An unexpected error occurred.' });
  }
});

app.get('/api/list_4', async (req, res) => {
  try {
    const keyword = req.query.keyword_give;
    if (!keyword) {
      return res.status(400).json({ error: 'No keyword provided' });
    }

    const autoKeywords = await getAutoKeywords(keyword);
    res.json({ auto_keyword: autoKeywords });
  } catch (error) {
    console.error('Error in /api/list_4:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 