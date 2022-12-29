import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PLEASE_CHECK_EMAIL_INBOX } from 'utils/constants';
import { STORAGE_KEY_USER } from 'utils/storage';
import { fSignup, fLogin, fLogout, fSendEmailVerification, fSendPasswordResetEmail } from '../apis/firebase';

// 1. context 생성
const AuthContext = createContext();

// 2. Provider 구현
export function AuthContextProvider({children}) {
  const [user, setUser] = useState();

  const sendEmailVerification = () => {
    fSendEmailVerification()
      .then(() => toast.success(PLEASE_CHECK_EMAIL_INBOX))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`[${errorCode}] ${errorMessage}`);
        throw Promise.reject(error);
      })
  }

  const sendPasswordResetEmail = (email) => {
    fSendPasswordResetEmail(email)
      .then(() => {
        toast.success(PLEASE_CHECK_EMAIL_INBOX)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`[${errorCode}] ${errorMessage}`);
      })
  }

  // 회원가입
  const signup = async (email, password) => {
    await fSignup(email, password);
  }

  const login = async (email, password) => {
    const loginedUser = await fLogin(email, password);
    setUser(() => {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(loginedUser));
      return loginedUser;
    });
    return loginedUser;
  }

  const logout = async () => {
    await fLogout();
    setUser(() => {
      localStorage.removeItem(STORAGE_KEY_USER);
      return null;
    });
  }

  const userFromStorage = localStorage.getItem(STORAGE_KEY_USER);

  useEffect(() => {
    if (!user) {
      setUser(prev => {
        const userFromStorage = localStorage.getItem(STORAGE_KEY_USER);
        return userFromStorage ? JSON.parse(userFromStorage) : prev;
      });
    }
  }, [])



  return (
    // 컴포넌트 렌더링 이전에 수행할 수 있는 라이프사이클이 없기에 스토리지에 데이터가 있는지 확인한 이후에 렌더링 시점 정의
    <AuthContext.Provider value={{ 
      user, uid: user && user.uid,
      signup, login, logout,
      sendEmailVerification, sendPasswordResetEmail
    }}>
      {/* userFromStorage가 없으면 => 기존 로그인된 유저가 없음 => children 렌더링 */}
      {!userFromStorage && children}
      {/* userFromStorage가 있으면 => 기존 로그인된 유저가 존재 => useEffect에서 user가 업데이트 된 후 children 렌더링 */}
      {userFromStorage && user && children}
    </AuthContext.Provider>
  )
}

// 3. hook 구현
export function useAuthContext() {
  return useContext(AuthContext);
}