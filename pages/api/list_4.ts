import { NextApiRequest, NextApiResponse } from 'next';
import { createHmac } from 'crypto';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { keyword_give: keyword } = req.query;

  if (typeof keyword !== 'string') {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  const apiKey = process.env.NAVER_AD_API_KEY!;
  const secretKey = process.env.NAVER_AD_SECRET_KEY!;
  const customerId = process.env.NAVER_AD_CUSTOMER_ID!;
  const timestamp = Date.now().toString();
  const method = 'GET';
  const uri = '/keywordstool';
  const signature = createHmac('sha256', secretKey)
    .update(`${timestamp}.${method}.${uri}`)
    .digest('base64');

  try {
    const response = await axios.get(`https://api.naver.com${uri}`, {
      headers: {
        'X-Timestamp': timestamp,
        'X-API-KEY': apiKey,
        'X-Customer': customerId,
        'X-Signature': signature,
      },
      params: { hintKeywords: keyword, showDetail: 1 },
    });

    const keywords = response.data.keywordList.map((item: any) => item.relKeyword);
    res.status(200).json({ auto_keyword: keywords });
  } catch (error: any) {
    console.error('Error fetching related keywords:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch related keywords' });
  }
} 