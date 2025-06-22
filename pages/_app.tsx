import '../styles/globals.css';
import type { AppProps } from "next/app";
import Navigation from '../components/Navigation';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const navItems = [
    { href: '/', label: '홈' },
    { href: '/random-selector', label: '당첨자 추출기' },
    { href: '/word-counter', label: '글자수세기' },
    { href: '/lotto', label: '로또 추첨기' },
    { href: '/keyword-analyzer', label: '키워드 분석기' },
    { href: '/salary-calculator', label: '연봉 계산기' },
    { href: '/news-analyzer', label: '뉴스 분석기' },
  ];

  return (
    <>
      <Navigation />
      <main style={{ paddingTop: '88px', paddingBottom: '40px' }}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
