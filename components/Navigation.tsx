import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const navLinks = [
  { name: '실시간 검색어', href: '/realtime-keywords' },
  { name: '키워드 분석기', href: '/keyword-analyzer' },
  { name: '당첨자 추출기', href: '/random-selector' },
  { name: '글자수세기', href: '/word-counter' },
  { name: '로또 추첨기', href: '/lotto-generator' },
  { name: '뉴스 분석기', href: '/news-analyzer' },
  { name: '연봉 계산기', href: '/salary-calculator' },
];

export default function Navigation() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setMenuOpen(false);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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
          position: relative;
        }
        .nav-title {
          font-weight: 700;
          font-size: 20px;
          margin-right: 24px;
          color: #191f28;
          white-space: nowrap;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .desktop-links {
          display: flex;
          margin-left: auto;
        }
        .hamburger-button {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1001;
        }
        .hamburger-icon {
          width: 24px;
          height: 24px;
          color: #191f28;
        }
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: flex-end;
          z-index: 1000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .mobile-menu.open {
          opacity: 1;
          pointer-events: auto;
        }
        .mobile-nav {
          background-color: white;
          width: 250px;
          height: 100%;
          padding-top: 60px;
          box-shadow: -2px 0 5px rgba(0,0,0,0.1);
          transform: translateX(100%);
          transition: transform 0.3s ease;
        }
        .mobile-menu.open .mobile-nav {
          transform: translateX(0);
        }
        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0 24px;
        }

        @media (max-width: 900px) {
          .desktop-links {
            display: none;
          }
          .hamburger-button {
            display: block;
            position: absolute;
            left: 16px;
          }
          .nav-container {
            justify-content: center;
          }
          .nav-title {
            margin-right: 0;
          }
        }
        @media (max-width: 768px) {
          .nav-title {
            font-size: 18px;
            margin-right: 12px;
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
          <button className="hamburger-button" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="nav-title">해리의 UtilityTools</span>
          </Link>
          <div className="nav-links desktop-links">
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
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
        <div className="mobile-nav" onClick={e => e.stopPropagation()}>
          <div className="mobile-nav-links">
            {navLinks.map(item => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: '12px 0',
                  width: '100%',
                  color: router.pathname === item.href ? '#3182f6' : '#191f28',
                  fontWeight: router.pathname === item.href ? 700 : 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  fontSize: '1.1rem',
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 