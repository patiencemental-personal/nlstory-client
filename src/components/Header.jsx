import React from 'react';
import { Link } from 'react-router-dom';
import { SiStoryblok } from 'react-icons/si';
import { useAuthContext } from '../contexts/AuthContext';

const Header = () => {
  const { user, login, logout } = useAuthContext();
  return (
    <header className='flex justify-between border-b text-xl px-2 py-4'>
      <Link 
        to='/'
        className='flex align-center'
      >
        <SiStoryblok className='text-3xl text-blue-500 mr-2' />
        <h1 className='text-2xl font-bold tracking-wider'>nlstory</h1>
      </Link>
      <nav>
        {user && <button onClick={logout} className='p-2 hover:bg-blue-500 font-bold'>Logout</button>}
        {!user && <button onClick={login} className='p-2 hover:bg-blue-500 font-bold'>Login</button>}
      </nav>
    </header>
  );
};

export default Header;