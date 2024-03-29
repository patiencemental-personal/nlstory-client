import React from 'react'
import { useAuthStore } from 'stores/useAuthStore'; 
import { Navigate, useLocation } from 'react-router-dom';
import { NEED_LOGIN } from 'utils/constants';
import { path } from 'router/path';

export default function RequireAuth({ children, emailVerified = true}: {
  children: JSX.Element, 
  emailVerified?: boolean
}) {

  const user = useAuthStore.getState().user;
  const location = useLocation();

  if (!user) {
    alert(NEED_LOGIN)
    return <Navigate to={path.LOGIN} state={{ from: location }} replace />
  }

  return children;
}
