interface RatioRow {
  period: string;
  dailyAmount: number;
  ratio: number;
}

interface Props {
  rows: RatioRow[];
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  fontSize: 13,
};
const thStyle: React.CSSProperties = {
  background: '#222',
  color: '#fff',
  fontWeight: 700,
  padding: '7px 6px',
  borderBottom: '2px solid #e5e8eb',
  textAlign: 'center',
  fontSize: 13,
};
const tdStyle: React.CSSProperties = {
  padding: '6px 6px',
  textAlign: 'center',
  borderBottom: '1px solid #e5e8eb',
  background: '#fff',
  fontSize: '12px',
};
const trHoverStyle: React.CSSProperties = {
  transition: 'background 0.15s',
  height: 32,
};

function getGaugeColor(percent: number) {
  if (percent < 0.6) return '#ef4444'; 
  if (percent < 0.85) return '#facc15'; 
  return '#22c55e';
}

export default function DailyTrendChart({ rows }: Props) {
  const maxRatio = rows.length > 0 ? Math.max(...rows.map(row => row.ratio)) : 1;

  if (rows.length === 0) {
    return <div style={{ color: '#8b95a1', fontSize: '0.98rem' }}>데이터 없음</div>;
  }

  return (
    <table style={{ ...tableStyle,  boxShadow: '0 2px 12px rgba(49,130,246,0.06)', borderRadius: 12, overflow: 'hidden' }}>
      <thead>
        <tr>
          <th style={{ ...thStyle, width: '50%' }}>날짜</th>
          <th style={{ ...thStyle, width: '50%' }}>조회량 / 비율</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => {
          const percent = maxRatio > 0 ? row.ratio / maxRatio : 0;
          return (
            <tr 
              key={idx} 
              style={trHoverStyle}
              onMouseOver={e => (e.currentTarget.style.background = '#f4f6fa')} 
              onMouseOut={e => (e.currentTarget.style.background = '#fff')}
            >
              <td style={tdStyle}>{row.period}</td>
              <td style={{ ...tdStyle, textAlign: 'left', whiteSpace: 'nowrap' }}>
                <span style={{ fontWeight: 600, marginRight: 8, display: 'inline-block', minWidth: '4ch', textAlign: 'right' }}>
                  {row.dailyAmount.toLocaleString()}
                </span>
                <span style={{ display: 'inline-block', verticalAlign: 'middle', width: 80, height: 10, background: '#e5e8eb', borderRadius: 6, overflow: 'hidden', marginRight: 0 }}>
                  <span style={{ display: 'block', height: '100%', width: `${Math.round(percent * 100)}%`, background: getGaugeColor(percent), borderRadius: 6, transition: 'width 0.2s' }} />
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
} 