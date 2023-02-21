import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSquareFill } from 'react-icons/bs';
import { useAuthStore } from 'stores/useAuthStore';
import { path } from '../router/path';
import useWait from 'hooks/useWait';
import styles from './Header.module.css';
import textStyles from 'styles/Text.module.css';
import Button from 'components/common/Button';
import { toast } from 'react-toastify';

export default function Header() {
  const { user, logout } = useAuthStore();
  const setWaitOption = useWait();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutWithWait = () => {
    setWaitOption({
      time: 1500,
      callback: async () => {
        try {
          const response = await logout();
          toast.success(response.data.message);
        } catch (error: any) {
          toast.error(error.response.data.message);
        } finally {
          navigate(path.ENTRY);
        }
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
        {user && <Button onClick={logoutWithWait}>로그아웃</Button>}
        {!user && <Link to={path.LOGIN}><Button active={pathname === path.LOGIN}>로그인</Button></Link>}
      </nav>
    </header>
  );
};