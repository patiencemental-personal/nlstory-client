import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div>Layout</div>
      <Outlet />
    </React.Fragment>
  )
}
