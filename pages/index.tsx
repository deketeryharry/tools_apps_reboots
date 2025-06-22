import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {
  FaCalculator, FaFont, FaGift, FaNewspaper, FaSearch, FaTachometerAlt, FaWonSign
} from 'react-icons/fa'

const tools = [
  {
    name: '실시간 검색어',
    href: '/realtime-keywords',
    description: '주요 포털의 실시간 트렌드를 확인하세요.',
    icon: <FaTachometerAlt />,
  },
  {
    name: '키워드 분석기',
    href: '/keyword-analyzer',
    description: '네이버 키워드 검색량과 관련 데이터를 분석합니다.',
    icon: <FaSearch />,
  },
  {
    name: '당첨자 추출기',
    href: '/random-selector',
    description: '댓글, 아이디 목록에서 랜덤으로 당첨자를 뽑습니다.',
    icon: <FaGift />,
  },
  {
    name: '글자수세기',
    href: '/word-counter',
    description: '공백 포함/제외 글자수와 단어, 줄 수를 셉니다.',
    icon: <FaFont />,
  },
  {
    name: '로또 추첨기',
    href: '/lotto-generator',
    description: '로또 번호를 무작위로 생성하거나 직접 입력하여 관리합니다.',
    icon: <img src="/lotto.svg" alt="로또 추첨기 icon" width={38} height={38} />,
  },
  {
    name: '뉴스 분석기',
    href: '/news-analyzer',
    description: '뉴스 기사의 긍정/부정을 AI로 분석합니다.',
    icon: <FaNewspaper />,
  },
  {
    name: '연봉 계산기',
    href: '/salary-calculator',
    description: '연봉과 실수령액을 세금 포함하여 계산합니다.',
    icon: <FaWonSign />,
  }
]

const Home: NextPage = () => {
  return (
    <div style={{ background: '#f8f9fa' }}>
      <Head>
        <title>해리의 UtilityTools - 당신의 생산성을 높여줄 다양한 도구</title>
        <meta name="description" content="키워드 분석기, 실시간 검색어, 연봉 계산기 등 유용한 웹 도구 모음." />
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
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
        }
      `}</style>
    </div>
  )
}

export default Home