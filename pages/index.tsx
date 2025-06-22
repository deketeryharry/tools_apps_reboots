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
    icon: FaTachometerAlt,
    color: '#4285F4'
  },
  {
    name: '키워드 분석기',
    href: '/keyword-analyzer',
    description: '네이버 키워드 검색량과 관련 데이터를 분석합니다.',
    icon: FaSearch,
    color: '#00A86B'
  },
  {
    name: '당첨자 추출기',
    href: '/random-selector',
    description: '댓글, 아이디 목록에서 랜덤으로 당첨자를 뽑습니다.',
    icon: FaGift,
    color: '#FF6F61'
  },
  {
    name: '글자수세기',
    href: '/word-counter',
    description: '공백 포함/제외 글자수와 단어, 줄 수를 셉니다.',
    icon: FaFont,
    color: '#6B5B95'
  },
  {
    name: '로또 추첨기',
    href: '/lotto-generator',
    description: '로또 번호를 무작위로 생성하거나 직접 입력하여 관리합니다.',
    icon: '/lotto.svg',
    color: '#F9A825'
  },
  {
    name: '뉴스 분석기',
    href: '/news-analyzer',
    description: '뉴스 기사의 긍정/부정을 AI로 분석합니다.',
    icon: FaNewspaper,
    color: '#34495E'
  },
  {
    name: '연봉 계산기',
    href: '/salary-calculator',
    description: '연봉과 실수령액을 세금 포함하여 계산합니다.',
    icon: FaWonSign,
    color: '#8E44AD'
  }
]

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>해리의 UtilityTools - 당신의 생산성을 높여줄 다양한 도구</title>
        <meta name="description" content="키워드 분석기, 실시간 검색어, 연봉 계산기 등 유용한 웹 도구 모음." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">
          Harry's Utility Tools
        </h1>

        <p className="description">
          자주 사용하는 유용한 도구들을 모아두었습니다.
        </p>

        <div className="grid">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link href={tool.href} key={tool.name} className="card" style={{ '--card-accent-color': tool.color } as React.CSSProperties}>
                <div className="card-icon-wrapper">
                  {typeof Icon === 'string' ? <img src={Icon} alt={`${tool.name} icon`} width={32} height={32} /> : <Icon />}
                </div>
                <h2>{tool.name} &rarr;</h2>
                <p>{tool.description}</p>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}