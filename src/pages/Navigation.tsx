import { NavLink } from 'react-router-dom'
import styles from './Navigation.module.css'

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={({ isActive }) => isActive ? `${styles.link} ${styles.linkActive}` : styles.link}>홈</NavLink>
      <NavLink to="/random-picker" className={({ isActive }) => isActive ? `${styles.link} ${styles.linkActive}` : styles.link}>랜덤 선택기</NavLink>
      <NavLink to="/character-counter" className={({ isActive }) => isActive ? `${styles.link} ${styles.linkActive}` : styles.link}>문자 수 세기</NavLink>
      <NavLink to="/lotto-generator" className={({ isActive }) => isActive ? `${styles.link} ${styles.linkActive}` : styles.link}>로또 추첨기</NavLink>
    </nav>
  )
} 