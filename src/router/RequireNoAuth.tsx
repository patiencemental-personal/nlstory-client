import React from 'react'
import { useAuthStore } from 'stores/useAuthStore'; 
import { Navigate, } from 'react-router-dom';

export default function RequireNoAuth({children}: {children: JSX.Element}) {

  const user = useAuthStore.getState().user;
  
  if (user) {
    return <Navigate to='/' replace />;
  }

  return children;
}
