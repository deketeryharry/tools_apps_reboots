import { useState } from 'react';

export default function RandomPicker() {
  const [input, setInput] = useState('');
  const [numWinners, setNumWinners] = useState('');
  const [winners, setWinners] = useState<string[]>([]);
  const [timestamp, setTimestamp] = useState<string>('');
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const formatTimestamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handlePickRandom = () => {
    let items = input
      .split(/[\n,]/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
    if (removeDuplicates) {
      items = [...new Set(items)];
    }
    const n = parseInt(numWinners);
    if (items.length === 0) {
      alert('항목을 입력해주세요!');
      return;
    }
    if (!n || n < 1) {
      alert('당첨자 수를 1 이상으로 입력해주세요!');
      return;
    }
    if (n > items.length) {
      alert('당첨자 수는 항목 수보다 클 수 없습니다!');
      return;
    }
    setIsLoading(true);
    setProgress(0);
    setWinners([]);
    setTimestamp('');
    let percent = 0;
    const interval = setInterval(() => {
      percent += Math.floor(Math.random() * 18) + 8;
      if (percent >= 100) {
        percent = 100;
        setProgress(percent);
        clearInterval(interval);
        setTimeout(() => {
          const shuffled = [...items].sort(() => Math.random() - 0.5);
          const selected = shuffled.slice(0, n);
          setWinners(selected);
          setTimestamp(formatTimestamp());
          setIsLoading(false);
        }, 400);
      } else {
        setProgress(percent);
      }
    }, 180);
  };

  const handleCopy = () => {
    const text = winners.join('\n');
    navigator.clipboard.writeText(text);
    alert('결과가 클립보드에 복사되었습니다!');
  };

  const handleClear = () => {
    setInput('');
    setWinners([]);
    setTimestamp('');
    setNumWinners('');
    setProgress(0);
    setIsLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '48px auto', padding: 32, background: 'var(--background)', borderRadius: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e5e8eb', display: 'flex', flexDirection: 'column', gap: 32, position: 'relative', color: 'var(--foreground)', fontFamily: 'inherit' }}>
      <h1 style={{ fontSize: '1.7rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '1.5rem', textAlign: 'center' }}>랜덤 당첨자 추출기</h1>
      <label style={{ color: 'var(--foreground)', fontSize: '1rem', fontWeight: 500, marginBottom: 8, display: 'block' }}>항목 입력 (줄바꿈 또는 쉼표로 구분)</label>
      <textarea
        style={{ width: '100%', minHeight: 96, padding: 14, border: '1px solid #e5e8eb', borderRadius: 14, fontSize: '1rem', background: 'var(--background)', color: 'var(--foreground)', resize: 'none', marginBottom: 8 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={"예시:\nuser1@example.com\nuser2@example.com\nuser3@example.com"}
      />
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', marginBottom: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: 140, minWidth: 100, maxWidth: 180 }}>
          <label style={{ color: 'var(--foreground)', fontSize: '1rem', fontWeight: 500, marginBottom: 8, display: 'block' }}>당첨자 수</label>
          <input
            type="number"
            min="1"
            value={numWinners}
            onChange={e => setNumWinners(e.target.value.replace(/[^\d]/g, ''))}
            style={{ width: '100%', padding: 12, border: '1px solid #e5e8eb', borderRadius: 12, fontSize: '1rem', background: 'var(--background)', color: 'var(--foreground)' }}
            placeholder="숫자 입력"
            disabled={isLoading}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 0, marginLeft: 18, whiteSpace: 'nowrap', marginTop: 24 }}>
            <input
              type="checkbox"
              id="removeDuplicates"
              checked={removeDuplicates}
              onChange={(e) => setRemoveDuplicates(e.target.checked)}
              style={{ marginRight: 6, accentColor: '#3182f6' }}
              disabled={isLoading}
            />
            <label htmlFor="removeDuplicates" style={{ marginBottom: 0, fontWeight: 400, color: 'var(--foreground)', fontSize: '1rem' }}>
              중복 제거
            </label>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <button onClick={handlePickRandom} style={{ flex: 1, padding: '13px 0', borderRadius: 12, fontWeight: 500, fontSize: '1rem', border: 'none', cursor: 'pointer', background: '#3182f6', color: '#fff', transition: 'background 0.15s', fontFamily: 'inherit' }} disabled={isLoading}>
          {isLoading ? '추첨중...' : '랜덤 선택'}
        </button>
        <button onClick={handleClear} style={{ flex: 1, padding: '13px 0', borderRadius: 12, fontWeight: 500, fontSize: '1rem', border: 'none', cursor: 'pointer', background: 'var(--gray-alpha-200, #f2f4f6)', color: 'var(--foreground)', transition: 'background 0.15s', fontFamily: 'inherit' }} disabled={isLoading}>지우기</button>
      </div>
      {isLoading && (
        <div style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.08)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 260, height: 260, background: '#fff', borderRadius: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, zIndex: 20, padding: '32px 18px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.2rem', color: '#3182f6', fontWeight: 600, letterSpacing: '0.01em' }}>추첨중입니다...</div>
            <div style={{ width: '100%', maxWidth: 180, height: 16, background: '#e5e8eb', borderRadius: 8, overflow: 'hidden', margin: '0 auto' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #3182f6 60%, #bcdcff 100%)', borderRadius: '8px 0 0 8px', transition: 'width 0.2s', width: `${progress}%` }} />
            </div>
            <div style={{ marginTop: 6, fontSize: '1rem', color: '#3182f6', fontWeight: 500 }}>{progress}%</div>
          </div>
        </div>
      )}
      {winners.length > 0 && !isLoading && (
        <div style={{ background: 'var(--background)', border: '1px solid #e5e8eb', borderRadius: 14, padding: 18, marginTop: 12, fontFamily: 'Menlo, Consolas, monospace', fontSize: '1rem', color: 'var(--foreground)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span>결과</span>
            <button onClick={handleCopy} style={{ background: 'none', border: 'none', color: '#3182f6', cursor: 'pointer', padding: 4, borderRadius: 6, transition: 'background 0.15s' }} title="결과 복사">
              복사
            </button>
          </div>
          <div>
            {winners.map((winner, idx) => (
              <div key={idx}>{winner}</div>
            ))}
          </div>
          <div style={{ marginTop: 10, color: '#8b95a1', fontSize: '0.95rem' }}>선택 시간: {timestamp}</div>
        </div>
      )}
    </div>
  );
} 