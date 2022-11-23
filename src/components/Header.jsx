import React from 'react';
import { Link } from 'react-router-dom';
import { SiStoryblok } from 'react-icons/si';
import { useAuthContext } from '../contexts/AuthContext';

const BUTTON_CLASSES = 'p-2 hover:bg-sgnr-blue font-bold';

const Header = () => {
  const { user, login, logout } = useAuthContext();
  return (
    <header className='flex justify-between border-b text-xl px-2 py-4'>
      <Link 
        to='/'
        className='p-2 flex align-center'
      >
        <SiStoryblok className='text-3xl text-sgnr-blue mr-2' />
        <h1 className='text-2xl font-bold tracking-wider '>nlstory</h1>
      </Link>
      <nav>
        {user?.isAdmin && <button onClick={() => alert('관리자 페이지 이동')} className={BUTTON_CLASSES}>관리자</button>}
        {user && <button onClick={logout} className={BUTTON_CLASSES}>로그아웃</button>}
        {!user && <button onClick={login} className={BUTTON_CLASSES}>로그인</button>}
      </nav>
    </header>
  );
};

export default Header;