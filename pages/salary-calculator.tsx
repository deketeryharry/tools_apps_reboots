import { useState } from 'react';
import CommonInput from '../components/CommonInput';
import CommonButton from '../components/CommonButton';

function format(num: number) {
  return num.toLocaleString() + '원';
}

export default function SalaryCalculator() {
  const [salary, setSalary] = useState('');
  const [taxFree, setTaxFree] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    const annual = Number(salary);
    const taxFreeMonth = Number(taxFree);
    if (isNaN(annual) || annual <= 0) {
      setError('연봉을 올바르게 입력하세요.');
      return;
    }
    if (isNaN(taxFreeMonth) || taxFreeMonth < 0) {
      setError('비과세액(월)을 올바르게 입력하세요.');
      return;
    }
    const taxFreeYear = taxFreeMonth * 12;
    const monthlyIncome = Math.round((annual - taxFreeYear) / 12 + taxFreeMonth);

    // 국민연금: 39~617만원 한도
    const pensionBase = Math.min(Math.max(monthlyIncome, 390000), 6170000);
    const pension = Math.round(pensionBase * 0.045);

    // 건강보험
    const health = Math.round(monthlyIncome * 0.03545);

    // 장기요양
    const care = Math.round(health * 0.1295);

    // 고용보험
    const employ = Math.round(monthlyIncome * 0.009);

    // 근로소득세 (간이, 실제는 더 복잡. 1억 기준 약 98만원/월)
    let incomeTax = 0;
    if (annual >= 100000000) incomeTax = 986720;
    else if (annual >= 80000000) incomeTax = 700000;
    else if (annual >= 60000000) incomeTax = 500000;
    else incomeTax = 200000;

    // 지방소득세
    const localTax = Math.round(incomeTax * 0.1);

    // 실수령액
    const real = monthlyIncome - pension - health - care - employ - incomeTax - localTax;

    // 시급 (209시간 기준)
    const hourly = Math.round(monthlyIncome / 209);

    // 기준중위소득 (2024년 1인가구 1,752,833원)
    const median = Math.round((monthlyIncome / 1752833) * 100);

    setResult({
      monthlyIncome,
      pension,
      health,
      care,
      employ,
      incomeTax,
      localTax,
      real,
      hourly,
      median,
    });
  };

  return (
    <div style={{ maxWidth: 600, margin: '48px auto', padding: 32, background: '#fff', borderRadius: 24 }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 32, textAlign: 'center' }}>연봉 계산기</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontWeight: 500, marginBottom: 2 }}>연봉(원)</label>
          <CommonInput type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder="예: 50000000" min={0} style={{ width: 140 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontWeight: 500, marginBottom: 2 }}>비과세액(월)</label>
          <CommonInput type="number" value={taxFree} onChange={e => setTaxFree(e.target.value)} placeholder="예: 200000" min={0} style={{ width: 100 }} />
        </div>
        <CommonButton style={{ marginLeft: 16, height: 44 }} onClick={calculate}>실수령액 계산하기</CommonButton>
      </div>
      {error && <div style={{ color: '#ff5a5a', background: '#fff0f0', border: '1px solid #ffbdbd', borderRadius: 8, padding: '8px 12px', marginBottom: 12, fontSize: 14, textAlign: 'center' }}>{error}</div>}
      {result && (
        <div style={{
          marginTop: 32,
          background: '#fafbfc',
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          border: '1px solid #e5e8eb',
          padding: 32,
          maxWidth: 520,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <div style={{ fontWeight: 600, fontSize: 18, borderBottom: '1px solid #e5e8eb', paddingBottom: 12, marginBottom: 24 }}>계산 결과</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 20, marginBottom: 16 }}>
            <span>예상 소득액(월)</span>
            <span>{format(result.monthlyIncome)}</span>
          </div>
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>
                <b>국민연금</b>
                <span style={{ color: '#888', fontSize: 13, marginLeft: 8 }}>월소득액 * 4.5%(월 최저 39만원, 최고 617만원)</span>
              </span>
              <span>{format(result.pension)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>
                <b>건강보험</b>
                <span style={{ color: '#888', fontSize: 13, marginLeft: 8 }}>월소득액 * 3.545%</span>
              </span>
              <span>{format(result.health)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>
                <b>장기요양</b>
                <span style={{ color: '#888', fontSize: 13, marginLeft: 8 }}>건강보험료 * 12.95%</span>
              </span>
              <span>{format(result.care)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>
                <b>고용보험</b>
                <span style={{ color: '#888', fontSize: 13, marginLeft: 8 }}>월소득액 * 0.9%</span>
              </span>
              <span>{format(result.employ)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>
                <b>근로소득세</b>
                <span style={{ color: '#888', fontSize: 13, marginLeft: 8 }}>간이세액표, 자녀공제(0원)</span>
              </span>
              <span>{format(result.incomeTax)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>
                <b>지방소득세</b>
                <span style={{ color: '#888', fontSize: 13, marginLeft: 8 }}>근로소득세 * 10%</span>
              </span>
              <span>{format(result.localTax)}</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 20, margin: '24px 0 8px 0' }}>
            <span>예상 실수령액(월)</span>
            <span>{format(result.real)}</span>
          </div>
          <div style={{ color: '#444', fontSize: 15, marginTop: 8 }}>
            <div>시급(209시간 기준): <b>{format(result.hourly)}</b></div>
            <div>기준중위소득: <b>{result.median}%</b></div>
          </div>
        </div>
      )}
    </div>
  );
} 