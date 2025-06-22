import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as cheerio from 'cheerio';
import iconv from 'iconv-lite';
import googleTrends from 'google-trends-api';

const cleanKeyword = (keyword: string) => {
  // Removes leading digits and any non-letter/number characters at the start.
  // This handles cases like "1. 키워드", "1키워드", "1.1위 키워드"
  return keyword.replace(/^\d+\.?\s*/, '').trim();
};

async function getNateKeywords() {
  try {
    const now = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 12);
    const url = `https://www.nate.com/js/data/jsonLiveKeywordDataV1.js?v=${now}`;
    const { data } = await axios.get(url, { responseType: 'arraybuffer' });
    const decodedData = iconv.decode(data, 'EUC-KR');
    const keywordList = JSON.parse(decodedData);
    return keywordList.map((item: [string, string]) => cleanKeyword(item[1])).slice(0, 10);
  } catch (error) {
    console.error('Error fetching Nate keywords:', error);
    return [];
  }
}

async function getZumKeywords() {
  try {
    const url = 'https://m.search.zum.com/search.zum?method=uni&option=accu&qm=f_typing.top&query=';
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const keywords: string[] = [];
    $('div.list_wrap.animate span.keyword').each((_, el) => {
      const rawText = $(el).text().trim();
      // Zum keywords are like "1키워드", so we remove the leading digits.
      const cleanedKeyword = rawText.replace(/^\d+/, '').trim();
      keywords.push(cleanedKeyword);
    });
    return keywords.slice(0, 10);
  } catch (error) {
    console.error('Error fetching Zum keywords:', error);
    return [];
  }
}

async function getGoogleKeywords() {
  try {
    const response = await googleTrends.dailyTrends({ geo: 'KR', hl: 'ko' });
    const trends = JSON.parse(response);
    return trends.default.trendingSearchesDays[0].trendingSearches.map((t: any) => t.title.query).slice(0, 10);
  } catch (err) {
    console.error('Error fetching Google keywords:', err);
    return [];
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const [nate, zum, google] = await Promise.all([
    getNateKeywords(),
    getZumKeywords(),
    getGoogleKeywords(),
  ]);

  res.status(200).json({ nate, zum, google });
} 