import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LsStoryRouter from './router/LsStoryRouter';
import GlobalPopup from 'components/popup/GlobalPopup';
import GlobalFloatingPopup from 'components/floatingPopup/GlobalFloatingPopup';
import { ToastContainer, Flip  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.Fragment>
      <LsStoryRouter />
      <GlobalPopup />
      <GlobalFloatingPopup />
      <ToastContainer
        transition={Flip}
        position="top-right"
        autoClose={2000}
        closeOnClick
        pauseOnHover
      />
    </React.Fragment>
  );
}