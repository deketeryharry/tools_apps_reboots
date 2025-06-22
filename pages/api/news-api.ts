import type { NextApiRequest, NextApiResponse } from 'next';

interface NewsResponse {
  title?: string;
  desc?: string;
  img?: string;
  error?: string;
}

// HTML 태그를 제거하는 함수
const removeHtmlTags = (str: string) => str ? str.replace(/<[^>]*>?/gm, '') : '';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { keyword } = req.body;
  if (!keyword || typeof keyword !== 'string') {
    return res.status(400).json({ error: '키워드가 필요합니다.' });
  }

  const clientId = process.env.NAVER_SEARCH_CLIENT_ID;
  const clientSecret = process.env.NAVER_SEARCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: '네이버 API 클라이언트 ID 또는 시크릿이 설정되지 않았습니다. .env.local 파일을 확인해주세요.' });
  }

  try {
    const encodedKeyword = encodeURIComponent(keyword);
    const url = `https://openapi.naver.com/v1/search/news.json?query=${encodedKeyword}&display=1&sort=sim`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
      },
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('Naver API error:', data);
        throw new Error(data.errorMessage || `HTTP error! status: ${response.status}`);
    }

    if (data.items && data.items.length > 0) {
      const item = data.items[0];
      const newsData: NewsResponse = {
        title: removeHtmlTags(item.title),
        desc: removeHtmlTags(item.description),
        img: '', // 네이버 뉴스 API는 이미지 URL을 직접 제공하지 않습니다.
      };
      res.status(200).json(newsData);
    } else {
      res.status(404).json({ error: '해당 키워드로 뉴스를 찾을 수 없습니다.' });
    }
    
  } catch (error: any) {
    console.error('Naver News API error:', error);
    res.status(500).json({ error: `뉴스 검색 중 오류가 발생했습니다: ${error.message}` });
  }
} 