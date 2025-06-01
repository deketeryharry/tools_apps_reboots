import { useState, useRef, useEffect } from 'react';
import './LottoGenerator.css';

function getBallColor(n: number) {
  if (n <= 10) return 'ball-yellow';
  if (n <= 20) return 'ball-blue';
  if (n <= 30) return 'ball-red';
  if (n <= 40) return 'ball-green';
  return 'ball-purple';
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

// 1~45를 섞어서 24개만 뽑기 (색상 분포 고르게)
function getRandomBalls(num: number) {
  const arr = Array.from({ length: 45 }, (_, i) => i + 1);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, num).map(n => ({ n, color: getBallColor(n) }));
}

// 애니메이션용 공 데이터 (매번 새로 섞어서 다양하게)
function useAnimBalls(num: number = 24, fast: boolean = false): Array<{ n: number; color: string }> {
  const [balls, setBalls] = useState<Array<{ n: number; color: string }>>(() => getRandomBalls(num));
  useEffect(() => {
    setBalls(getRandomBalls(num));
    // 5초마다 자동 리셋(더 다채롭게)
    if (!fast) {
      const t = setInterval(() => setBalls(getRandomBalls(num)), 5000);
      return () => clearInterval(t);
    }
  }, [num, fast]);
  return balls;
}

function LottoDomeAnim({ fast }: { fast: boolean }) {
  const ANIM_BALLS = useAnimBalls(24, fast);
  const [positions, setPositions] = useState(() => ANIM_BALLS.map(() => ({ x: 0, y: 0, dx: 0, dy: 0 })));
  const domeRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>();

  useEffect(() => {
    const size = domeRef.current ? domeRef.current.offsetWidth : 180;
    let state = ANIM_BALLS.map(() => {
      const angle = Math.random() * 2 * Math.PI;
      const r = (size / 2 - 18) * Math.random();
      return {
        x: size / 2 + Math.cos(angle) * r,
        y: size / 2 + Math.sin(angle) * r,
        dx: (Math.random() - 0.5) * (fast ? 2.2 : 1.2),
        dy: (Math.random() - 0.5) * (fast ? 2.2 : 1.2),
      };
    });
    let runningFlag = true;
    function animate() {
      state = state.map((b) => {
        let { x, y, dx, dy } = b;
        x += dx;
        y += dy;
        const cx = size / 2, cy = size / 2, r = size / 2 - 14;
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        if (dist > r) {
          const angle = Math.atan2(y - cy, x - cx);
          dx = -dx + (Math.random() - 0.5) * 0.5;
          dy = -dy + (Math.random() - 0.5) * 0.5;
          x = cx + Math.cos(angle) * r;
          y = cy + Math.sin(angle) * r;
        }
        dx += (Math.random() - 0.5) * 0.1 * (fast ? 1.5 : 1);
        dy += (Math.random() - 0.5) * 0.1 * (fast ? 1.5 : 1);
        const maxSpeed = fast ? 2.5 : 1.5;
        dx = Math.max(-maxSpeed, Math.min(maxSpeed, dx));
        dy = Math.max(-maxSpeed, Math.min(maxSpeed, dy));
        return { x, y, dx, dy };
      });
      setPositions([...state]);
      if (runningFlag) animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);
    return () => {
      runningFlag = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [fast, ANIM_BALLS]);

  return (
    <div className="lotto-anim-container">
      <div className="lotto-dome" ref={domeRef}>
        <div className="lotto-balls-anim">
          {ANIM_BALLS.map((ball, i) => (
            <div
              key={i}
              className={`lotto-ball-anim ${ball.color}`}
              style={{
                left: positions[i]?.x ? positions[i].x - 14 : 0,
                top: positions[i]?.y ? positions[i].y - 14 : 0,
                opacity: 0.92,
              }}
            >
              {ball.n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
    <div className="lotto-container">
      <h1 className="lotto-title">로또번호 추첨기</h1>
      <div className="lotto-controls">
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
        <button className="lotto-btn" onClick={handleGenerate} disabled={isDrawing}>추첨하기</button>
        <button className="lotto-btn" onClick={handleCopy} disabled={results.length === 0 || isDrawing}>복사하기</button>
        <button className="lotto-btn" onClick={handleReset} disabled={results.length === 0 || isDrawing}>초기화</button>
      </div>
      <LottoDomeAnim fast={isDrawing} />
      <div className="lotto-results">
        {results.map((set, idx) => (
          <div className="lotto-card" key={idx}>
            <div className="lotto-numbers">
              {set.numbers.map((n, i) => (
                <span className={`lotto-ball ${getBallColor(n)}`} key={i}>{n}</span>
              ))}
              {set.bonus !== undefined && (
                <span className={`lotto-ball ${getBallColor(set.bonus)}`} style={{ border: '2px dashed #007BFF', background: '#fff', color: '#007BFF', fontWeight: 700, marginLeft: 10 }}>
                  {set.bonus}
                </span>
              )}
            </div>
            <div className="lotto-time">생성: {set.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 