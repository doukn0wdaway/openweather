import { useTypedSelector } from '../../../hooks/useTypedReduxHooks';
import { weatherSliceSelector } from '../../../store/weatherSlice';
import { SearchBar } from '../../components/SearchBar';
import { CityCard } from '../../components/CityCard';

const MainPage = () => {
  const { cities } = useTypedSelector(weatherSliceSelector);
  return (
    <>
      <SearchBar />
      <div className='cards-wrapper'>
        {cities.map(e => (
          <CityCard
            key={String(e.lon) + String(e.lat)}
            city={e}
          />
        ))}
      </div>
    </>
  );
};
export default MainPage;
