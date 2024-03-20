import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; //for MDBbootstrap
import './index.css';
import reportWebVitals from './reportWebVitals';
import registerServiceWorker from './registerServiceWorker';
import { store } from './app/Store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import App from './app/App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { selectUser } from './features/user/userSlice';
const root = createRoot(document.getElementById('root'));

// This is a test

const AppRouter = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const AppRoutes = App(dispatch, user);

  return <RouterProvider router={createBrowserRouter(AppRoutes)} />;
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);
registerServiceWorker();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
