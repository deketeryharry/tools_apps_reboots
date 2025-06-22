interface Blog {
  블로그링크: string;
  블로그이름: string;
  블로그타입: 'N' | 'T' | 'D' | 'E';
  블로그제목: string;
  발행날짜: string;
}

interface Props {
  blogs: Blog[];
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

export default function TopBlogsTable({ blogs }: Props) {
  return (
    <table style={{ ...tableStyle,  boxShadow: '0 2px 12px rgba(49,130,246,0.06)', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
      <thead>
        <tr>
          <th style={thStyle} colSpan={4}>조회 키워드의 상위10 블로그</th>
        </tr>
        <tr>
          <th style={{ ...thStyle, width: '20%' }}>블로그명</th>
          <th style={{ ...thStyle, width: '8%' }}>출처</th>
          <th style={{ ...thStyle, width: '57%' }}>제목</th>
          <th style={{ ...thStyle, width: '15%' }}>발행일</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((row, idx) => (
          <tr 
            key={idx} 
            style={trHoverStyle}
            onMouseOver={e => (e.currentTarget.style.background = '#f4f6fa')} 
            onMouseOut={e => (e.currentTarget.style.background = '#fff')}
          >
            <td style={tdStyle}>
              <a href={row.블로그링크} target="_blank" rel="noopener noreferrer">
                {row.블로그이름}
              </a>
            </td>
            <td style={tdStyle}>{row.블로그타입}</td>
            <td style={{...tdStyle, textAlign: 'left'}}>{row.블로그제목}</td>
            <td style={{...tdStyle, whiteSpace: 'nowrap'}}>{row.발행날짜}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 