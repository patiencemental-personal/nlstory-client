import React from 'react';
import { Link } from 'react-router-dom';
import { SiStoryblok } from 'react-icons/si';

const Header = () => {
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
        <Link className='p-2 hover:bg-blue-500 font-bold'>Login</Link>
      </nav>
    </header>
  );
};

export default Header;