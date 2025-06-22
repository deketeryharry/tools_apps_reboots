import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const tools = [
  { name: '당첨자 추출기', href: '/random-selector' },
  { name: '글자수세기', href: '/word-counter' },
  { name: '로또 추첨기', href: '/lotto-generator' },
  { name: '키워드 분석기', href: '/keyword-analyzer' },
  { name: '연봉 계산기', href: '/salary-calculator' },
  { name: '뉴스 분석기', href: '/news-analyzer' },
]

const Home: NextPage = () => {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 60px 20px' }}>
      <Head>
        <title>해리의 UtilityTools</title>
        <meta name="description" content="다양한 유틸리티 도구 모음" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Tools</h1>
        <div className="tools-grid">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="tool-card"
            >
              <h2 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{tool.name}</h2>
            </Link>
          ))}
        </div>
      </main>
      <style jsx>{`
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        .tool-card {
          display: block;
          padding: 20px;
          border: 1px solid #e5e8eb;
          border-radius: 8px;
          text-align: center;
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 12px rgba(49,130,246,0.06);
        }
        .tool-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(49,130,246,0.12);
        }
      `}</style>
    </div>
  )
}

export default Home