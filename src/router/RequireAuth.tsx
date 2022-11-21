import React from 'react'
import { useAuthContext } from 'contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { NEED_EMAIL_VERIFICATION, NEED_LOGIN } from 'utils/constants';
import { path } from 'router/path';

export default function RequireAuth({ children, emailVerified = true}: {
  children: JSX.Element, 
  emailVerified?: boolean
}) {

  const { user } = useAuthContext();
  const location = useLocation();

  if (!user) {
    alert(NEED_LOGIN)
    return <Navigate to={path.LOGIN} state={{ from: location }} replace />
  }

  if (emailVerified && !user.emailVerified) {
    alert(NEED_EMAIL_VERIFICATION)
    return <Navigate to={path.PROFILE} replace />;
  }

  return children
}