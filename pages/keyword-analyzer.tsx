import { useState } from 'react';
import axios from 'axios';

function parseSearchCount(value: string | number): number {
  if (typeof value === 'string' && value.trim().startsWith('<')) {
    return 10;
  }
  const num = parseInt(value.toString().replace(/,/g, ''), 10);
  return isNaN(num) ? 0 : num;
}

export default function KeywordAnalyzer() {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [keywordRows, setKeywordRows] = useState<any[]>([]);
  const [keyword10Rows, setKeyword10Rows] = useState<any[]>([]);
  const [tabOrderRows, setTabOrderRows] = useState<any[]>([]);
  const [blogRows, setBlogRows] = useState<any[]>([]);
  const [ratioRows, setRatioRows] = useState<any[]>([]);
  const [autoKeywords, setAutoKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (kw?: string) => {
    const searchKeyword = typeof kw === 'string' ? kw : keyword;
    if (isLoading) return;
    if (typeof searchKeyword !== 'string' || !searchKeyword.trim()) {
      setError('키워드를 입력해주세요.');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const res1 = await axios.get(`/api/list_1?keyword_give=${encodeURIComponent(searchKeyword)}`);
      const data = res1.data;
      if (data.error) {
        setError(`서버 오류: ${data.error}`);
        return;
      }
      const keyword_amount = data.keyword_amount;
      const relKeyword = keyword_amount.relKeyword;
      const monthlyPcQcCnt = parseSearchCount(keyword_amount.monthlyPcQcCnt);
      const monthlyMobileQcCnt = parseSearchCount(keyword_amount.monthlyMobileQcCnt);
      const monthlySumQcCnt = monthlyPcQcCnt + monthlyMobileQcCnt;
      const totalDoc = data.docs_amount.totaldoc;
      const blogPcType = data.blog_pc_10.map((b: any) => b.블로그타입).join('');
      const keywordNoSpace = (typeof kw === 'string' ? kw : keyword).replace(/\s/g, '');
      setKeywordRows(prev => [
        { relKeyword: keywordNoSpace, monthlyPcQcCnt, monthlyMobileQcCnt, monthlySumQcCnt, totalDoc, blogPcType },
        ...prev
      ]);
      setKeyword10Rows(
        (data.keyword_amount_10 || []).map((row: any) => ({
          relKeyword: row.relKeyword,
          monthlyPcQcCnt: parseSearchCount(row.monthlyPcQcCnt),
          monthlyMobileQcCnt: parseSearchCount(row.monthlyMobileQcCnt),
          monthlySumQcCnt: parseSearchCount(row.monthlyPcQcCnt) + parseSearchCount(row.monthlyMobileQcCnt),
        }))
      );
      const tap_order_pc = data.vwjs_PC || {};
      const tap_order_mo = data.vwjs_MO || {};
      const pc_entries = Object.entries(tap_order_pc);
      const mo_entries = Object.entries(tap_order_mo);
      const maxLen = Math.max(pc_entries.length, mo_entries.length);
      const tabRows: any[] = [];
      for (let i = 0; i < maxLen; i++) {
        const pc_entry = pc_entries[i];
        const mo_entry = mo_entries[i];
        tabRows.push({
          pc: pc_entry ? `${pc_entry[0]}: ${pc_entry[1]}` : '',
          mo: mo_entry ? `${mo_entry[0]}: ${mo_entry[1]}` : '',
        });
      }
      setTabOrderRows(tabRows);
      setBlogRows(data.blog_pc_10 || []);
      const datalab = data.datalab_30?.results?.[0]?.data || [];
      const sumRatios = datalab.reduce((acc: number, cur: any) => acc + cur.ratio, 0);
      setRatioRows(datalab.map((row: any) => ({
        period: row.period.substr(5, 5),
        dailyAmount: Math.floor(monthlySumQcCnt * row.ratio / sumRatios),
        ratio: row.ratio,
      })));
      const res4 = await axios.get(`/api/list_4?keyword_give=${encodeURIComponent(searchKeyword)}`);
      setAutoKeywords((res4.data.auto_keyword || []).map((k: any) => typeof k === 'string' ? k : String(k)));
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(`서버 오류: ${err.response.data.error}`);
      } else {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRow = (idx: number) => {
    setKeywordRows(rows => rows.filter((_, i) => i !== idx));
  };

  // 표 스타일 공통 객체
  const tableStyle = {
    width: '100%',
    borderCollapse: 'separate' as const,
    borderSpacing: 0,
    background: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(49,130,246,0.06)',
    marginBottom: 12,
    fontSize: 13,
  };
  const thStyle = {
    background: '#222',
    color: '#fff',
    fontWeight: 700,
    padding: '7px 6px',
    borderBottom: '2px solid #e5e8eb',
    textAlign: 'center' as const,
    fontSize: 13,
  };
  const tdStyle = {
    padding: '6px 6px',
    textAlign: 'center' as const,
    borderBottom: '1px solid #e5e8eb',
    background: '#fff',
    fontSize: 13,
  };
  const trHover = {
    transition: 'background 0.15s',
    height: 32,
  };
  // 게이지 색상 함수
  function getGaugeColor(percent: number) {
    if (percent < 0.6) return '#ef4444'; // 빨강
    if (percent < 0.85) return '#facc15'; // 노랑
    return '#22c55e'; // 초록
  }
  // 날짜별 조회량 게이지 최대값 계산
  const maxRatio = ratioRows.length > 0 ? Math.max(...ratioRows.map((row: any) => row.ratio)) : 1;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 0 60px 0', fontSize: 14, color: 'var(--foreground)', background: 'var(--background)', fontFamily: 'inherit' }}>
      <div style={{ display: 'flex', gap: 32 }}>
        <div style={{ flex: 2 }}>
          <h1 style={{ color: 'var(--foreground)' }}>키워드 분석기</h1>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <input
              style={{ flex: 1, padding: '10px 12px', border: '1.5px solid #03c75a', borderRadius: 8, fontSize: 14, outline: 'none', background: 'var(--background)', color: 'var(--foreground)' }}
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !isLoading && handleAnalyze()}
              placeholder="키워드를 입력하세요"
            />
            <button style={{ background: 'linear-gradient(90deg, #03c75a 60%, #3182f6 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '0 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer', height: 36, fontFamily: 'inherit' }} onClick={() => handleAnalyze()} disabled={isLoading}>
              조회하기
            </button>
          </div>
          {error && <div style={{ color: '#ff5a5a', background: 'var(--background)', border: '1px solid #ffbdbd', borderRadius: 8, padding: '8px 12px', marginBottom: 12, fontSize: 13 }}>{error}</div>}
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: '5%' }}>-</th>
                <th style={{ ...thStyle, width: '17%' }}>키워드</th>
                <th style={{ ...thStyle, width: '10%' }}>PC</th>
                <th style={{ ...thStyle, width: '10%' }}>MO</th>
                <th style={{ ...thStyle, width: '12%' }}>SUM</th>
                <th style={{ ...thStyle, width: '12%' }}>DOC</th>
                <th style={{ ...thStyle, width: '20%' }}>PC top10</th>
              </tr>
            </thead>
            <tbody>
              {keywordRows.map((row, idx) => (
                <tr key={idx} style={trHover} onMouseOver={e => (e.currentTarget.style.background = '#f4f6fa')} onMouseOut={e => (e.currentTarget.style.background = '#fff')}>
                  <td style={tdStyle}>
                    <button style={{ background: '#fff', color: '#ff5a5a', border: '1.5px solid #ff5a5a', borderRadius: 6, fontSize: 12, padding: '2px 8px', cursor: 'pointer' }} onClick={() => handleDeleteRow(idx)}>
                      X
                    </button>
                  </td>
                  <td style={tdStyle}>{row.relKeyword || keyword.replace(/\s/g, '')}</td>
                  <td style={tdStyle}>{Math.max(Number(row.monthlyPcQcCnt), 10).toLocaleString()}</td>
                  <td style={tdStyle}>{Math.max(Number(row.monthlyMobileQcCnt), 10).toLocaleString()}</td>
                  <td style={tdStyle}>{(Math.max(Number(row.monthlyPcQcCnt), 10) + Math.max(Number(row.monthlyMobileQcCnt), 10)).toLocaleString()}</td>
                  <td style={tdStyle}>{Number(row.totalDoc).toLocaleString()}</td>
                  <td style={{ ...tdStyle, letterSpacing: 2 }}>{row.blogPcType.split('').map((c: string, i: number) => c === 'N' ? <span key={i} style={{ color: '#22c55e', fontWeight: 700 }}>N</span> : c).reduce((a: any, b: any) => [a, b])}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: '18%' }}>키워드</th>
                <th style={{ ...thStyle, width: '11%' }}>PC</th>
                <th style={{ ...thStyle, width: '11%' }}>MO</th>
                <th style={{ ...thStyle, width: '12%' }}>SUM</th>
              </tr>
            </thead>
            <tbody>
              {keyword10Rows.map((row, idx) => (
                <tr key={idx} style={trHover} onMouseOver={e => (e.currentTarget.style.background = '#f4f6fa')} onMouseOut={e => (e.currentTarget.style.background = '#fff')}>
                  <td style={tdStyle}>
                    <a
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        setKeyword(row.relKeyword);
                        handleAnalyze(row.relKeyword);
                      }}
                    >
                      {row.relKeyword}
                    </a>
                  </td>
                  <td style={tdStyle}>{Math.max(Number(row.monthlyPcQcCnt), 10).toLocaleString()}</td>
                  <td style={tdStyle}>{Math.max(Number(row.monthlyMobileQcCnt), 10).toLocaleString()}</td>
                  <td style={tdStyle}>{(Math.max(Number(row.monthlyPcQcCnt), 10) + Math.max(Number(row.monthlyMobileQcCnt), 10)).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: '50%' }}>PC 탭순서</th>
                  <th style={{ ...thStyle, width: '50%' }}>MO 탭순서</th>
                </tr>
              </thead>
              <tbody>
                {tabOrderRows.map((row, idx) => (
                  <tr key={idx} style={trHover} onMouseOver={e => (e.currentTarget.style.background = '#f4f6fa')} onMouseOut={e => (e.currentTarget.style.background = '#fff')}>
                    <td style={tdStyle}>{row.pc}</td>
                    <td style={tdStyle}>{row.mo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle} colSpan={4}>조회 키워드의 상위10 블로그</th>
              </tr>
              <tr>
                <th style={{ ...thStyle, width: '20%' }}>블로그명</th>
                <th style={{ ...thStyle, width: '8%' }}>출처</th>
                <th style={{ ...thStyle, width: '52%' }}>제목</th>
                <th style={{ ...thStyle, width: '15%' }}>발행일</th>
              </tr>
            </thead>
            <tbody>
              {blogRows.map((row, idx) => (
                <tr key={idx} style={trHover} onMouseOver={e => (e.currentTarget.style.background = '#f4f6fa')} onMouseOut={e => (e.currentTarget.style.background = '#fff')}>
                  <td style={tdStyle}>
                    <a href={row.블로그링크} target="_blank" rel="noopener noreferrer">
                      {row.블로그이름}
                    </a>
                  </td>
                  <td style={tdStyle}>{row.블로그타입}</td>
                  <td style={tdStyle}>{row.블로그제목}</td>
                  <td style={tdStyle}>{row.발행날짜}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ flex: 1, background: 'var(--background)', borderRadius: 12, boxShadow: '0 2px 12px rgba(49, 130, 246, 0.06)', padding: '16px 10px 10px 10px', marginBottom: 18, color: 'var(--foreground)' }}>
          <h5 style={{ color: '#3182f6', fontSize: '1rem', fontWeight: 700, marginBottom: 10 }}>날짜 및 조회량</h5>
          {ratioRows.length > 0 ? (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: '50%' }}>날짜</th>
                  <th style={{ ...thStyle, width: '50%' }}>조회량 / 비율</th>
                </tr>
              </thead>
              <tbody>
                {ratioRows.map((row, idx) => {
                  const percent = row.ratio / maxRatio;
                  return (
                    <tr key={idx} style={trHover} onMouseOver={e => (e.currentTarget.style.background = '#f4f6fa')} onMouseOut={e => (e.currentTarget.style.background = '#fff')}>
                      <td style={tdStyle}>{row.period}</td>
                      <td style={{ ...tdStyle, textAlign: 'left' }}>
                        <span style={{ fontWeight: 600, marginRight: 8 }}>{row.dailyAmount.toLocaleString()}</span>
                        <span style={{ display: 'inline-block', verticalAlign: 'middle', width: 80, height: 10, background: '#e5e8eb', borderRadius: 6, overflow: 'hidden', marginRight: 0 }}>
                          <span style={{ display: 'inline-block', height: '100%', width: `${Math.round(percent * 100)}%`, background: getGaugeColor(percent), borderRadius: 6, transition: 'width 0.2s' }} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div style={{ color: '#8b95a1', fontSize: '0.98rem' }}>데이터 없음</div>
          )}
        </div>
        <div style={{ flex: 1, background: 'var(--background)', borderRadius: 12, boxShadow: '0 2px 12px rgba(49, 130, 246, 0.06)', padding: '16px 10px 10px 10px', marginBottom: 18, color: 'var(--foreground)' }}>
          <h5 style={{ color: '#3182f6', fontSize: '1rem', fontWeight: 700, marginBottom: 10 }}>관련 키워드</h5>
          <table style={tableStyle}>
            <tbody>
              {autoKeywords.map((kw, idx) => (
                <tr key={idx} style={trHover} onMouseOver={e => (e.currentTarget.style.background = '#f4f6fa')} onMouseOut={e => (e.currentTarget.style.background = '#fff')}>
                  <td style={tdStyle}>
                    <a
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        setKeyword(kw);
                        handleAnalyze(kw);
                      }}
                    >
                      {kw}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 