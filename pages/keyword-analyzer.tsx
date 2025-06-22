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
  const [progress, setProgress] = useState(0);

  const handleAnalyze = async (kw?: string) => {
    const searchKeyword = typeof kw === 'string' ? kw : keyword;
    if (isLoading) return;
    if (typeof searchKeyword !== 'string' || !searchKeyword.trim()) {
      setError('키워드를 입력해주세요.');
      return;
    }

    // Reset states
    setError(null);
    setIsLoading(true);
    setProgress(0);
    setTabOrderRows([]);
    setRatioRows([]);
    setAutoKeywords([]);
    setBlogRows([]);
    setKeyword10Rows([]);
    
    const interval = setInterval(() => {
      setProgress(p => (p < 95 ? p + 5 : p));
    }, 200);

    try {
      const mainPromise = axios.get(`/api/list_1?keyword_give=${encodeURIComponent(searchKeyword)}&part=main`);
      const tabsPromise = axios.get(`/api/list_1?keyword_give=${encodeURIComponent(searchKeyword)}&part=tabs`);
      const datalabPromise = axios.get(`/api/list_1?keyword_give=${encodeURIComponent(searchKeyword)}&part=datalab`);
      const autoKeywordsPromise = axios.get(`/api/list_4?keyword_give=${encodeURIComponent(searchKeyword)}`);
      
      const [mainRes, tabsRes, datalabRes, autoKeywordsRes] = await Promise.all([
        mainPromise,
        tabsPromise,
        datalabPromise,
        autoKeywordsPromise,
      ]);

      // Process main data
      const mainData = mainRes.data;
      if (mainData.error) throw new Error(mainData.error);
      const { keyword_amount, keyword_amount_10, docs_amount, blog_pc_10 } = mainData;
      
      const monthlyPcQcCnt = parseSearchCount(keyword_amount.monthlyPcQcCnt || '0');
      const monthlyMobileQcCnt = parseSearchCount(keyword_amount.monthlyMobileQcCnt || '0');
      const monthlySumQcCnt = monthlyPcQcCnt + monthlyMobileQcCnt;
      const totalDoc = docs_amount.totaldoc;
      const blogPcType = (blog_pc_10 || []).map((b: any) => b.블로그타입).join('');
      const keywordNoSpace = searchKeyword.replace(/\s/g, '');

      setKeywordRows(prev => [
        { relKeyword: keywordNoSpace, monthlyPcQcCnt, monthlyMobileQcCnt, monthlySumQcCnt, totalDoc, blogPcType },
        ...prev
      ]);
      setKeyword10Rows(
        (keyword_amount_10 || []).slice(0, 10).map((row: any) => {
          const pcCount = parseSearchCount(row.monthlyPcQcCnt || '0');
          const mobileCount = parseSearchCount(row.monthlyMobileQcCnt || '0');
          return {
            relKeyword: row.relKeyword,
            monthlyPcQcCnt: pcCount,
            monthlyMobileQcCnt: mobileCount,
            monthlySumQcCnt: pcCount + mobileCount,
          };
        })
      );
      setBlogRows(blog_pc_10 || []);

      // Process and set tabs data
      if (tabsRes.data) {
        const { vwjs_PC, vwjs_MO } = tabsRes.data;
        const pc_entries = Object.entries(vwjs_PC || {});
        const mo_entries = Object.entries(vwjs_MO || {});
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
      }
      
      // Process and set datalab data
      if (datalabRes.data) {
        const datalab = datalabRes.data.datalab_30?.results?.[0]?.data || [];
        const datalabMap: Map<string, number> = new Map(datalab.map((item: any) => [item.period, item.ratio]));
        
        const allDates: string[] = [];
        for (let i = 0; i < 30; i++) {
          const date = new Date();
          date.setDate(date.getDate() - 1 - i);
          allDates.push(date.toISOString().split('T')[0]);
        }
        
        const filledDatalab = allDates.map(dateStr => ({
          period: dateStr,
          ratio: datalabMap.get(dateStr) || 0,
        }));
        
        const sumRatios = filledDatalab.reduce((acc, cur) => acc + cur.ratio, 0);
        
        setRatioRows(filledDatalab.map((row) => ({
          period: row.period.substr(5, 5),
          dailyAmount: sumRatios > 0 ? Math.floor(monthlySumQcCnt * row.ratio / sumRatios) : 0,
          ratio: row.ratio,
        })));
      }

      // Process and set auto keywords
      if (autoKeywordsRes.data) {
        const keywords = (autoKeywordsRes.data.auto_keyword || []).map((k: any) => typeof k === 'string' ? k : String(k));
        setAutoKeywords(keywords.slice(0, 20));
      }

    } catch (err: any) {
      setError(`데이터를 가져오는 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const handleDeleteRow = (idx: number) => {
    setKeywordRows(rows => rows.filter((_, i) => i !== idx));
  };

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
    fontSize: '12px',
  };
  const trHover = {
    transition: 'background 0.15s',
    height: 32,
  };

  const modalBackdropStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalContentStyle: React.CSSProperties = {
    background: 'white',
    padding: '30px 50px',
    borderRadius: '12px',
    textAlign: 'center',
    color: '#333',
    boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2)',
  };

  const progressBarStyle: React.CSSProperties = {
    width: '280px',
    height: '10px',
    background: '#e9ecef',
    borderRadius: '5px',
    overflow: 'hidden',
    marginTop: '12px',
  };

  const progressBarFillStyle = (progress: number): React.CSSProperties => ({
    width: `${progress}%`,
    height: '100%',
    background: 'linear-gradient(90deg, #03c75a, #3182f6)',
    borderRadius: '5px',
    transition: 'width 0.3s ease-in-out',
  });

  function getGaugeColor(percent: number) {
    if (percent < 0.6) return '#ef4444'; 
    if (percent < 0.85) return '#facc15'; 
    return '#22c55e';
  }

  const maxRatio = ratioRows.length > 0 ? Math.max(...ratioRows.map((row: any) => row.ratio)) : 1;

  return (
    <>
      <style jsx>{`
        .container {
          display: flex;
          gap: 32px;
        }
        .left-column {
          flex: 2;
        }
        .right-column {
          flex: 1;
          background: var(--background);
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(49, 130, 246, 0.06);
          padding: 16px 10px 10px 10px;
          margin-bottom: 18px;
          color: var(--foreground);
        }
        @media (max-width: 900px) {
          .container {
            flex-direction: column;
          }
        }
      `}</style>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 60px 20px', fontSize: 14, color: 'var(--foreground)', background: 'var(--background)', fontFamily: 'inherit' }}>
        {isLoading && (
          <div style={modalBackdropStyle}>
            <div style={modalContentStyle}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', fontWeight: 700 }}>조회중...</h3>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>데이터를 수집하고 있습니다. 잠시만 기다려주세요.</p>
              <div style={progressBarStyle}>
                <div style={progressBarFillStyle(progress)}></div>
              </div>
              <p style={{ margin: '12px 0 0', fontSize: '1rem', fontWeight: 'bold', color: '#3182f6' }}>{progress}%</p>
            </div>
          </div>
        )}
        <div className="container">
          <div className="left-column">
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
                  <th style={{ ...thStyle, width: '18%' }}>키워드</th>
                  <th style={{ ...thStyle, width: '10%' }}>PC</th>
                  <th style={{ ...thStyle, width: '10%' }}>MO</th>
                  <th style={{ ...thStyle, width: '12%' }}>SUM</th>
                  <th style={{ ...thStyle, width: '15%' }}>DOC</th>
                  <th style={{ ...thStyle, width: '15%' }}>PC top10</th>
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
                    <td style={tdStyle}>{Number(row.monthlyPcQcCnt).toLocaleString()}</td>
                    <td style={tdStyle}>{Number(row.monthlyMobileQcCnt).toLocaleString()}</td>
                    <td style={tdStyle}>{(Number(row.monthlyPcQcCnt) + Number(row.monthlyMobileQcCnt)).toLocaleString()}</td>
                    <td style={tdStyle}>{Number(row.totalDoc).toLocaleString()}</td>
                    <td style={{ ...tdStyle, letterSpacing: 2 }}>{row.blogPcType.split('').map((c: string, i: number) => c === 'N' ? <span key={i} style={{ color: '#22c55e', fontWeight: 700 }}>N</span> : c)}</td>
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
                    <td style={tdStyle}>{Number(row.monthlyPcQcCnt).toLocaleString()}</td>
                    <td style={tdStyle}>{Number(row.monthlyMobileQcCnt).toLocaleString()}</td>
                    <td style={tdStyle}>{(Number(row.monthlyPcQcCnt) + Number(row.monthlyMobileQcCnt)).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table style={tableStyle}>
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
                {blogRows.map((row, idx) => (
                  <tr key={idx} style={trHover} onMouseOver={e => (e.currentTarget.style.background = '#f4f6fa')} onMouseOut={e => (e.currentTarget.style.background = '#fff')}>
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
          </div>
          <div className="right-column">
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
                    const percent = maxRatio > 0 ? row.ratio / maxRatio : 0;
                    return (
                      <tr key={idx} style={trHover} onMouseOver={e => (e.currentTarget.style.background = '#f4f6fa')} onMouseOut={e => (e.currentTarget.style.background = '#fff')}>
                        <td style={tdStyle}>{row.period}</td>
                        <td style={{ ...tdStyle, textAlign: 'left', whiteSpace: 'nowrap' }}>
                          <span style={{ fontWeight: 600, marginRight: 8, display: 'inline-block', minWidth: '4ch', textAlign: 'right' }}>{row.dailyAmount.toLocaleString()}</span>
                          <span style={{ display: 'inline-block', verticalAlign: 'middle', width: 80, height: 10, background: '#e5e8eb', borderRadius: 6, overflow: 'hidden', marginRight: 0 }}>
                            <span style={{ display: 'block', height: '100%', width: `${Math.round(percent * 100)}%`, background: getGaugeColor(percent), borderRadius: 6, transition: 'width 0.2s' }} />
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
          <div className="right-column">
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
    </>
  );
} 