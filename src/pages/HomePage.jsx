import React from 'react'
import { useAuthContext } from '../contexts/AuthContext';

const MENU_CLASSES = 'border rounded h-40 flex justify-center items-center hover:bg-blue-500 hover:border-none';
const MENU_HEADER_CLASSES = 'text-3xl font-bold tracking-wider';

export default function HomePage() {
  const { user } = useAuthContext();
  return (
    <section className='p-8 grid grid-cols-3 gap-8'>
      <div className={MENU_CLASSES}>
        <h2 className={MENU_HEADER_CLASSES}>RESUME</h2>
      </div>
      <div className={MENU_CLASSES}>
        <h2 className={MENU_HEADER_CLASSES}>PORTPOLLIO</h2>
      </div>
      <div className={MENU_CLASSES}>
        <h2 className={MENU_HEADER_CLASSES}>다이어리</h2>
      </div>
      {user?.isAdmin && (
        <React.Fragment>
          <div className={MENU_CLASSES}>
            <h2 className={MENU_HEADER_CLASSES}>PRINCIPLES</h2>
          </div>
          <div className={MENU_CLASSES}>
            <h2 className={MENU_HEADER_CLASSES}>TODO</h2>
          </div>
          <div className={MENU_CLASSES}>
            <h2 className={MENU_HEADER_CLASSES}>LEVEL</h2>
          </div>
          <div className={MENU_CLASSES}>
            <h2 className={MENU_HEADER_CLASSES}>ENGLISH</h2>
          </div>
          <div className={MENU_CLASSES}>
            <h2 className={MENU_HEADER_CLASSES}>YOUTUBE REVIEW</h2>
          </div>
        </React.Fragment>
      )}
    </section>
  )
}
