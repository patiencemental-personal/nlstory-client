import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'components/error/ErrorFallback';

export default function Layout() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Header />
      <Outlet />
    </ErrorBoundary>
  )
}
