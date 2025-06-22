import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';

interface Keywords {
  nate: string[];
  zum: string[];
  google: string[];
}

const KeywordList = ({ title, keywords, isLoading, logo }: { title: string; keywords: string[]; isLoading: boolean; logo: string }) => (
  <div className="keyword-card">
    <h2 className="card-title">
      <img src={logo} alt={`${title} logo`} style={{ height: '20px', marginRight: '8px', verticalAlign: 'middle' }} />
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
            <span className="rank">{i + 1}</span>
            <span className="keyword-text">{kw}</span>
          </li>
        ))
      )}
    </ol>
  </div>
);


export default function RealtimeKeywords() {
  const [keywords, setKeywords] = useState<Keywords | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchKeywords() {
      try {
        setIsLoading(true);
        const { data } = await axios.get<Keywords>('/api/realtime-keywords');
        setKeywords(data);
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
        <p className="subtitle">Nate, Zum, Google의 실시간 트렌드를 확인해보세요.</p>
        <div className="grid-container">
          <KeywordList 
            title="네이트" 
            keywords={keywords?.nate || []} 
            isLoading={isLoading}
            logo="https://raw.githubusercontent.com/deketeryharry/tools_apps_reboots/main/public/nate_logo.png"
          />
          <KeywordList 
            title="줌" 
            keywords={keywords?.zum || []} 
            isLoading={isLoading}
            logo="https://raw.githubusercontent.com/deketeryharry/tools_apps_reboots/main/public/zum_logo.png"
          />
          <KeywordList 
            title="구글 트렌드" 
            keywords={keywords?.google || []} 
            isLoading={isLoading}
            logo="https://raw.githubusercontent.com/deketeryharry/tools_apps_reboots/main/public/google_logo.png"
          />
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px 60px 20px;
        }
        .main-title {
          text-align: center;
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .subtitle {
          text-align: center;
          color: #6c757d;
          margin-bottom: 3rem;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .keyword-card {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }
        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 0;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 1rem;
          display: flex;
          align-items: center;
        }
        .keyword-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .keyword-list li {
          display: flex;
          align-items: center;
          font-size: 1rem;
          margin-bottom: 0.8rem;
        }
        .rank {
          font-weight: 600;
          color: #3182f6;
          width: 2rem;
          text-align: center;
        }
        .keyword-text {
          color: #343a40;
        }
        .skeleton-item {
          height: 1.5rem;
          background-color: #f0f2f5;
          border-radius: 4px;
          animation: skeleton-loading 1.5s infinite ease-in-out;
        }
        @keyframes skeleton-loading {
          0% { background-color: #f0f2f5; }
          50% { background-color: #e2e8f0; }
          100% { background-color: #f0f2f5; }
        }
      `}</style>
    </>
  );
} 