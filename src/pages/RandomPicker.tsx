import { useState } from 'react'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import styles from './RandomPicker.module.css'

export default function RandomPicker() {
  const [input, setInput] = useState('')
  const [numWinners, setNumWinners] = useState('')
  const [winners, setWinners] = useState<string[]>([])
  const [timestamp, setTimestamp] = useState<string>('')
  const [removeDuplicates, setRemoveDuplicates] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const formatTimestamp = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  const handlePickRandom = () => {
    let items = input
      .split(/[\n,]/)
      .map(item => item.trim())
      .filter(item => item.length > 0)
    if (removeDuplicates) {
      items = [...new Set(items)]
    }
    const n = parseInt(numWinners)
    if (items.length === 0) {
      alert('항목을 입력해주세요!')
      return
    }
    if (!n || n < 1) {
      alert('당첨자 수를 1 이상으로 입력해주세요!')
      return
    }
    if (n > items.length) {
      alert('당첨자 수는 항목 수보다 클 수 없습니다!')
      return
    }
    setIsLoading(true)
    setProgress(0)
    setWinners([])
    setTimestamp('')
    let percent = 0
    const interval = setInterval(() => {
      percent += Math.floor(Math.random() * 18) + 8
      if (percent >= 100) {
        percent = 100
        setProgress(percent)
        clearInterval(interval)
        setTimeout(() => {
          const shuffled = [...items].sort(() => Math.random() - 0.5)
          const selected = shuffled.slice(0, n)
          setWinners(selected)
          setTimestamp(formatTimestamp())
          setIsLoading(false)
        }, 400)
      } else {
        setProgress(percent)
      }
    }, 180)
  }

  const handleCopy = () => {
    const text = winners.join('\n')
    navigator.clipboard.writeText(text)
    alert('결과가 클립보드에 복사되었습니다!')
  }

  const handleClear = () => {
    setInput('')
    setWinners([])
    setTimestamp('')
    setNumWinners('')
    setProgress(0)
    setIsLoading(false)
  }

  return (
    <div className={styles.card}>
      <h1 className={styles.heading}>랜덤 당첨자 추출기</h1>
      <label className={styles.label}>항목 입력 (줄바꿈 또는 쉼표로 구분)</label>
      <textarea
        className={styles.textarea}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={"예시:\nuser1@example.com\nuser2@example.com\nuser3@example.com"}
      />
      <div className={styles.inputRow}>
        <div className={styles.inputWrap}>
          <label className={styles.label}>당첨자 수</label>
          <input
            type="number"
            min="1"
            value={numWinners}
            onChange={e => setNumWinners(e.target.value.replace(/[^\d]/g, ''))}
            className={styles.input}
            placeholder="숫자 입력"
            disabled={isLoading}
          />
        </div>
        <div className={styles.checkboxRow}>
          <div className={styles.checkboxWrap} style={{ marginTop: 24 }}>
            <input
              type="checkbox"
              id="removeDuplicates"
              checked={removeDuplicates}
              onChange={(e) => setRemoveDuplicates(e.target.checked)}
              className={styles.checkbox}
              disabled={isLoading}
            />
            <label htmlFor="removeDuplicates" className={styles.label} style={{ marginBottom: 0, fontWeight: 400 }}>
              중복 제거
            </label>
          </div>
        </div>
      </div>
      <div className={styles.btnRow}>
        <button onClick={handlePickRandom} className={`${styles.btn} ${styles.btnPrimary}`} disabled={isLoading}>
          {isLoading ? '추첨중...' : '랜덤 선택'}
        </button>
        <button onClick={handleClear} className={`${styles.btn} ${styles.btnSecondary}`} disabled={isLoading}>지우기</button>
      </div>
      {isLoading && (
        <div className={styles.lotteryModalOverlay}>
          <div className={styles.lotteryModal}>
            <div className={styles.lotteryText}>추첨중입니다...</div>
            <div className={styles.progressBarWrap}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            </div>
            <div className={styles.progressPercent}>{progress}%</div>
          </div>
        </div>
      )}
      {winners.length > 0 && !isLoading && (
        <div className={styles.result}>
          <div className={styles.resultHeader}>
            <span>결과</span>
            <button onClick={handleCopy} className={styles.copyBtn} title="결과 복사">
              <ClipboardDocumentIcon style={{ width: 20, height: 20 }} />
            </button>
          </div>
          <div>
            {winners.map((winner, idx) => (
              <div key={idx}>{winner}</div>
            ))}
          </div>
          <div className={styles.timestamp}>선택 시간: {timestamp}</div>
        </div>
      )}
    </div>
  )
} 