import { useState } from 'react';
import axios from 'axios';
import styles from './KeywordAnalyzer.module.css';

console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);

interface KeywordRow {
  relKeyword: string;
  monthlyPcQcCnt: number | string;
  monthlyMobileQcCnt: number | string;
  monthlySumQcCnt: number | string;
  totalDoc: number | string;
  blogPcType: string;
}

interface Keyword10Row {
  relKeyword: string;
  monthlyPcQcCnt: number | string;
  monthlyMobileQcCnt: number | string;
  monthlySumQcCnt: number | string;
}

interface BlogRow {
  블로그링크: string;
  블로그제목: string;
  발행날짜: string;
  블로그타입: string;
  블로그이름: string;
}

interface TabOrderRow {
  pc: string;
  mo: string;
}

interface RatioRow {
  period: string;
  dailyAmount: number;
  ratio: number;
}

// 월간검색수 '<10' 등 처리 유틸
function parseSearchCount(value: string | number): number {
  if (typeof value === 'string' && value.trim().startsWith('<')) {
    return 10;
  }
  const num = parseInt(value.toString().replace(/,/g, ''), 10);
  return isNaN(num) ? 0 : num;
}

const KeywordAnalyzer = () => {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [keywordRows, setKeywordRows] = useState<KeywordRow[]>([]);
  const [keyword10Rows, setKeyword10Rows] = useState<Keyword10Row[]>([]);
  const [tabOrderRows, setTabOrderRows] = useState<TabOrderRow[]>([]);
  const [blogRows, setBlogRows] = useState<BlogRow[]>([]);
  const [ratioRows, setRatioRows] = useState<RatioRow[]>([]);
  const [autoKeywords, setAutoKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiBase = import.meta.env.VITE_API_BASE_URL || '';

  const handleAnalyze = async (kw?: string) => {
    const searchKeyword = typeof kw === 'string' ? kw : keyword;
    if (isLoading) return; // 중복 방지
    if (typeof searchKeyword !== 'string' || !searchKeyword.trim()) {
      setError('키워드를 입력해주세요.');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const res1 = await axios.get(`${apiBase}/api/list_1?keyword_give=${encodeURIComponent(searchKeyword)}`);
      const data = res1.data;
      if (data.error) {
        setError(`서버 오류: ${data.error}`);
        return;
      }
      console.log('NAVER API 응답:', data);
      // 키워드 테이블
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
      // 상위 10개 키워드, 탭순서, 블로그 등은 갱신(덮어쓰기)
      setKeyword10Rows(
        (data.keyword_amount_10 || []).map((row: any) => ({
          relKeyword: row.relKeyword,
          monthlyPcQcCnt: parseSearchCount(row.monthlyPcQcCnt),
          monthlyMobileQcCnt: parseSearchCount(row.monthlyMobileQcCnt),
          monthlySumQcCnt: parseSearchCount(row.monthlyPcQcCnt) + parseSearchCount(row.monthlyMobileQcCnt),
        }) as Keyword10Row)
      );
      // 탭순서
      const tap_order_pc = data.vwjs_PC || {};
      const tap_order_mo = data.vwjs_MO || {};
      const pc_entries = Object.entries(tap_order_pc);
      const mo_entries = Object.entries(tap_order_mo);
      const maxLen = Math.max(pc_entries.length, mo_entries.length);
      const tabRows: TabOrderRow[] = [];
      for (let i = 0; i < maxLen; i++) {
        const pc_entry = pc_entries[i];
        const mo_entry = mo_entries[i];
        tabRows.push({
          pc: pc_entry ? `${pc_entry[0]}: ${pc_entry[1]}` : '',
          mo: mo_entry ? `${mo_entry[0]}: ${mo_entry[1]}` : '',
        });
      }
      setTabOrderRows(tabRows);
      // 블로그
      setBlogRows(data.blog_pc_10 || []);
      // 날짜 및 조회량
      const datalab = data.datalab_30?.results?.[0]?.data || [];
      const sumRatios = datalab.reduce((acc: number, cur: any) => acc + cur.ratio, 0);
      setRatioRows(datalab.map((row: any) => ({
        period: row.period.substr(5, 5),
        dailyAmount: Math.floor(monthlySumQcCnt * row.ratio / sumRatios),
        ratio: row.ratio,
      })));
      // 자동완성
      const res4 = await axios.get(`${apiBase}/api/list_4?keyword_give=${encodeURIComponent(searchKeyword)}`);
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

  // 삭제 버튼 동작
  const handleDeleteRow = (idx: number) => {
    setKeywordRows(rows => rows.filter((_, i) => i !== idx));
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.row}>
          {/* 첫 번째 컬럼: 메인 */}
          <div className={styles.first_column}>
            <h1>키워드 분석기</h1>
            <div className={styles.input_group}>
              <input
                className={styles.input_box}
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !isLoading && handleAnalyze()}
                placeholder="키워드를 입력하세요"
              />
              <button className={styles.btn} onClick={() => handleAnalyze()} type="button" disabled={isLoading}>
                조회하기
              </button>
            </div>
            {error && <div className={styles.error}>{error}</div>}

            {/* 키워드 테이블 */}
            <table className={styles.keyword_table} border={2}>
              <thead>
                <tr>
                  <td style={{ width: '5%' }}>-</td>
                  <td style={{ width: '17%' }}>키워드</td>
                  <td style={{ width: '10%' }}>PC</td>
                  <td style={{ width: '10%' }}>MO</td>
                  <td style={{ width: '12%' }}>SUM</td>
                  <td style={{ width: '12%' }}>DOC</td>
                  <td style={{ width: '20%' }}>PC top10</td>
                </tr>
              </thead>
              <tbody>
                {keywordRows.map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <button className={styles.delete_btn} onClick={() => handleDeleteRow(idx)}>
                        X
                      </button>
                    </td>
                    <td>{row.relKeyword || keyword.replace(/\s/g, '')}</td>
                    <td>{Math.max(Number(row.monthlyPcQcCnt), 10).toLocaleString()}</td>
                    <td>{Math.max(Number(row.monthlyMobileQcCnt), 10).toLocaleString()}</td>
                    <td>{(Math.max(Number(row.monthlyPcQcCnt), 10) + Math.max(Number(row.monthlyMobileQcCnt), 10)).toLocaleString()}</td>
                    <td>{Number(row.totalDoc).toLocaleString()}</td>
                    <td>{row.blogPcType}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 상위 10개 키워드 테이블 */}
            <table className={styles.keyword_10_table} border={2}>
              <thead>
                <tr>
                  <td style={{ width: '18%' }}>키워드</td>
                  <td style={{ width: '11%' }}>PC</td>
                  <td style={{ width: '11%' }}>MO</td>
                  <td style={{ width: '12%' }}>SUM</td>
                </tr>
              </thead>
              <tbody>
                {keyword10Rows.map((row, idx) => (
                  <tr key={idx}>
                    <td>
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
                    <td>{Math.max(Number(row.monthlyPcQcCnt), 10).toLocaleString()}</td>
                    <td>{Math.max(Number(row.monthlyMobileQcCnt), 10).toLocaleString()}</td>
                    <td>{(Math.max(Number(row.monthlyPcQcCnt), 10) + Math.max(Number(row.monthlyMobileQcCnt), 10)).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 탭 순서 테이블 */}
            <div className={styles.tap_table_div}>
              <table border={2} className={styles.tap_table}>
                <thead>
                  <tr>
                    <td>PC 탭순서</td>
                    <td>MO 탭순서</td>
                  </tr>
                </thead>
                <tbody>
                  {tabOrderRows.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.pc}</td>
                      <td>{row.mo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 블로그 테이블 */}
            <table className={styles.blog_table} border={2}>
              <thead>
                <tr>
                  <td colSpan={4}>조회 키워드의 상위10 블로그</td>
                </tr>
                <tr>
                  <td style={{ width: '20%' }}>블로그명</td>
                  <td style={{ width: '8%' }}>출처</td>
                  <td style={{ width: '52%' }}>제목</td>
                  <td style={{ width: '15%' }}>발행일</td>
                </tr>
              </thead>
              <tbody>
                {blogRows.map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <a href={row.블로그링크} target="_blank" rel="noopener noreferrer">
                        {row.블로그이름}
                      </a>
                    </td>
                    <td>{row.블로그타입}</td>
                    <td>{row.블로그제목}</td>
                    <td>{row.발행날짜}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 두 번째 컬럼: 날짜 및 조회량 */}
          <div className={styles.second_column}>
            <h5>날짜 및 조회량</h5>
            <table className={styles.ratio_table} border={1}>
              <tbody>
                {ratioRows.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.period}</td>
                    <td>{row.dailyAmount.toLocaleString()}</td>
                    <td>
                      <meter min="0" max="100" value={row.ratio} low={40} high={70} optimum={80}></meter>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 세 번째 컬럼: 관련 키워드 */}
          <div className={styles.third_column}>
            <h5>관련 키워드</h5>
            <table className={styles.ratio_table} border={1}>
              <tbody>
                {autoKeywords.map((kw, idx) => (
                  <tr key={idx}>
                    <td>
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
    </div>
  );
};

export default KeywordAnalyzer; 