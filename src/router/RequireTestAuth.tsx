import React from 'react'
import { useAuthContext } from 'contexts/AuthContext';
import { Navigate, } from 'react-router-dom';

export default function RequireTestAuth({children}: {children: JSX.Element}) {

  const { user } = useAuthContext();
  
  if (!user.isTest) {
    alert('접근할 수 없는 영역입니다.')
    return <Navigate to='/' replace />
  }

  return children
}
