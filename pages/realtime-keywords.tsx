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
    case '구글 트렌드':
      return `https://www.google.com/search?q=${encodeURIComponent(keyword)}`;
    default:
      return '#';
  }
};

const KeywordList = ({ title, keywords, isLoading, logo }: { title: string; keywords: string[]; isLoading: boolean; logo: string }) => (
  <div className="keyword-card">
    <h2 className="card-title">
      <img src={logo} alt={`${title} logo`} />
      {title}
    </h2>
    <ol className="keyword-list">
      {isLoading ? (
        Array.from({ length: 10 }).map((_, i) => (
          <li key={i} className="skeleton-item" />
        ))
      ) : (
        keywords.map((kw, i) => (
          <li key={i}>
            <a href={getSearchUrl(title, kw)} target="_blank" rel="noopener noreferrer">
              <span className="rank">{i + 1}</span>
              <span className="keyword-text">{kw}</span>
              <span className="link-icon"><FaExternalLinkAlt /></span>
            </a>
          </li>
        ))
      )}
    </ol>
  </div>
);


export default function RealtimeKeywords() {
  const [keywords, setKeywords] = useState<Keywords | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    async function fetchKeywords() {
      try {
        setIsLoading(true);
        const { data } = await axios.get<Keywords>('/api/realtime-keywords');
        setKeywords(data);
        setLastUpdated(new Date().toLocaleString('ko-KR'));
      } catch (error) {
        console.error('Failed to fetch keywords:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchKeywords();
  }, []);

  return (
    <>
      <Head>
        <title>실시간 검색어 - 해리의 UtilityTools</title>
        <meta name="description" content="Nate, Zum, Google의 실시간 검색어 순위를 확인하세요." />
      </Head>
      <div className="container">
        <h1 className="main-title">실시간 검색어 순위</h1>
        <p className="subtitle">
          Nate, Zum, Google의 실시간 트렌드를 확인해보세요.
          {lastUpdated && <span className="timestamp"> (마지막 업데이트: {lastUpdated})</span>}
        </p>
        <div className="grid-container">
          <KeywordList 
            title="네이트" 
            keywords={keywords?.nate || []} 
            isLoading={isLoading}
            logo="https://www.nate.com/img/common/nate_logo_2020.png"
          />
          <KeywordList 
            title="줌" 
            keywords={keywords?.zum || []} 
            isLoading={isLoading}
            logo="https://raw.githubusercontent.com/deketeryharry/tools_apps_reboots/main/public/zum-logo-2021.png"
          />
          <KeywordList 
            title="구글 트렌드" 
            keywords={keywords?.google || []} 
            isLoading={isLoading}
            logo="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
          />
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 20px 60px 20px;
          background: #f8f9fa;
          min-height: 100vh;
        }
        .main-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: #212529;
        }
        .subtitle {
          text-align: center;
          color: #6c757d;
          margin-bottom: 3.5rem;
          font-size: 1.1rem;
        }
        .timestamp {
          font-size: 0.9rem;
          color: #868e96;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
        }
        .keyword-card {
          background: #fff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 8px 16px rgba(0,0,0,0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .keyword-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.08);
        }
        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 1.5rem 0;
          border-bottom: 1px solid #f1f3f5;
          padding-bottom: 1rem;
          display: flex;
          align-items: center;
        }
        .card-title img {
          height: 20px;
          margin-right: 12px;
          object-fit: contain;
        }
        .keyword-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .keyword-list li a {
          display: flex;
          align-items: center;
          padding: 0.75rem 0.5rem;
          border-radius: 8px;
          text-decoration: none;
          color: inherit;
          transition: background-color 0.2s ease;
        }
        .keyword-list li a:hover {
          background-color: #f8f9fa;
        }
        .keyword-list li a:hover .keyword-text {
          font-weight: 600;
        }
        .rank {
          font-weight: 700;
          color: #495057;
          width: 2.5rem;
          text-align: center;
          font-size: 1rem;
        }
        .keyword-text {
          color: #343a40;
          flex-grow: 1;
          font-size: 1rem;
          transition: font-weight 0.2s ease;
        }
        .link-icon {
          color: #adb5bd;
          font-size: 0.8rem;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .keyword-list li a:hover .link-icon {
          opacity: 1;
        }
        .skeleton-item {
          height: 2.5rem;
          background-color: #f1f3f5;
          border-radius: 8px;
          margin-bottom: 0.75rem;
          animation: skeleton-loading 1.5s infinite ease-in-out;
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