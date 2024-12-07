import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import MainPage from './ui/pages/mainPage/MainPage';

import CityPage from './ui/pages/cityPage/CityPage';
import { Layout } from './ui/pages/Layout';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route
        path='/'
        element={<MainPage />}
      />
      <Route
        path='/:link'
        element={<CityPage />}
      />
    </Route>
  )
);
