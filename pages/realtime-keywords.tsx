import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface Keywords {
  nate: string[];
  zum: string[];
  google: string[];
}

const getSearchUrl = (platform: string, keyword: string) => {
  switch (platform) {
    case '네이트':
      return `https://search.nate.com/search/all?q=${encodeURIComponent(keyword)}`;
    case '줌':
      return `https://search.zum.com/search.zum?query=${encodeURIComponent(keyword)}`;
    case '구글':
      return `https://www.google.com/search?q=${encodeURIComponent(keyword)}`;
    default:
      return '#';
  }
};

const KeywordList = ({ title, keywords, isLoading }: { title: string; keywords: string[]; isLoading: boolean; }) => (
  <div className="keyword-card">
    <h2 className="card-title">{title}</h2>
    <div className="keyword-list">
      {isLoading
        ? Array.from({ length: 10 }).map((_, i) => <div key={i} className="skeleton-item" />)
        : keywords.length > 0
          ? keywords.map((kw, i) => (
              <a key={kw + i} href={getSearchUrl(title, kw)} target="_blank" rel="noopener noreferrer" className="keyword-item">
                <span className="rank">{i + 1}</span>
                <span className="keyword-text">{kw}</span>
                <span className="link-icon"><FaExternalLinkAlt /></span>
              </a>
            ))
          : <div className="no-data">데이터를 불러올 수 없습니다.</div>
      }
    </div>
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
        <meta name="description" content="Nate, Zum, Google의 실시간 검색어 순위를 확인하세요." />
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
          <KeywordList title="네이트" keywords={keywords?.nate || []} isLoading={isLoading} />
          <KeywordList title="줌" keywords={keywords?.zum || []} isLoading={isLoading} />
          <KeywordList title="구글" keywords={keywords?.google || []} isLoading={isLoading} />
        </div>
      </div>
      <style jsx>{`
        .container {
          padding: 2rem 1.5rem 4rem;
          background-color: #f8f9fa;
        }
        .title-section {
          max-width: 1200px;
          margin: 0 auto 3.5rem;
          text-align: center;
        }
        .main-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #212529;
          margin-bottom: 0.75rem;
        }
        .subtitle {
          font-size: 1.1rem;
          color: #495057;
        }
        .timestamp {
          font-size: 0.9rem;
          color: #868e96;
          display: block;
          margin-top: 0.75rem;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .keyword-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          border: 1px solid #e9ecef;
        }
        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          margin: 0 0 2rem 0;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e9ecef;
          color: #343a40;
        }
        .keyword-list {
          padding: 0;
          margin: 0;
        }
        .keyword-item {
          display: flex;
          align-items: center;
          padding: 0.8rem 0.5rem;
          border-radius: 8px;
          text-decoration: none;
          transition: background-color 0.2s ease, color 0.2s ease;
          color: inherit;
        }
        .keyword-item:hover {
          background-color: #eef5ff;
        }
        .keyword-item:hover .keyword-text {
          color: #3182f6;
          font-weight: 600;
        }
        .rank {
          font-weight: 600;
          font-style: italic;
          color: #868e96;
          width: 2.5rem;
          text-align: center;
          font-size: 1rem;
        }
        .keyword-text {
          color: #495057;
          flex-grow: 1;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .link-icon {
          color: #ced4da;
          font-size: 0.8rem;
          opacity: 0;
          transition: all 0.2s ease;
        }
        .keyword-item:hover .link-icon {
          opacity: 1;
          color: #3182f6;
        }
        .skeleton-item, .no-data {
          height: 2.8rem;
          border-radius: 8px;
          margin-bottom: 0.75rem;
        }
        .skeleton-item {
          background-color: #f1f3f5;
          animation: skeleton-loading 1.5s infinite ease-in-out;
        }
        .no-data {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #adb5bd;
          background-color: #f8f9fa;
        }
        @keyframes skeleton-loading {
          0% { background-color: #f1f3f5; }
          50% { background-color: #e9ecef; }
          100% { background-color: #f1f3f5; }
        }
      `}</style>
    </>
  );
} 