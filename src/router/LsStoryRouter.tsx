import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layouts/Layout';
import HomePage from '../pages/HomePage';
import NotFound from '../pages/NotFound';
// import TaskManagementPage from '../pages/TaskManagementPage';
// import TagDiaryPage from 'pages/TagDiaryPage';
import { path } from './path';
import RequireAuth from './RequireAuth';
import LoginPage from 'pages/LoginPage';
import RequireNoAuth from './RequireNoAuth';
// import SignupPage from 'pages/SignupPage';
// import ProfilePage from 'pages/ProfilePage';
import WaitPage from 'pages/WaitPage';
// import RequireTestAuth from './RequireTestAuth';
import DailyKeywordNotePage from 'pages/DailyKeywordNotePage';

const {
  // PROFILE, SIGNUP, TASK_MANAGEMENT, TAG_DIARY
  ENTRY, WAIT, LOGIN, DAILY_KEYWORD_NOTE,
} = path;

const router = createBrowserRouter([
  {
    path: ENTRY,
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: ENTRY,
        element: <HomePage />
      },
      {
        path: WAIT,
        element: <WaitPage />
      },
      {
        path: LOGIN,
        element: <RequireNoAuth><LoginPage /></RequireNoAuth>
      },
      // {
      //   path: SIGNUP,
      //   element: <RequireNoAuth><SignupPage /></RequireNoAuth>
      // },
      // {
      //   path: PROFILE,
      //   element: <RequireAuth emailVerified={false}><ProfilePage /></RequireAuth>
      // },
      // {
      //   path: TASK_MANAGEMENT,
      //   element: <RequireTestAuth><TaskManagementPage /></RequireTestAuth>
      // },
      // {
      //   path: TAG_DIARY,
      //   element: <RequireAuth><TagDiaryPage /></RequireAuth>
      // },
      {
        path: DAILY_KEYWORD_NOTE,
        element: <RequireAuth><DailyKeywordNotePage /></RequireAuth>
      }
    ]
  },
])

export default function LsStoryRouter() {
  return <RouterProvider router={router} />
}