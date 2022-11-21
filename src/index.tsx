import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LsStoryRouter from './router/LsStoryRouter';
import { AuthContextProvider } from './contexts/AuthContext';
import GlobalPopup from 'components/popup/GlobalPopup';
import reduxStore from 'stores/reduxStore';
import { Provider as ReduxStoreProvider }from 'react-redux';
import GlobalFloatingPopup from 'components/floatingPopup/GlobalFloatingPopup';
import { ToastContainer, Flip  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <React.StrictMode>
    <ReduxStoreProvider store={reduxStore}>
      <AuthContextProvider>
        <LsStoryRouter />
        <GlobalPopup />
        <GlobalFloatingPopup />
      </AuthContextProvider>
      <ToastContainer
        transition={Flip}
        position="top-right"
        autoClose={2000}
        closeOnClick
        pauseOnHover
      />
    </ReduxStoreProvider>
    // </React.StrictMode>
  );
}