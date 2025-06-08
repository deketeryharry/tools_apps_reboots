import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.link}>홈</Link>
      <Link href="/random-picker" className={styles.link}>랜덤 선택기</Link>
      <Link href="/character-counter" className={styles.link}>문자 수 세기</Link>
      <Link href="/lotto-generator" className={styles.link}>로또 추첨기</Link>
      <Link href="/keyword-analyzer" className={styles.link}>키워드 분석기</Link>
    </nav>
  );
} 