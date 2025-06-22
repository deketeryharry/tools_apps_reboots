import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as cheerio from 'cheerio';
import iconv from 'iconv-lite';
import googleTrends from 'google-trends-api';

async function getNateKeywords() {
  try {
    const now = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 12);
    const url = `https://www.nate.com/js/data/jsonLiveKeywordDataV1.js?v=${now}`;
    const { data } = await axios.get(url, { responseType: 'arraybuffer' });
    const decodedData = iconv.decode(data, 'EUC-KR');
    const keywordList = JSON.parse(decodedData);
    return keywordList.map((item: [string, string]) => item[1]).slice(0, 10);
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
    const results = await googleTrends.dailyTrends({ geo: 'KR' });
    const trends = JSON.parse(results).default.trendingSearchesDays[0].trendingSearches;
    return trends.map((trend: any) => trend.title.query).slice(0, 10);
  } catch (error) {
    console.error('Error fetching Google keywords:', error);
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