import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface Keywords {
  nate: string[];
  zum: string[];
}

const getSearchUrl = (platform: string, keyword: string) => {
  switch (platform) {
    case '네이트':
      return `https://search.nate.com/search/all?q=${encodeURIComponent(keyword)}`;
    case '줌':
      return `https://search.zum.com/search.zum?query=${encodeURIComponent(keyword)}`;
    default:
      return '#';
  }
};

const KeywordList = ({ title, keywords, isLoading, platform }: { title: string; keywords: string[]; isLoading: boolean; platform: 'nate' | 'zum' }) => (
  <div className={`keyword-card ${platform}`}>
    <h2 className="card-title">{title}</h2>
    <ul className="keyword-list">
      {isLoading
        ? Array.from({ length: 10 }).map((_, i) => <li key={i} className="skeleton-item" />)
        : keywords.length > 0
          ? keywords.map((kw, i) => (
              <li key={i}>
                <a href={getSearchUrl(title, kw)} target="_blank" rel="noopener noreferrer">
                  <span className="rank">{i + 1}.</span>
                  <span className="keyword-text">{kw}</span>
                  <span className="link-icon"><FaExternalLinkAlt /></span>
                </a>
              </li>
            ))
          : <li className="no-data">데이터를 불러올 수 없습니다.</li>
      }
    </ul>
  </div>
);


export default function RealtimeKeywords() {
  const [keywords, setKeywords] = useState<Keywords | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const fetchKeywords = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<Keywords>('/api/realtime-keywords');
        setKeywords(data);
        setLastUpdated(new Date().toLocaleString('ko-KR', { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }));
      } catch (error) {
        console.error('Failed to fetch keywords:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchKeywords();
  }, []);

  return (
    <>
      <Head>
        <title>실시간 검색어 - 해리의 UtilityTools</title>
        <meta name="description" content="Nate, Zum의 실시간 검색어 순위를 확인하세요." />
      </Head>
      <div className="container">
        <div className="title-section">
          <h1 className="main-title">실시간 검색어 순위</h1>
          <p className="subtitle">
            주요 포털의 실시간 트렌드를 확인해보세요.
            {lastUpdated && <span className="timestamp">마지막 업데이트: {lastUpdated}</span>}
          </p>
        </div>
        <div className="grid-container">
          <KeywordList title="네이트" platform="nate" keywords={keywords?.nate || []} isLoading={isLoading} />
          <KeywordList title="줌" platform="zum" keywords={keywords?.zum || []} isLoading={isLoading} />
        </div>
      </div>
      <style jsx global>{`
        /* General */
        .container {
          padding: 3rem 1.5rem 6rem;
          background-color: #f7f8fa; /* A slightly different, clean background */
          min-height: 100vh;
        }

        /* Title Section */
        .title-section {
          max-width: 1200px;
          margin: 0 auto 4.5rem;
          text-align: center;
        }
        .main-title {
          font-size: 3rem;
          font-weight: 900; /* Bolder */
          color: #1a1a1a;
          margin-bottom: 1rem;
        }
        .subtitle {
          font-size: 1.125rem;
          color: #666;
        }
        .timestamp {
          font-size: 0.9rem;
          color: #888;
          display: block;
          margin-top: 1rem;
        }

        /* Grid & Cards */
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
          max-width: 800px; /* Adjusted max-width for 2 cards */
          margin: 0 auto;
        }
        .keyword-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 2.5rem; /* More padding */
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.07);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-top: 4px solid; /* Colored top border for distinction */
        }
        /* --- Card-specific Colors --- */
        .keyword-card.nate { border-color: #00c73c; /* Nate Green */ }
        .keyword-card.zum { border-color: #eb4e28; /* Zum Red */ }

        .keyword-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.1);
        }
        .card-title {
          font-size: 1.75rem; /* Larger card title */
          font-weight: 800;
          text-align: center;
          margin: 0 0 2.5rem 0;
          color: #333;
        }

        /* Keyword List */
        .keyword-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .keyword-list li a {
          display: flex;
          align-items: center;
          padding: 0.9rem 0.6rem;
          border-radius: 10px;
          text-decoration: none;
          transition: background-color 0.2s ease, transform 0.2s ease;
          color: inherit;
        }

        /* --- Hover effects with colors --- */
        .keyword-card.nate .keyword-list li a:hover { background-color: #e6f9ec; }
        .keyword-card.zum .keyword-list li a:hover { background-color: #fdf0ed; }
        
        .keyword-list li a:hover {
          transform: translateX(5px);
        }
        
        .keyword-list li a:hover .keyword-text {
          font-weight: 700;
        }
        .keyword-card.nate .keyword-list li a:hover .keyword-text { color: #008a29; }
        .keyword-card.zum .keyword-list li a:hover .keyword-text { color: #c83a1a; }
        
        .rank {
          font-weight: 700;
          color: #aaa;
          width: 2.8rem;
          font-size: 1rem;
          font-style: italic;
        }
        .keyword-text {
          color: #444;
          flex-grow: 1;
          font-size: 1.05rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .link-icon {
          color: #ccc;
          font-size: 0.85rem;
          opacity: 0.5;
          transition: all 0.2s ease;
        }
        .keyword-card.nate .keyword-list li a:hover .link-icon { color: #00c73c; }
        .keyword-card.zum .keyword-list li a:hover .link-icon { color: #eb4e28; }
        

        /* Loading / No Data States */
        .skeleton-item, .no-data {
          height: 3rem;
          border-radius: 10px;
          margin-bottom: 0.8rem;
        }
        .skeleton-item {
          background-color: #f0f0f0;
          animation: skeleton-loading 1.5s infinite ease-in-out;
        }
        .no-data {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #999;
          background-color: #f7f8fa;
          font-weight: 500;
        }
        @keyframes skeleton-loading {
          0%, 100% { background-color: #f0f0f0; }
          50% { background-color: #e0e0e0; }
        }
      `}</style>
    </>
  );
} 