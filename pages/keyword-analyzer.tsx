import { useState } from 'react';
import axios from 'axios';
import ResultTable from '../components/keyword-analyzer/ResultTable';
import RelatedKeywordsTable from '../components/keyword-analyzer/RelatedKeywordsTable';
import TopBlogsTable from '../components/keyword-analyzer/TopBlogsTable';
import TabOrderTable from '../components/keyword-analyzer/TabOrderTable';
import DailyTrendChart from '../components/keyword-analyzer/DailyTrendChart';
import AutoKeywordsList from '../components/keyword-analyzer/AutoKeywordsList';
import LoadingPopup from '../components/keyword-analyzer/LoadingPopup';

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

    // Reset states for new analysis
    setError(null);
    setIsLoading(true);
    setProgress(0);
    // Only reset data for the new keyword, not the main results table
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
        ...prev.filter(row => row.relKeyword !== keywordNoSpace)
      ].slice(0, 10)); // Keep max 10 rows

      setKeyword10Rows((keyword_amount_10 || []).slice(0, 10).map((row: any) => {
        const pcCount = parseSearchCount(row.monthlyPcQcCnt || '0');
        const mobileCount = parseSearchCount(row.monthlyMobileQcCnt || '0');
        return { 
          ...row, 
          monthlyPcQcCnt: pcCount, 
          monthlyMobileQcCnt: mobileCount, 
          monthlySumQcCnt: pcCount + mobileCount 
        };
      }));
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

  const handleKeywordClick = (kw: string) => {
    setKeyword(kw);
    handleAnalyze(kw);
  }

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
        }
        @media (max-width: 900px) {
          .container {
            flex-direction: column;
          }
        }
      `}</style>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 60px 20px', fontSize: 14, color: 'var(--foreground)', background: 'var(--background)', fontFamily: 'inherit' }}>
        {isLoading && <LoadingPopup progress={progress} />}
        
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
            
            <ResultTable rows={keywordRows} onDelete={handleDeleteRow} />
            <RelatedKeywordsTable keywords={keyword10Rows} onKeywordClick={handleKeywordClick} />
            <TopBlogsTable blogs={blogRows} />
            <TabOrderTable rows={tabOrderRows} />

          </div>
          <div className="right-column">
            <h5 style={{ color: '#3182f6', fontSize: '1rem', fontWeight: 700, marginBottom: 10, marginTop: 52 }}>날짜별/요일별 조회량</h5>
            <DailyTrendChart rows={ratioRows} />
          </div>
          <div className="right-column">
            <h5 style={{ color: '#3182f6', fontSize: '1rem', fontWeight: 700, marginBottom: 10, marginTop: 52 }}>관련 키워드</h5>
            <AutoKeywordsList keywords={autoKeywords} onKeywordClick={handleKeywordClick} />
          </div>
        </div>
      </div>
    </>
  );
} 