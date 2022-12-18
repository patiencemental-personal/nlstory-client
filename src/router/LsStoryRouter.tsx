import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layouts/Layout';
import HomePage from '../pages/HomePage';
import NotFound from '../pages/NotFound';
import TaskManagementPage from '../pages/TaskManagementPage';
import TagDiaryPage from 'pages/TagDiaryPage';
import { path } from './path';

const {
  ENTRY, TASK_MANAGEMENT, TAG_DIARY,
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
        path: TASK_MANAGEMENT,
        element: <TaskManagementPage />
      },
      {
        path: TAG_DIARY,
        element: <TagDiaryPage />
      }
    ]
  }
])

export default function LsStoryRouter() {
  return <RouterProvider router={router} />
}