import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { href: '/', label: '홈' },
  { href: '/random-picker', label: '랜덤 선택기' },
  { href: '/character-counter', label: '문자 수 세기' },
  { href: '/lotto-generator', label: '로또 추첨기' },
  { href: '/keyword-analyzer', label: '키워드 분석기' },
  { href: '/salary-calculator', label: '연봉 계산기' },
  { href: '/news-analyzer', label: '뉴스 분석기' },
];

export default function Navigation() {
  const router = useRouter();
  return (
    <nav style={{
      width: '100%',
      background: '#fff',
      borderBottom: '1px solid #e5e8eb',
      marginBottom: 32,
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
      height: 56,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    }}>
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: 56,
      }}>
        <span style={{ fontWeight: 700, fontSize: 20, marginRight: 24, color: '#191f28' }}>해리의 UtilityTools</span>
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              color: router.pathname === item.href ? '#fff' : '#191f28',
              background: router.pathname === item.href ? '#3182f6' : 'transparent',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'background 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
} 