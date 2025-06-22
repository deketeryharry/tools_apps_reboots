import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { createHmac } from 'crypto';

async function getNaverSearchData(keyword: string) {
  const url = `https://openapi.naver.com/v1/search/blog.json?query=${encodeURIComponent(keyword)}&display=10`;
  const headers = {
    'X-Naver-Client-Id': process.env.NAVER_SEARCH_CLIENT_ID!,
    'X-Naver-Client-Secret': process.env.NAVER_SEARCH_CLIENT_SECRET!
  };
  const response = await axios.get(url, { headers });
  return response.data;
}

async function getRelKeywords(keyword: string) {
  const url = 'https://api.naver.com/keywordstool';
  const timestamp = new Date().getTime().toString();
  const hmac = createHmac('sha256', process.env.NAVER_AD_SECRET_KEY!)
    .update(`${timestamp}.GET./keywordstool`)
    .digest('base64');
  
  const headers = {
    'X-Timestamp': timestamp,
    'X-API-KEY': process.env.NAVER_AD_API_KEY!,
    'X-Customer': process.env.NAVER_AD_CUSTOMER_ID!,
    'X-Signature': hmac,
    'Content-Type': 'application/json'
  };
  
  try {
    const response = await axios.get(url, { 
      headers,
      params: {
        siteId: '',
        biztpId: '',
        hintKeywords: keyword,
        event: '',
        month: '',
        showDetail: '1'
      }
    });
    return response.data.keywordList || [];
  } catch(e) {
    console.error('Error fetching related keywords:', e);
    return [];
  }
}

async function getVwjs(keyword: string, type: 'pc' | 'mo') {
  const url = `https://m.search.naver.com/search.naver?sm=mtb_hty.top&where=m&oquery=${encodeURIComponent(keyword)}&tqi=hGaxVwp0J1sssCjc51Gssssss6w-085028&query=${encodeURIComponent(keyword)}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': type === 'pc' 
          ? 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          : 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1'
      }
    });
    const html = response.data;
    const $ = cheerio.load(html);
    const scriptTag = $('script:contains("VIEW_JS")').html();
    const match = scriptTag?.match(/var oView = (\{.*?\});/);
    return match ? JSON.parse(match[1]) : {};
  } catch (error) {
    console.error(`Error fetching ${type} vwjs:`, error);
    return {};
  }
}

async function getDatalab(keyword: string) {
  const url = 'https://openapi.naver.com/v1/datalab/search';
  const requestBody = {
    "startDate": "2023-01-01",
    "endDate": new Date().toISOString().split('T')[0],
    "timeUnit": "date",
    "keywordGroups": [
      {
        "groupName": keyword,
        "keywords": [keyword]
      }
    ]
  };
  const headers = {
    'X-Naver-Client-Id': process.env.NAVER_DATALAB_CLIENT_ID!,
    'X-Naver-Client-Secret': process.env.NAVER_DATALAB_CLIENT_SECRET!,
    'Content-Type': 'application/json'
  };
  try {
    const response = await axios.post(url, requestBody, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching datalab:', error);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { keyword_give: keyword, part } = req.query;

  if (typeof keyword !== 'string') {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  try {
    if (part === 'main') {
      const [naverSearchData, relKeywords] = await Promise.all([
        getNaverSearchData(keyword).catch(e => { console.error("Error in getNaverSearchData:", e.message); return null; }),
        getRelKeywords(keyword).catch(e => { console.error("Error in getRelKeywords:", e.message); return []; }),
      ]);
      
      const keywordAmount = (relKeywords?.find((k: any) => k.relKeyword === keyword.replace(/\s/g, '')) || {});
      const processedBlogData = naverSearchData?.items.map((blog: any) => {
        const link = blog.link;
        const blogType = link.includes('naver.com') ? 'N' :
                         link.includes('tistory.com') ? 'T' :
                         link.includes('daum.net') ? 'D' : 'E';
        return {
          ...blog,
          블로그링크: blog.link,
          블로그제목: blog.title.replace(/<[^>]*>/g, '').trim(),
          발행날짜: blog.postdate ? `${blog.postdate.slice(0,4)}-${blog.postdate.slice(4,6)}-${blog.postdate.slice(6,8)}` : '',
          블로그타입: blogType,
          블로그이름: blog.bloggername,
        };
      }) || [];

      return res.status(200).json({
        keyword_amount: { ...keywordAmount, relKeyword: keyword },
        keyword_amount_10: relKeywords || [],
        docs_amount: { totaldoc: naverSearchData?.total || 0 },
        blog_pc_10: processedBlogData,
      });
    }

    if (part === 'tabs') {
      const [vwjsPC, vwjsMO] = await Promise.all([
        getVwjs(keyword, 'pc').catch(e => { console.error("Error in getVwjs (pc):", e.message); return {}; }),
        getVwjs(keyword, 'mo').catch(e => { console.error("Error in getVwjs (mo):", e.message); return {}; }),
      ]);
      return res.status(200).json({ vwjs_PC: vwjsPC, vwjs_MO: vwjsMO });
    }

    if (part === 'datalab') {
      const datalab30 = await getDatalab(keyword).catch(e => { console.error("Error in getDatalab:", e.message); return null; });
      return res.status(200).json({ datalab_30: datalab30 });
    }

    return res.status(400).json({ error: 'Invalid part specified' });

  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
} 