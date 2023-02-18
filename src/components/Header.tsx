import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSquareFill } from 'react-icons/bs';
import { useAuthContext } from '../contexts/AuthContext';
import { path } from '../router/path';
import useWait from 'hooks/useWait';
import styles from './Header.module.css';
import textStyles from 'styles/Text.module.css';

export default function Header() {
  const { user, logout } = useAuthContext();
  const setWaitOption = useWait();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutWithWait = () => {
    setWaitOption({
      time: 1500,
      callback: () => {
        logout();
        navigate(path.ENTRY);
      }
    }).goWaitPage();
  }

  const { pathname } = location;
  if (pathname === path.WAIT) return null;

  return (
    <header className={`${styles.header} ${textStyles.xl}`}>
      <Link 
        to={path.ENTRY}
        className={styles.link}
      >
        <BsSquareFill className={`${styles.icon} ${textStyles.xl3}`} />
        <h1 className={`${styles.title} ${textStyles.xl2}`}>nlstory</h1>
      </Link>
      <nav>
        {user && <button onClick={logoutWithWait} className={styles.button}>로그아웃</button>}
        {!user && <Link to={path.LOGIN}><button className={`${styles.button} ${pathname === path.LOGIN && styles.buttonActive}`}>로그인</button></Link>}
      </nav>
    </header>
  );
};