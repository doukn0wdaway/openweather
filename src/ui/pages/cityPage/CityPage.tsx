import { useParams } from 'react-router-dom';
import { useGetCityWeatherQuery } from '../../../services/weatherApi';
import { useTypedSelector } from '../../../hooks/useTypedReduxHooks';
import { weatherSliceSelector } from '../../../store/weatherSlice';
// TODO: finish dat shid
const CityPage = () => {
  const { link } = useParams();
  const { cities } = useTypedSelector(weatherSliceSelector);
  const city = cities.find(el => `${el.country}_${el.name}` === link);

  const params = city
    ? {
        lat: city.lat,
        lon: city.lon,
      }
    : null;

  const { data } = useGetCityWeatherQuery(params);
  return <div>{JSON.stringify(data)}</div>;
};

export default CityPage;
