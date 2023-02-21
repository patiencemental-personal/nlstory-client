import React, { useState, useEffect } from 'react';
import { useAuthStore } from 'stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { path } from 'router/path';

export default function Inintialize({children}: {children: React.ReactNode}) {
  
  const [fetchedAuth, setFetchedAuth] = useState(false);
  const { loginSuccess } = useAuthStore();
  const navigate = useNavigate();
  
  // inintialize login
  useEffect(() => {
    (async () => {
      try {
        await loginSuccess();
      } catch (error) {
        navigate(path.ENTRY);
      } finally {
        setFetchedAuth(true);
      }
    })();
  }, [loginSuccess, fetchedAuth, navigate]);

  /**
   * conditional rendering: 서버로 부터 로그인 정보를 받아온 이후 렌더링
   * @see https://stackoverflow.com/questions/63967956/make-useeffect-hook-run-before-rendering-the-component
   */
  return <React.Fragment>{fetchedAuth && children}</React.Fragment>
}