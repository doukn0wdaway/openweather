import { Link, useParams } from 'react-router-dom';
import { useGetCityWeatherQuery } from '../../../services/weatherApi';
import { useTypedSelector } from '../../../hooks/useTypedReduxHooks';
import { weatherSliceSelector } from '../../../store/weatherSlice';
import { Card } from 'antd';
import { formTitle } from '../../../utils/formTitle';
import './CityPage.scss';
import { CrossIcon } from '../../../assets/CloseIcon';
import { TempChart } from './components/tempChart/TempChart';
import { WeatherWidget } from './components/weatherWidget/WeatherWidget';
import { HourlyWeatherWidget } from './components/hourlyForecastWidget/HourlyForecastWidget';
const CityPage = () => {
  const { link } = useParams();
  const { cities } = useTypedSelector(weatherSliceSelector);

  const city = cities.find(el => `${el.country}_${el.name}` === link);

  const { data, isLoading } = useGetCityWeatherQuery(
    city ? { lat: city.lat, lon: city.lon, exclude: [] } : null,
    { skip: !city }
  );

  const title = formTitle([city?.name, city?.state, city?.country]);
  return (
    <Card
      className='city-page-wrapper'
      title={title}
      loading={isLoading}
      extra={
        <Link to={'/'}>
          <CrossIcon />
        </Link>
      }
    >
      {data ? (
        <>
          <WeatherWidget data={data} />
          <HourlyWeatherWidget data={data} />
          <TempChart data={data} />
        </>
      ) : (
        <div className='no-city-weather'>NO WEATHER</div>
      )}
    </Card>
  );
};

export default CityPage;
