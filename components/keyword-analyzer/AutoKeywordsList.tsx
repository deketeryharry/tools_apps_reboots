interface Props {
  keywords: string[];
  onKeywordClick: (keyword: string) => void;
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
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

export default function AutoKeywordsList({ keywords, onKeywordClick }: Props) {
  if (keywords.length === 0) {
    return null;
  }
  
  return (
    <table style={{ ...tableStyle,  boxShadow: '0 2px 12px rgba(49,130,246,0.06)', borderRadius: 12, overflow: 'hidden' }}>
      <tbody>
        {keywords.map((kw, idx) => (
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
                  onKeywordClick(kw);
                }}
              >
                {kw}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 