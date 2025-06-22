import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

interface NewsData {
  title: string;
  desc: string;
  img: string;
}

interface SentenceAnalysis {
  sentences: string[];
  keywordSentences: string[];
  contextSentences: string[];
}

export default function NewsAnalyzer() {
  const [keyword, setKeyword] = useState('');
  const [news, setNews] = useState<NewsData | null>(null);
  const [analysis, setAnalysis] = useState<SentenceAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedTitles, setSavedTitles] = useState<string[]>([]);

  const handleSearch = async () => {
    if (!keyword.trim()) {
      setError('키워드를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/news-api', { keyword });
      const newsData = response.data;
      
      setNews(newsData);
      
      // 문장 분석
      const sentences = newsData.desc.split('.').filter((s: string) => s.trim()).map((s: string) => s.trim() + '.');
      const keywordSentences = sentences.filter((s: string) => s.includes(keyword));
      
      const contextSentences: string[] = [];
      sentences.forEach((sentence: string, index: number) => {
        if (sentence.includes(keyword)) {
          let context = '';
          
          if (index === 0) {
            // 첫 번째 문장인 경우
            context = sentence + (sentences[index + 1] || '') + (sentences[index + 2] || '');
          } else if (index === sentences.length - 1) {
            // 마지막 문장인 경우
            context = (sentences[index - 2] || '') + (sentences[index - 1] || '') + sentence;
          } else {
            // 중간 문장인 경우
            context = (sentences[index - 1] || '') + sentence + (sentences[index + 1] || '');
          }
          
          contextSentences.push(context);
        }
      });

      setAnalysis({
        sentences,
        keywordSentences,
        contextSentences
      });

      // 제목 저장 (실제로는 서버에 저장하지만 여기서는 상태로 관리)
      setSavedTitles(prev => [newsData.title, ...prev]);

    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        console.error("뉴스 분석기 오류 상세 정보:", err);
        setError('오류가 발생했습니다. 개발자 콘솔(F12)의 Console 탭에서 상세 정보를 확인해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSearch();
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 60px 20px', fontSize: 14, color: 'var(--foreground)', background: 'var(--background)', fontFamily: 'inherit' }}>
      <Head>
        <title>실시간검색어 자동문서 생성 - 뉴스 분석기</title>
        <meta name="description" content="키워드 기반 뉴스 분석 및 자동 문서 생성" />
      </Head>

      <div style={{ display: 'flex', gap: 32 }}>
        <div style={{ flex: 2 }}>
          <h1 style={{ color: 'var(--foreground)', marginBottom: 20 }}>실시간검색어 자동문서 생성</h1>
          
          {/* 검색 폼 */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <input
              style={{ 
                flex: 1, 
                padding: '10px 12px', 
                border: '1.5px solid #03c75a', 
                borderRadius: 8, 
                fontSize: 14, 
                outline: 'none', 
                background: 'var(--background)', 
                color: 'var(--foreground)' 
              }}
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="키워드를 입력하세요"
            />
            <button 
              style={{ 
                background: 'linear-gradient(90deg, #03c75a 60%, #3182f6 100%)', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 8, 
                padding: '0 18px', 
                fontSize: 14, 
                fontWeight: 700, 
                cursor: 'pointer', 
                height: 36, 
                fontFamily: 'inherit' 
              }} 
              onClick={handleSearch} 
              disabled={isLoading}
            >
              {isLoading ? '검색 중...' : '검색'}
            </button>
          </div>

          {error && (
            <div style={{ 
              color: '#ff5a5a', 
              background: 'var(--background)', 
              border: '1px solid #ffbdbd', 
              borderRadius: 8, 
              padding: '8px 12px', 
              marginBottom: 12, 
              fontSize: 13 
            }}>
              {error}
            </div>
          )}

          {/* 뉴스 내용 */}
          {news && (
            <div style={{ marginBottom: 30 }}>
              <div style={{ 
                border: '1px solid #333', 
                margin: '10px 0', 
                fontSize: 12,
                background: '#fff',
                borderRadius: 8,
                overflow: 'hidden'
              }}>
                <div style={{ padding: '10px' }}>
                  <h2 style={{ 
                    padding: '5px', 
                    fontWeight: 'bold', 
                    fontSize: '20px', 
                    margin: '20px 0 10px 0',
                    color: '#333'
                  }}>
                    {news.title}
                  </h2>
                  {news.img && (
                    <div style={{ marginBottom: 10 }}>
                      <img 
                        src={news.img} 
                        alt="뉴스 이미지" 
                        style={{ width: '100%', borderRadius: 4 }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div style={{ 
                    padding: '5px', 
                    color: '#666',
                    lineHeight: 1.6
                  }}>
                    {news.desc.trim()}
                  </div>
                </div>
              </div>

              {/* 소스 코드 */}
              <div style={{ marginTop: 20 }}>
                <h3 style={{ marginBottom: 10, color: 'var(--foreground)' }}>소스 코드</h3>
                <textarea 
                  style={{
                    width: '100%', 
                    height: 150, 
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: 4,
                    fontSize: 12,
                    fontFamily: 'monospace',
                    background: '#f8f9fa'
                  }}
                  readOnly
                  value={`<div class="image"><img src="${news.img}" /></div><div class="desc">${news.desc.trim()}</div>`}
                />
              </div>
            </div>
          )}

          {/* 문장 분석 결과 */}
          {analysis && (
            <div style={{ marginTop: 30 }}>
              <h2 style={{ color: 'var(--foreground)', marginBottom: 20 }}>문장 분석 결과</h2>
              
              {/* 전체 문장 수 */}
              <div style={{ 
                background: '#fff', 
                padding: '15px', 
                borderRadius: 8, 
                marginBottom: 20,
                border: '1px solid #e5e8eb'
              }}>
                <h3 style={{ marginBottom: 10, color: '#333' }}>전체 문장 수</h3>
                <p style={{ fontSize: 16, fontWeight: 'bold', color: '#3182f6' }}>
                  {analysis.sentences.length}개
                </p>
              </div>

              {/* 키워드가 포함된 문장 */}
              {analysis.keywordSentences.length > 0 && (
                <div style={{ 
                  background: '#fff', 
                  padding: '15px', 
                  borderRadius: 8, 
                  marginBottom: 20,
                  border: '1px solid #e5e8eb'
                }}>
                  <h3 style={{ marginBottom: 10, color: '#333' }}>
                    검색한 키워드가 포함된 문장 ({analysis.keywordSentences.length}개)
                  </h3>
                  {analysis.keywordSentences.map((sentence, index) => (
                    <div key={index} style={{ 
                      padding: '8px', 
                      margin: '5px 0', 
                      background: '#f8f9fa', 
                      borderRadius: 4,
                      borderLeft: '3px solid #03c75a'
                    }}>
                      {sentence}
                    </div>
                  ))}
                </div>
              )}

              {/* 키워드 포함 문장의 앞뒤 문맥 */}
              {analysis.contextSentences.length > 0 && (
                <div style={{ 
                  background: '#fff', 
                  padding: '15px', 
                  borderRadius: 8, 
                  marginBottom: 20,
                  border: '1px solid #e5e8eb'
                }}>
                  <h3 style={{ marginBottom: 10, color: '#333' }}>
                    키워드 포함 문장의 앞뒤 문맥 ({analysis.contextSentences.length}개)
                  </h3>
                  <p style={{ fontSize: 12, color: '#666', marginBottom: 15 }}>
                    뉴스 본문에서 이 부분만 데이터베이스에 입력합니다.
                  </p>
                  {analysis.contextSentences.map((context, index) => (
                    <div key={index} style={{ 
                      padding: '12px', 
                      margin: '8px 0', 
                      background: '#f0f8ff', 
                      borderRadius: 6,
                      border: '1px solid #e1f5fe'
                    }}>
                      {context}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 사이드바 - 저장된 제목들 */}
        <div style={{ flex: 1 }}>
          <div style={{ 
            background: '#fff', 
            padding: '20px', 
            borderRadius: 8, 
            border: '1px solid #e5e8eb',
            position: 'sticky',
            top: 20
          }}>
            <h3 style={{ marginBottom: 15, color: '#333' }}>저장된 제목들</h3>
            {savedTitles.length > 0 ? (
              <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                {savedTitles.map((title, index) => (
                  <div key={index} style={{ 
                    padding: '8px', 
                    margin: '5px 0', 
                    background: '#f8f9fa', 
                    borderRadius: 4,
                    fontSize: 12,
                    borderLeft: '3px solid #3182f6'
                  }}>
                    {title}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#666', fontSize: 12 }}>저장된 제목이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 