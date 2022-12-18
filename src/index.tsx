import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LsStoryRouter from './router/LsStoryRouter';
import { AuthContextProvider } from './contexts/AuthContext';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <React.StrictMode>
      <AuthContextProvider>
        <LsStoryRouter />
      </AuthContextProvider>
    // </React.StrictMode>
  );
}