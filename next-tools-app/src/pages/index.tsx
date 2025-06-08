import Link from 'next/link';
import styles from '../components/Home.module.css';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className={styles.card}>
      <div>
        <h1 className={styles.heading}>해리의 UtilityTools</h1>
        <div className={styles.desc}>이것저것 잡다한거 만들어 쓰는 페이지입니다.</div>
      </div>
      <Link href="/random-picker" className={styles.linkBtn}>
        <span>랜덤 선택기</span>
        <ArrowRightIcon className={styles.icon} />
      </Link>
      <Link href="/character-counter" className={styles.linkBtn}>
        <span>문자 수 세기</span>
        <ArrowRightIcon className={styles.icon} />
      </Link>
      <Link href="/lotto-generator" className={styles.linkBtn}>
        <span>로또 추첨기</span>
        <ArrowRightIcon className={styles.icon} />
      </Link>
    </div>
  );
}
