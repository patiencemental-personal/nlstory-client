import React from 'react'
import { useAuthStore } from 'stores/useAuthStore'; 
import { Navigate, } from 'react-router-dom';

export default function RequireTestAuth({children}: {children: JSX.Element}) {

  const user = useAuthStore.getState().user;
  
  if (!user) {
    alert('접근할 수 없는 영역입니다.')
    return <Navigate to='/' replace />
  }

  return children
}
