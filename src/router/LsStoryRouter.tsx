import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layouts/Layout';
import HomePage from '../pages/HomePage';
import NotFound from '../pages/NotFound';
import { path } from './path';
import RequireAuth from './RequireAuth';
import LoginPage from 'pages/LoginPage';
import RequireNoAuth from './RequireNoAuth';
import WaitPage from 'pages/WaitPage';
import DailyKeywordNotePage from 'pages/DailyKeywordNotePage';
import Inintialize from 'Inintialize';

const {
  ENTRY, WAIT, LOGIN, DAILY_KEYWORD_NOTE,
} = path;

const router = createBrowserRouter([
  {
    path: ENTRY,
    element: <Inintialize><Layout /></Inintialize>,
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