import React from 'react'
import { Link } from 'react-router-dom';
import { path } from '../router/path';
import styles from './HomePage.module.css';
import textStyles from 'styles/Text.module.css';

export default function HomePage() {
  return (
    <section className={styles.page}>
      <Link to={path.DAILY_KEYWORD_NOTE}>
        <div className={styles.menu}>
          <div className={`${styles.menuName} ${textStyles.xl3}`}>Daily Keyword Note</div>
        </div>
      </Link>
    </section>
  )
}
