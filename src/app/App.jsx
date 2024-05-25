import { createBrowserRouter } from 'react-router-dom';

import './App.css';
import routes from './routes';

export function getAppRouter(store) {
  const AppRoutes = routes(store);

  return createBrowserRouter(AppRoutes);
}
