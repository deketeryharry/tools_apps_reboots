import { useState, useEffect } from 'react';

const MAX_LENGTH = 30000;

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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > MAX_LENGTH) {
      alert('최대 3만자까지만 입력할 수 있습니다.');
      return;
    }
    setText(value);
  };

  const handleClear = () => setText('');

  return (
    <div style={{ maxWidth: 600, margin: '88px auto 48px auto', padding: 32, background: 'var(--background)', borderRadius: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e5e8eb', display: 'flex', flexDirection: 'column', gap: 32, color: 'var(--foreground)', fontFamily: 'inherit' }}>
      <h1 style={{ fontSize: '1.7rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '1.5rem', textAlign: 'center' }}>문자 수 세기</h1>
      <label style={{ color: '#4e5968', fontSize: '1rem', fontWeight: 500, marginBottom: 8, display: 'block' }}>텍스트를 입력하거나 붙여넣기 하세요</label>
      <textarea
        style={{ width: '100%', minHeight: 96, padding: 14, border: '1px solid #e5e8eb', borderRadius: 14, fontSize: '1rem', background: 'var(--background)', color: 'var(--foreground)', resize: 'none', marginBottom: 8 }}
        value={text}
        onChange={handleChange}
        placeholder="여기에 텍스트를 입력하세요..."
        maxLength={MAX_LENGTH + 1}
      />
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 16 }}>
        <div style={{ flex: 1, minWidth: 160, maxWidth: 220, background: '#fafbfc', border: '1px solid #e5e8eb', borderRadius: 14, padding: '18px 0', textAlign: 'center', fontWeight: 500, fontSize: 16 }}>
          <div style={{ color: '#8b95a1', fontSize: 15, marginBottom: 6 }}>공백 포함 문자 수</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{stats.charsWithSpaces.toLocaleString()}</div>
        </div>
        <div style={{ flex: 1, minWidth: 160, maxWidth: 220, background: '#fafbfc', border: '1px solid #e5e8eb', borderRadius: 14, padding: '18px 0', textAlign: 'center', fontWeight: 500, fontSize: 16 }}>
          <div style={{ color: '#8b95a1', fontSize: 15, marginBottom: 6 }}>공백 제외 문자 수</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{stats.charsWithoutSpaces.toLocaleString()}</div>
        </div>
        <div style={{ flex: 1, minWidth: 160, maxWidth: 220, background: '#fafbfc', border: '1px solid #e5e8eb', borderRadius: 14, padding: '18px 0', textAlign: 'center', fontWeight: 500, fontSize: 16 }}>
          <div style={{ color: '#8b95a1', fontSize: 15, marginBottom: 6 }}>UTF-8 바이트 크기</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{stats.bytes.toLocaleString()}</div>
        </div>
      </div>
      <button onClick={handleClear} style={{ width: '100%', padding: '13px 0', borderRadius: 12, fontWeight: 500, fontSize: '1rem', border: 'none', cursor: 'pointer', background: 'var(--gray-alpha-200, #f2f4f6)', color: 'var(--foreground)', marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 0.15s', fontFamily: 'inherit' }}>
        지우기
      </button>
    </div>
  );
} 