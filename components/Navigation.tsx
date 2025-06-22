import Link from 'next/link';
import { useRouter } from 'next/router';

const navLinks = [
  { name: '당첨자 추출기', href: '/random-selector' },
  { name: '글자수세기', href: '/word-counter' },
  { name: '로또 추첨기', href: '/lotto-generator' },
  { name: '키워드 분석기', href: '/keyword-analyzer' },
  { name: '연봉 계산기', href: '/salary-calculator' },
  { name: '뉴스 분석기', href: '/news-analyzer' },
];

export default function Navigation() {
  const router = useRouter();
  return (
    <>
      <style jsx>{`
        .nav-container {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          height: 56px;
          padding: 0 16px;
          box-sizing: border-box;
        }
        .nav-title {
          font-weight: 700;
          font-size: 20px;
          margin-right: 24px;
          color: #191f28;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          flex-shrink: 1;
          min-width: 0;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .nav-links::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
        @media (max-width: 768px) {
          .nav-title {
            font-size: 18px;
            margin-right: 12px;
            white-space: nowrap;
          }
          .nav-container {
            gap: 0;
          }
        }
        @media (max-width: 600px) {
          .nav-title {
            display: none;
          }
        }
      `}</style>
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
        <div className="nav-container">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="nav-title">해리의 UtilityTools</span>
          </Link>
          <div className="nav-links">
            {navLinks.map(item => (
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
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
} 