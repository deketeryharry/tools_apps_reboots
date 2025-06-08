import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ maxWidth: 600, margin: '48px auto', padding: 32, background: '#fff', borderRadius: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e5e8eb', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#191f28', marginBottom: '1.5rem', textAlign: 'center' }}>해리의 UtilityTools</h1>
        <div style={{ color: '#4e5968', fontSize: '1.1rem', textAlign: 'center', marginBottom: '1.5rem' }}>이것저것 잡다한거 만들어 쓰는 페이지입니다.</div>
      </div>
      <Link href="/random-picker" style={linkBtnStyle}>랜덤 선택기 →</Link>
      <Link href="/character-counter" style={linkBtnStyle}>문자 수 세기 →</Link>
      <Link href="/lotto-generator" style={linkBtnStyle}>로또 추첨기 →</Link>
      <Link href="/keyword-analyzer" style={linkBtnStyle}>키워드 분석기 →</Link>
    </div>
  );
}

const linkBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 20,
  background: '#f9fafb',
  borderRadius: 16,
  border: '1px solid #e5e8eb',
  color: '#191f28',
  textDecoration: 'none',
  fontWeight: 500,
  marginBottom: 16,
  fontSize: '1.1rem',
  transition: 'background 0.2s, border 0.2s',
}; 