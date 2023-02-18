import React from 'react'
import { Link } from 'react-router-dom'
import { path } from 'router/path'
import styles from './NotFound.module.css'
import textStyles from 'styles/Text.module.css'

export default function NotFound() {
  return (
    <section className={`${styles.page} ${textStyles.xl4}`}>
      <div className={styles.message}>존재하지 않는 페이지 입니다.</div>
      <Link to={path.ENTRY} className={styles.link}><button>메인으로</button></Link>
    </section>
  )
}
