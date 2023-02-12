import React from 'react'
import { Link } from 'react-router-dom';
import { path } from '../router/path';

const MENU_CLASSES = 'border rounded h-40 flex justify-center items-center hover:bg-sgnr-blue hover:border-none';
const MENU_HEADER_CLASSES = 'text-3xl font-bold tracking-wider';

export default function HomePage() {
  return (
    <section className='p-8 grid grid-cols-3 gap-8'>
      <Link to={path.DAILY_KEYWORD_NOTE}>
        <div className={MENU_CLASSES}>
          <h2 className={MENU_HEADER_CLASSES}>Daily Keyword Note</h2>
        </div>
      </Link>
      {/* <Link to={path.TAG_DIARY}>
        <div className={MENU_CLASSES}>
          <h2 className={MENU_HEADER_CLASSES}>Tag Diary</h2>
        </div>
      </Link> */}
    </section>
  )
}
