import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {
  FaTrophy,
  FaKeyboard,
  FaDice,
  FaSearch,
  FaCalculator,
  FaNewspaper,
  FaChartLine,
} from 'react-icons/fa'

const tools = [
  { name: '당첨자 추출기', href: '/random-selector', description: '목록에서 무작위로 당첨자를 선택합니다.', icon: <FaTrophy /> },
  { name: '글자수세기', href: '/word-counter', description: '텍스트의 글자, 단어, 공백 수를 계산합니다.', icon: <FaKeyboard /> },
  { name: '로또 추첨기', href: '/lotto-generator', description: '로또 번호를 무작위로 생성합니다.', icon: <FaDice /> },
  { name: '키워드 분석기', href: '/keyword-analyzer', description: '네이버 키워드 관련 데이터를 분석합니다.', icon: <FaSearch /> },
  { name: '연봉 계산기', href: '/salary-calculator', description: '연봉 실 수령액을 계산합니다.', icon: <FaCalculator /> },
  { name: '뉴스 분석기', href: '/news-analyzer', description: '뉴스 기사를 분석하고 요약합니다.', icon: <FaNewspaper /> },
  { name: '실시간 검색어', href: '/realtime-keywords', description: 'Nate, Zum, Google의 실시간 트렌드를 확인합니다.', icon: <FaChartLine /> },
]

const Home: NextPage = () => {
  return (
    <div style={{ background: '#f8f9fa' }}>
      <Head>
        <title>해리의 UtilityTools</title>
        <meta name="description" content="다양한 유틸리티 도구 모음" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 20px 60px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#212529' }}>Tools</h1>
          <p style={{ fontSize: '1.125rem', color: '#6c757d' }}>
            일상의 생산성을 높여주는 다양한 도구들을 만나보세요.
          </p>
        </div>
        <div className="tools-grid">
          {tools.map((tool) => (
            <Link key={tool.name} href={tool.href} className="tool-card">
              <div className="tool-icon">{tool.icon}</div>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '10px', color: '#343a40' }}>{tool.name}</h2>
              <p style={{ fontSize: '0.9rem', color: '#6c757d', margin: 0, lineHeight: 1.5 }}>{tool.description}</p>
            </Link>
          ))}
        </div>
      </main>
      <style jsx>{`
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 25px;
        }
        .tool-card {
          display: block;
          padding: 2.5rem;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          text-align: center;
          text-decoration: none;
          color: inherit;
          background-color: #fff;
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          box-shadow: 0 4px 6px rgba(0,0,0,0.04);
        }
        .tool-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 20px rgba(0,0,0,0.08);
        }
        .tool-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: #3182f6;
        }
      `}</style>
    </div>
  )
}

export default Home