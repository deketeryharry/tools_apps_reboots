interface TabRow {
  pc: string;
  mo: string;
}

interface Props {
  rows: TabRow[];
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

export default function TabOrderTable({ rows }: Props) {
  return (
    <table style={{ ...tableStyle,  boxShadow: '0 2px 12px rgba(49,130,246,0.06)', borderRadius: 12, overflow: 'hidden' }}>
      <thead>
        <tr>
          <th style={{ ...thStyle, width: '50%' }}>PC 탭순서</th>
          <th style={{ ...thStyle, width: '50%' }}>MO 탭순서</th>
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
            <td style={tdStyle}>{row.pc}</td>
            <td style={tdStyle}>{row.mo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 