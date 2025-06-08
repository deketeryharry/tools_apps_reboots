import { useState, useEffect } from 'react';

export default function CharacterCounter() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    charsWithSpaces: 0,
    charsWithoutSpaces: 0,
    bytes: 0
  });

  useEffect(() => {
    const charsWithSpaces = text.length;
    const charsWithoutSpaces = text.replace(/\s/g, '').length;
    const bytes = new TextEncoder().encode(text).length;
    setStats({ charsWithSpaces, charsWithoutSpaces, bytes });
  }, [text]);

  const handleClear = () => setText('');

  return (
    <div style={{ maxWidth: 600, margin: '48px auto', padding: 32, background: '#fff', borderRadius: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e5e8eb', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <h1 style={{ fontSize: '1.7rem', fontWeight: 'bold', color: '#191f28', marginBottom: '1.5rem', textAlign: 'center' }}>문자 수 세기</h1>
      <label style={{ color: '#4e5968', fontSize: '1rem', fontWeight: 500, marginBottom: 8, display: 'block' }}>텍스트를 입력하거나 붙여넣기 하세요</label>
      <textarea
        style={{ width: '100%', minHeight: 96, padding: 14, border: '1px solid #e5e8eb', borderRadius: 14, fontSize: '1rem', background: '#f9fafb', resize: 'none', marginBottom: 8 }}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="여기에 텍스트를 입력하세요..."
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
        <div style={{ background: '#f9fafb', border: '1px solid #e5e8eb', borderRadius: 14, padding: 18, textAlign: 'center' }}>
          <div style={{ color: '#8b95a1', fontSize: '0.98rem', marginBottom: 6 }}>공백 포함 문자 수</div>
          <div style={{ color: '#191f28', fontSize: '1.5rem', fontWeight: 600 }}>{stats.charsWithSpaces.toLocaleString()}</div>
        </div>
        <div style={{ background: '#f9fafb', border: '1px solid #e5e8eb', borderRadius: 14, padding: 18, textAlign: 'center' }}>
          <div style={{ color: '#8b95a1', fontSize: '0.98rem', marginBottom: 6 }}>공백 제외 문자 수</div>
          <div style={{ color: '#191f28', fontSize: '1.5rem', fontWeight: 600 }}>{stats.charsWithoutSpaces.toLocaleString()}</div>
        </div>
        <div style={{ background: '#f9fafb', border: '1px solid #e5e8eb', borderRadius: 14, padding: 18, textAlign: 'center' }}>
          <div style={{ color: '#8b95a1', fontSize: '0.98rem', marginBottom: 6 }}>UTF-8 바이트 크기</div>
          <div style={{ color: '#191f28', fontSize: '1.5rem', fontWeight: 600 }}>{stats.bytes.toLocaleString()}</div>
        </div>
      </div>
      <button onClick={handleClear} style={{ width: '100%', padding: '13px 0', borderRadius: 12, fontWeight: 500, fontSize: '1rem', border: 'none', cursor: 'pointer', background: '#f2f4f6', color: '#4e5968', marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 0.15s' }}>
        지우기
      </button>
    </div>
  );
} 