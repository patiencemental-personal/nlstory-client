import React from 'react'
import { useAuthContext } from 'contexts/AuthContext';
import { Navigate, } from 'react-router-dom';

export default function RequireNoAuth({children}: {children: JSX.Element}) {

  const { user } = useAuthContext();
  
  if (user) {
    return <Navigate to='/' replace />
  }

  return children
}
