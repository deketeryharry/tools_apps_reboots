import { useState } from 'react';
import LottoBallsAnimation from '../components/LottoBallsAnimation';
import CommonButton from '../components/CommonButton';

function getBallColor(n: number) {
  if (n <= 10) return '#FFC107';
  if (n <= 20) return '#2196F3';
  if (n <= 30) return '#F44336';
  if (n <= 40) return '#4CAF50';
  return '#9C27B0';
}

function formatTime(date: Date) {
  return date.toLocaleString('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });
}

type LottoSet = {
  numbers: number[];
  bonus?: number;
  time: string;
};

export default function LottoGenerator() {
  const [count, setCount] = useState(1);
  const [withBonus, setWithBonus] = useState(false);
  const [results, setResults] = useState<LottoSet[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [progress, setProgress] = useState(0);

  function generateSet(withBonus: boolean = false): LottoSet {
    const nums = new Set<number>();
    while (nums.size < 6) {
      nums.add(Math.floor(Math.random() * 45) + 1);
    }
    const numbers = Array.from(nums).sort((a, b) => a - b);
    let bonus: number | undefined = undefined;
    if (withBonus) {
      let b;
      do {
        b = Math.floor(Math.random() * 45) + 1;
      } while (nums.has(b));
      bonus = b;
    }
    return {
      numbers,
      bonus,
      time: formatTime(new Date()),
    };
  }

  function handleGenerate() {
    setIsDrawing(true);
    setResults([]);
    setProgress(0);
    let percent = 0;
    const duration = 1800;
    const interval = 30;
    const step = 100 / (duration / interval);
    const timer = setInterval(() => {
      percent += step;
      setProgress(Math.min(100, Math.round(percent)));
      if (percent >= 100) {
        clearInterval(timer);
        const arr: LottoSet[] = [];
        for (let i = 0; i < count; ++i) {
          arr.push(generateSet(withBonus));
        }
        setResults(arr);
        setIsDrawing(false);
      }
    }, interval);
  }

  function handleCopy() {
    if (results.length === 0) return;
    const text = results.map((set, idx) =>
      `세트${idx + 1}: ${set.numbers.join(', ')}${set.bonus ? ' + ' + set.bonus : ''} (생성: ${set.time})`
    ).join('\n');
    navigator.clipboard.writeText(text);
    alert('복사되었습니다!');
  }

  function handleReset() {
    setResults([]);
  }

  return (
    <div
      className="lotto-generator-container"
      style={{
        maxWidth: 900,
        margin: '88px auto 48px auto',
        padding: 16,
        background: 'var(--background)',
        borderRadius: 24,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        border: '1px solid #e5e8eb',
        color: 'var(--foreground)',
        fontFamily: 'inherit',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      {/* 반응형: 600px 이하에서 padding 8로 줄이기 */}
      <style>{`
        @media (max-width: 600px) {
          .lotto-generator-container { padding: 8px !important; }
        }
        .lotto-number-row {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 8px;
          margin-bottom: 4px;
          overflow-x: auto;
          scrollbar-width: thin;
          padding-bottom: 2px;
          align-items: center;
          white-space: nowrap;
          min-height: 48px;
          width: 100%;
          box-sizing: border-box;
          justify-content: center;
        }
      `}</style>
      {isDrawing && (
        <div style={{
          position: 'absolute',
          left: 0, top: 0, right: 0, bottom: 0,
          background: 'rgba(255,255,255,0.85)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#3182f6', marginBottom: 12 }}>추첨 중...</div>
          <div style={{ fontSize: 22, fontWeight: 600, color: '#222', marginBottom: 8 }}>{progress}%</div>
          <div style={{ width: 180, height: 12, background: '#e5e8eb', borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ width: `${progress}%`, height: '100%', background: '#3182f6', transition: 'width 0.1s' }} />
          </div>
        </div>
      )}
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: 'var(--foreground)' }}>로또번호 추첨기</h1>
      <LottoBallsAnimation />
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 32, alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 0, boxSizing: 'border-box' }}>
        <div className="lotto-generator-controls" style={{ width: '100%', maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 0 }}>
            <label>
              세트 수
              <select value={count} onChange={e => setCount(Number(e.target.value))} style={{ marginLeft: 8, marginRight: 8, padding: '6px 10px', borderRadius: 6, border: '1px solid #e5e8eb', fontSize: '1rem' }}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input type="checkbox" checked={withBonus} onChange={e => setWithBonus(e.target.checked)} style={{ accentColor: '#3182f6', marginRight: 2 }} />
              보너스 번호 포함
            </label>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginLeft: 0 }}>
            <CommonButton onClick={handleGenerate} disabled={isDrawing}>추첨하기</CommonButton>
            <CommonButton onClick={handleCopy} disabled={results.length === 0 || isDrawing}>복사하기</CommonButton>
            <CommonButton onClick={handleReset} disabled={results.length === 0 || isDrawing} style={{ background: '#b0b8c1' }}>초기화</CommonButton>
          </div>
        </div>
        <div className="lotto-generator-results" style={{ flex: 1, width: '100%', minWidth: 0, maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {results.map((set, idx) => (
            <div key={idx} className="lotto-generator-card" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', padding: '12px 4px', marginBottom: 0, color: 'var(--foreground)', border: '1px solid #e5e8eb', display: 'flex', flexDirection: 'column', gap: 8, width: '100%', boxSizing: 'border-box' }}>
              <div className="lotto-number-row">
                {set.numbers.map((n, i) => (
                  <span key={i} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    lineHeight: '40px',
                    borderRadius: '50%',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#fff',
                    fontSize: '1.15rem',
                    margin: '4px 2px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    background: getBallColor(n),
                    verticalAlign: 'middle',
                    flex: '0 0 40px',
                  }}>{n}</span>
                ))}
                {set.bonus !== undefined && (
                  <>
                    <span style={{ fontWeight: 700, fontSize: 22, color: '#8b95a1', margin: '0 6px', userSelect: 'none' }}>+</span>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      lineHeight: '40px',
                      borderRadius: '50%',
                      textAlign: 'center',
                      fontWeight: 700,
                      color: '#fff',
                      fontSize: '1.15rem',
                      margin: '4px 2px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                      background: getBallColor(set.bonus),
                      border: '2px dashed #007BFF',
                      marginLeft: 0,
                      verticalAlign: 'middle',
                      flex: '0 0 40px',
                    }}>{set.bonus}</span>
                  </>
                )}
              </div>
              <div className="lotto-generator-time" style={{ fontSize: '0.98rem', color: '#8b95a1', marginTop: 2 }}>생성: {set.time}</div>
            </div>
          ))}
          <a
            className="lotto-generator-link"
            href="https://dhlottery.co.kr/gameResult.do?method=byWin"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: 18,
              padding: '10px 20px',
              background: '#3182f6',
              color: '#fff',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 15,
              textDecoration: 'none',
              textAlign: 'center',
              boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
              transition: 'background 0.15s',
              width: '100%',
              maxWidth: 400,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            당첨번호 확인하러가기 ↗
          </a>
        </div>
      </div>
    </div>
  );
} 