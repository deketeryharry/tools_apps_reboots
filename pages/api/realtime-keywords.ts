import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as cheerio from 'cheerio';
import iconv from 'iconv-lite';
import googleTrends from 'google-trends-api';

const cleanKeyword = (keyword: string) => {
  // Matches patterns like "1. " or "2." at the start, handles cases like "1.1위"
  return keyword.replace(/^\d+\.\s*/, '');
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
    // Use the specific selector for the keyword text to avoid including the rank number
    $('a.keyword span.txt', 'div.list_wrap.animate').each((_, el) => {
      keywords.push($(el).text().trim());
    });
    return keywords.slice(0, 10);
  } catch (error) {
    console.error('Error fetching Zum keywords:', error);
    return [];
  }
}

async function getGoogleKeywords() {
  try {
    const response = await googleTrends.dailyTrends({ geo: 'KR', hl: 'ko-KR' });
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