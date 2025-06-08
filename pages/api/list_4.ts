import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

async function getAutoKeywords(keyword: string) {
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
    throw error;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const keyword = req.query.keyword_give as string;
    if (!keyword) {
      return res.status(400).json({ error: 'No keyword provided' });
    }
    const autoKeywords = await getAutoKeywords(keyword);
    res.json({ auto_keyword: autoKeywords });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
} 