import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const tools = [
  { name: '당첨자 추출기', href: '/random-selector' },
  { name: '글자수세기', href: '/word-counter' },
  { name: '로또 추첨기', href: '/lotto' },
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
        }}>
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              style={{
                display: 'block',
                padding: '20px',
                border: '1px solid #e5e8eb',
                borderRadius: '8px',
                textAlign: 'center',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 2px 12px rgba(49,130,246,0.06)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(49,130,246,0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(49,130,246,0.06)';
              }}
            >
              <h2 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{tool.name}</h2>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home