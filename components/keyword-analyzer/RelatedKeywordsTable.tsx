import { RelKeyword } from "../../types/naver";

interface KeywordRow extends RelKeyword {
  monthlySumQcCnt: number;
}

interface Props {
  keywords: KeywordRow[];
  onKeywordClick: (keyword: string) => void;
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

export default function RelatedKeywordsTable({ keywords, onKeywordClick }: Props) {
  return (
    <table style={{ ...tableStyle,  boxShadow: '0 2px 12px rgba(49,130,246,0.06)', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
      <thead>
        <tr>
          <th style={{ ...thStyle, width: '18%' }}>키워드</th>
          <th style={{ ...thStyle, width: '11%' }}>PC</th>
          <th style={{ ...thStyle, width: '11%' }}>MO</th>
          <th style={{ ...thStyle, width: '12%' }}>SUM</th>
        </tr>
      </thead>
      <tbody>
        {keywords.map((row, idx) => (
          <tr 
            key={idx} 
            style={trHoverStyle}
            onMouseOver={e => (e.currentTarget.style.background = '#f4f6fa')} 
            onMouseOut={e => (e.currentTarget.style.background = '#fff')}
          >
            <td style={tdStyle}>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  onKeywordClick(row.relKeyword);
                }}
              >
                {row.relKeyword}
              </a>
            </td>
            <td style={tdStyle}>{Number(row.monthlyPcQcCnt).toLocaleString()}</td>
            <td style={tdStyle}>{Number(row.monthlyMobileQcCnt).toLocaleString()}</td>
            <td style={tdStyle}>{row.monthlySumQcCnt.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 