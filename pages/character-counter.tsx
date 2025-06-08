import { useState, useEffect } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import styles from '../components/CharacterCounter.module.css'

export default function CharacterCounter() {
  const [text, setText] = useState('')
  const [stats, setStats] = useState({
    charsWithSpaces: 0,
    charsWithoutSpaces: 0,
    bytes: 0
  })

  useEffect(() => {
    const charsWithSpaces = text.length
    const charsWithoutSpaces = text.replace(/\s/g, '').length
    const bytes = new TextEncoder().encode(text).length
    setStats({ charsWithSpaces, charsWithoutSpaces, bytes })
  }, [text])

  const handleClear = () => setText('')

  return (
    <div className={styles.card}>
      <h1 className={styles.heading}>문자 수 세기</h1>
      <label className={styles.label}>텍스트를 입력하거나 붙여넣기 하세요</label>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="여기에 텍스트를 입력하세요..."
      />
      <div className={styles.grid}>
        <div className={styles.stat}>
          <div className={styles.statLabel}>공백 포함 문자 수</div>
          <div className={styles.statValue}>{stats.charsWithSpaces.toLocaleString()}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>공백 제외 문자 수</div>
          <div className={styles.statValue}>{stats.charsWithoutSpaces.toLocaleString()}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>UTF-8 바이트 크기</div>
          <div className={styles.statValue}>{stats.bytes.toLocaleString()}</div>
        </div>
      </div>
      <button onClick={handleClear} className={styles.btn}>
        <TrashIcon style={{ width: 20, height: 20 }} />
        지우기
      </button>
    </div>
  )
} 