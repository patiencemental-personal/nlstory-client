import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LsStoryRouter from './router/LsStoryRouter';
import { AuthContextProvider } from './contexts/AuthContext';
import GlobalPopup from 'components/popup/GlobalPopup';
import reduxStore from 'stores/reduxStore';
import { Provider as ReduxStoreProvider }from 'react-redux';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <React.StrictMode>
    <ReduxStoreProvider store={reduxStore}>
      <AuthContextProvider>
        <GlobalPopup />
        <LsStoryRouter />
      </AuthContextProvider>
    </ReduxStoreProvider>
    // </React.StrictMode>
  );
}