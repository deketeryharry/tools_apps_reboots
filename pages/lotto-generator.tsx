import { useState } from 'react';

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
    setTimeout(() => {
      const arr: LottoSet[] = [];
      for (let i = 0; i < count; ++i) {
        arr.push(generateSet(withBonus));
      }
      setResults(arr);
      setIsDrawing(false);
    }, 1800);
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
    <div style={{ maxWidth: 600, margin: '48px auto', padding: 32, background: '#fff', borderRadius: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e5e8eb', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#222' }}>로또번호 추첨기</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
        <label>
          세트 수
          <select value={count} onChange={e => setCount(Number(e.target.value))} style={{ marginLeft: 8, marginRight: 16 }}>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <input type="checkbox" checked={withBonus} onChange={e => setWithBonus(e.target.checked)} />
          보너스 번호 포함
        </label>
        <button style={{ padding: '12px 20px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: 8, fontSize: '1rem', fontWeight: 500, margin: '0 4px', cursor: 'pointer', transition: 'background 0.15s' }} onClick={handleGenerate} disabled={isDrawing}>추첨하기</button>
        <button style={{ padding: '12px 20px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: 8, fontSize: '1rem', fontWeight: 500, margin: '0 4px', cursor: 'pointer', transition: 'background 0.15s' }} onClick={handleCopy} disabled={results.length === 0 || isDrawing}>복사하기</button>
        <button style={{ padding: '12px 20px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: 8, fontSize: '1rem', fontWeight: 500, margin: '0 4px', cursor: 'pointer', transition: 'background 0.15s' }} onClick={handleReset} disabled={results.length === 0 || isDrawing}>초기화</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '32px 0 24px 0' }}>
        {/* 애니메이션 생략 (간단화) */}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {results.map((set, idx) => (
          <div key={idx} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', padding: 16, marginBottom: 8 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
              {set.numbers.map((n, i) => (
                <span key={i} style={{ display: 'inline-block', width: 40, height: 40, lineHeight: '40px', borderRadius: '50%', textAlign: 'center', fontWeight: 'bold', color: '#fff', fontSize: '1.15rem', margin: '4px 2px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', background: getBallColor(n) }}>{n}</span>
              ))}
              {set.bonus !== undefined && (
                <span style={{ display: 'inline-block', width: 40, height: 40, lineHeight: '40px', borderRadius: '50%', textAlign: 'center', color: '#007BFF', fontSize: '1.15rem', margin: '4px 2px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', background: '#fff', border: '2px dashed #007BFF', fontWeight: 700, marginLeft: 10 }}>{set.bonus}</span>
              )}
            </div>
            <div style={{ fontSize: '0.98rem', color: '#8b95a1', marginTop: 2 }}>생성: {set.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 