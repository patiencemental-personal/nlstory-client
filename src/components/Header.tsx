import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSquareFill } from 'react-icons/bs';
import { useAuthContext } from '../contexts/AuthContext';
import { path } from '../router/path';

const BUTTON_CLASSES = 'p-2 hover:bg-sgnr-blue font-bold';

export default function Header() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;
  if (pathname === path.WAIT) return null;
  


  return (
    <header className='flex justify-between border-b text-xl px-2 py-4'>
      <Link 
        to={path.ENTRY}
        className='p-2 flex align-center'
      >
        <BsSquareFill className='text-3xl text-sgnr-blue mr-2' />
        <h1 className='text-2xl font-bold tracking-wider'>nlstory</h1>
      </Link>
      <nav>
        {user && <button onClick={() => navigate(path.PROFILE)} className={BUTTON_CLASSES}>My</button>}
        {user && <button onClick={logout} className={BUTTON_CLASSES}>로그아웃</button>}
        {!user && <Link to={path.LOGIN}><button className={BUTTON_CLASSES}>로그인</button></Link>}
        {!user && <Link to={path.SIGNUP}><button className={BUTTON_CLASSES}>회원가입</button></Link>}
      </nav>
    </header>
  );
};