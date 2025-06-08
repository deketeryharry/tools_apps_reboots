import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as cheerio from 'cheerio';

async function getKeywordSearchCount(keyword: string) {
  const API_KEY = process.env.NAVER_AD_API_KEY!;
  const SECRET_KEY = process.env.NAVER_AD_SECRET_KEY!;
  const CUSTOMER_ID = process.env.NAVER_AD_CUSTOMER_ID!;
  const BASE_URL = 'https://api.naver.com';
  const uri = '/keywordstool';
  const method = 'GET';
  const timestamp = String(Date.now());
  const keywordNoSpace = keyword.replace(/\s/g, '');
  const params = { hintKeywords: keywordNoSpace };
  const message = `${timestamp}.${method}.${uri}`;
  const crypto = await import('crypto');
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
    const mainKeyword = keywordList.find((k: any) => k.relKeyword === keywordNoSpace) || keywordList[0] || {};
    return [mainKeyword, keywordList.slice(0, 10)];
  } catch (error) {
    return [{}, []];
  }
}

async function getDocsCount(keyword: string) {
  const client_id = process.env.NAVER_BLOG_CLIENT_ID!;
  const client_secret = process.env.NAVER_BLOG_CLIENT_SECRET!;
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
    return { totaldoc: 0 };
  }
}

async function getBlogPC10(keyword: string) {
  const client_id = process.env.NAVER_BLOG_CLIENT_ID!;
  const client_secret = process.env.NAVER_BLOG_CLIENT_SECRET!;
  const url = `https://openapi.naver.com/v1/search/blog?query=${encodeURIComponent(keyword)}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret,
      },
    });
    return response.data.items.map((blog: any) => {
      const link = blog.link;
      const title = blog.title.replace(/<[^>]*>/g, '').trim();
      let date = '';
      if (blog.postdate && /^\d{8}$/.test(blog.postdate)) {
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
    return [];
  }
}

async function getDatalabData(keyword: string) {
  const client_id = process.env.NAVER_DATALAB_CLIENT_ID!;
  const client_secret = process.env.NAVER_DATALAB_CLIENT_SECRET!;
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
    return { results: [{ data: [] }] };
  }
}

async function getTabOrderPC(keyword: string) {
  try {
    const response = await axios.get(`https://search.naver.com/search.naver?query=${encodeURIComponent(keyword)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    const sections: string[] = [];
    $('.main_pack section h2').each((i, el) => {
        let title = $(el).text().trim();
        if(title) sections.push(title);
    });
    const result: Record<string, string|number> = {};
    const tabsToFind = ['VIEW', '지식iN', '쇼핑', '뉴스', '동영상', '이미지', '블로그', '카페'];
    tabsToFind.forEach(tab => {
        const foundIndex = sections.findIndex(s => s.includes(tab));
        result[tab] = foundIndex !== -1 ? foundIndex + 1 : 'X';
    });
    return result;
  } catch (error) {
    return {};
  }
}

async function getTabOrderMO(keyword: string) {
  try {
    const response = await axios.get(`https://m.search.naver.com/search.naver?query=${encodeURIComponent(keyword)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1'
      }
    });
    const $ = cheerio.load(response.data);
    const sections: string[] = [];
     $('#container section h2').each((i, el) => {
        let title = $(el).text().trim();
        if(title) sections.push(title);
    });
    const result: Record<string, string|number> = {};
    const tabsToFind = ['VIEW', '지식iN', '쇼핑', '뉴스', '동영상', '이미지', '블로그', '카페'];
    tabsToFind.forEach(tab => {
        const foundIndex = sections.findIndex(s => s.includes(tab));
        result[tab] = foundIndex !== -1 ? foundIndex + 1 : 'X';
    });
    return result;
  } catch (error) {
    return {};
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const keyword = req.query.keyword_give as string;
    if (!keyword) {
      return res.status(400).json({ error: 'No keyword provided' });
    }
    const [keywordAmountRaw, keywordAmount10Raw] = await getKeywordSearchCount(keyword);
    console.log('NAVER_AD_API 응답:', keywordAmountRaw, keywordAmount10Raw);
    const docsAmountRaw = await getDocsCount(keyword);
    console.log('NAVER_BLOG_API 응답:', docsAmountRaw);
    const blogPC10Raw = await getBlogPC10(keyword);
    console.log('NAVER_BLOG_PC10 응답:', blogPC10Raw);
    const datalab30Raw = await getDatalabData(keyword);
    console.log('NAVER_DATALAB 응답:', datalab30Raw);
    const vwjsPCRaw = await getTabOrderPC(keyword);
    const vwjsMORaw = await getTabOrderMO(keyword);
    const keywordAmount = keywordAmountRaw || {};
    const relKeyword = keywordAmount.relKeyword || '';
    const monthlyPcQcCnt = keywordAmount.monthlyPcQcCnt || 0;
    const monthlyMobileQcCnt = keywordAmount.monthlyMobileQcCnt || 0;
    const monthlySumQcCnt = monthlyPcQcCnt + monthlyMobileQcCnt;
    const keywordAmount10 = Array.isArray(keywordAmount10Raw) ? keywordAmount10Raw : [];
    const docsAmount = docsAmountRaw || {};
    const totalDoc = docsAmount.totaldoc || 0;
    const blogPC10 = Array.isArray(blogPC10Raw) ? blogPC10Raw : [];
    const blogPcType = blogPC10.map((b: any) => b.블로그타입 || '').join('');
    const datalab30 = datalab30Raw || { results: [{ data: [] }] };
    const vwjsPC = vwjsPCRaw || {};
    const vwjsMO = vwjsMORaw || {};
    res.json({
      debug: {
        keywordAmountRaw,
        keywordAmount10Raw,
        docsAmountRaw,
        blogPC10Raw,
        datalab30Raw
      },
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
  } catch (error: any) {
    console.error('API ERROR:', error);
    res.status(500).json({ error: error.message || 'An unexpected error occurred.', debug: error });
  }
} 