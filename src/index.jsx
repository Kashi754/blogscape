import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; //for MDBbootstrap
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { getAppRouter } from './app/App';
import { store } from './app/Store';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));

// This is a test

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={getAppRouter(store)} />
    </Provider>
  </React.StrictMode>
);

registerServiceWorker();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
