import { useEffect, useRef } from 'react';

const BALL_COUNT = 10;
const BALL_RADIUS = 18;
const AREA_SIZE = 180;

function getBallColor(n: number) {
  if (n <= 10) return '#FFC107';
  if (n <= 20) return '#2196F3';
  if (n <= 30) return '#F44336';
  if (n <= 40) return '#4CAF50';
  return '#9C27B0';
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBalls(count: number) {
  // 1~45에서 중복 없이 count개 추출
  const nums = Array.from({ length: 45 }, (_, i) => i + 1);
  for (let i = nums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  return nums.slice(0, count);
}

export default function LottoBallsAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballsRef = useRef<any[]>([]);

  useEffect(() => {
    // 1~45에서 중복 없이 BALL_COUNT개 추출
    const numbers = getRandomBalls(BALL_COUNT);
    const balls = numbers.map(num => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.7 + Math.random() * 0.7;
      return {
        x: AREA_SIZE / 2 + Math.cos(angle) * randomInt(10, AREA_SIZE/2 - BALL_RADIUS - 5),
        y: AREA_SIZE / 2 + Math.sin(angle) * randomInt(10, AREA_SIZE/2 - BALL_RADIUS - 5),
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        num,
        color: getBallColor(num),
      };
    });
    ballsRef.current = balls;

    let animationId: number;
    function animate() {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, AREA_SIZE, AREA_SIZE);
      // Draw area (circle)
      ctx.save();
      ctx.beginPath();
      ctx.arc(AREA_SIZE/2, AREA_SIZE/2, AREA_SIZE/2-2, 0, Math.PI*2);
      ctx.clip();
      ctx.fillStyle = '#f4f6fa';
      ctx.fillRect(0, 0, AREA_SIZE, AREA_SIZE);
      ctx.restore();
      // Move & draw balls
      for (const ball of ballsRef.current) {
        // Move
        ball.x += ball.dx;
        ball.y += ball.dy;
        // 벽 충돌
        const dist = Math.hypot(ball.x - AREA_SIZE/2, ball.y - AREA_SIZE/2);
        if (dist > AREA_SIZE/2 - BALL_RADIUS - 2) {
          // 반사
          const angle = Math.atan2(ball.y - AREA_SIZE/2, ball.x - AREA_SIZE/2);
          const vx = ball.dx;
          const vy = ball.dy;
          // 반사 벡터 계산
          const dot = vx * Math.cos(angle) + vy * Math.sin(angle);
          ball.dx -= 2 * dot * Math.cos(angle);
          ball.dy -= 2 * dot * Math.sin(angle);
          // 살짝 안쪽으로
          ball.x = AREA_SIZE/2 + Math.cos(angle) * (AREA_SIZE/2 - BALL_RADIUS - 3);
          ball.y = AREA_SIZE/2 + Math.sin(angle) * (AREA_SIZE/2 - BALL_RADIUS - 3);
        }
        // Draw ball
        ctx.save();
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI*2);
        ctx.fillStyle = ball.color;
        ctx.shadowColor = 'rgba(0,0,0,0.13)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
        // Draw number
        ctx.save();
        ctx.font = 'bold 15px sans-serif';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ball.num.toString(), ball.x, ball.y);
        ctx.restore();
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 18px 0' }}>
      <canvas
        ref={canvasRef}
        width={AREA_SIZE}
        height={AREA_SIZE}
        style={{ borderRadius: '50%', background: '#f4f6fa', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
      />
    </div>
  );
} 