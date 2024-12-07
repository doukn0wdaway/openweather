import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import MainPage from './ui/pages/mainPage/MainPage';
import { CityCard } from './ui/components/city/CityCard';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        index
        element={<MainPage />}
      />
      <Route
        path='/:id'
        element={<CityCard />}
      />
    </Route>
  )
);
