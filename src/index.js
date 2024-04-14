import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; //for MDBbootstrap
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './app/App';
import { store } from './app/Store';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));

// This is a test

const AppRouter = ({ store }) => {
  const dispatch = useDispatch();
  const AppRoutes = App(dispatch, store);

  return <RouterProvider router={createBrowserRouter(AppRoutes)} />;
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter store={store} />
    </Provider>
  </React.StrictMode>
);
registerServiceWorker();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
