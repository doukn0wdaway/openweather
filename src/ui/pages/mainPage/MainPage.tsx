import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedReduxHooks';
import { weatherSliceSelector } from '../../../store/weatherSlice';
import { SearchBar } from '../../components/searchBar/SearchBar';

const MainPage = () => {
  const { cities } = useTypedSelector(weatherSliceSelector);
  return (
    <>
      <SearchBar />
      {cities.map(e => (
        <Link to={`${e.country}_${e.name}`}>{e.name}</Link>
      ))}
    </>
  );
};
export default MainPage;
