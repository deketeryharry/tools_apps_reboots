interface KeywordResult {
  relKeyword: string;
  monthlyPcQcCnt: number;
  monthlyMobileQcCnt: number;
  monthlySumQcCnt: number;
  totalDoc: number;
  blogPcType: string;
}

interface Props {
  rows: KeywordResult[];
  onDelete: (index: number) => void;
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

export default function ResultTable({ rows, onDelete }: Props) {
  return (
    <table style={{ ...tableStyle,  boxShadow: '0 2px 12px rgba(49,130,246,0.06)', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
      <thead>
        <tr>
          <th style={{ ...thStyle, width: '5%' }}>-</th>
          <th style={{ ...thStyle, width: '18%' }}>키워드</th>
          <th style={{ ...thStyle, width: '10%' }}>PC</th>
          <th style={{ ...thStyle, width: '10%' }}>MO</th>
          <th style={{ ...thStyle, width: '12%' }}>SUM</th>
          <th style={{ ...thStyle, width: '15%' }}>DOC</th>
          <th style={{ ...thStyle, width: '15%' }}>PC top10</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr 
            key={idx} 
            style={trHoverStyle}
            onMouseOver={e => (e.currentTarget.style.background = '#f4f6fa')} 
            onMouseOut={e => (e.currentTarget.style.background = '#fff')}
          >
            <td style={tdStyle}>
              <button style={{ background: '#fff', color: '#ff5a5a', border: '1.5px solid #ff5a5a', borderRadius: 6, fontSize: 12, padding: '2px 8px', cursor: 'pointer' }} onClick={() => onDelete(idx)}>
                X
              </button>
            </td>
            <td style={tdStyle}>{row.relKeyword}</td>
            <td style={tdStyle}>{row.monthlyPcQcCnt.toLocaleString()}</td>
            <td style={tdStyle}>{row.monthlyMobileQcCnt.toLocaleString()}</td>
            <td style={tdStyle}>{row.monthlySumQcCnt.toLocaleString()}</td>
            <td style={tdStyle}>{row.totalDoc.toLocaleString()}</td>
            <td style={{ ...tdStyle, letterSpacing: 2 }}>{row.blogPcType.split('').map((c: string, i: number) => c === 'N' ? <span key={i} style={{ color: '#22c55e', fontWeight: 700 }}>N</span> : c)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 