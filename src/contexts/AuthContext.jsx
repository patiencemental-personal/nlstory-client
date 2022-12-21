import { createContext, useContext, useEffect, useState } from 'react';
import {  login, logout, onUserStateChange } from '../apis/firebase';

// 1. context 생성
const AuthContext = createContext();

// 2. Provider 구현
export function AuthContextProvider({children}) {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => setUser(user))
  }, [])

  return (
    <AuthContext.Provider value={{ user, uid: user && user.uid, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// 3. hook 구현
export function useAuthContext() {
  return useContext(AuthContext);
}