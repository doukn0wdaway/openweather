import { Link, useParams } from 'react-router-dom';
import { useGetCityWeatherQuery } from '../../../services/weatherApi';
import { useTypedSelector } from '../../../hooks/useTypedReduxHooks';
import { weatherSliceSelector } from '../../../store/weatherSlice';
import { LineChart } from '@opd/g2plot-react';
import { Card } from 'antd';
import { formTitle } from '../../../utils/formTitle';
import './CityPage.scss';
import { isDateToday } from '../../../utils/isDateToday';
import { Hourly, TCityWeather } from '../../../services/types';
import { Badge } from '../../components/Badge';
import { CrossIcon } from '../../../assets/CloseIcon';
// TODO: finish dat shid
const CityPage = () => {
  const { link } = useParams();
  const { cities } = useTypedSelector(weatherSliceSelector);

  const city = cities.find(el => `${el.country}_${el.name}` === link);

  const { data, isLoading } = useGetCityWeatherQuery(
    city ? { lat: city.lat, lon: city.lon, exclude: [] } : null,
    { skip: !city }
  );

  const next24H = data?.hourly.filter(e => isDateToday(e.dt));
  const temps = next24H?.reduce(
    (acc, current) => {
      if (current.temp > acc.max) acc.max = current.temp;
      if (current.temp < acc.min) acc.min = current.temp;
      return acc;
    },
    { min: Infinity, max: -Infinity }
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
      <div>Now {parseInt(String(data?.current.temp))}°</div>
      <img
        className='image'
        src={`https://openweathermap.org/img/wn/${data?.current.weather[0].icon}@4x.png`}
      />
      Low: {parseInt(String(temps?.min))}°
      <br />
      High: {parseInt(String(temps?.max))}°
      <div>
        {data?.current.weather[0].main ?? ''}
        Feels like: {parseInt(String(data?.current.feels_like))}°
      </div>
      {data && <HourlyWeatherWidget data={data} />}
      <div className='chart-wrapper'>
        <LineChart
          autoFit
          data={
            data?.hourly.map(e => {
              const dt = new Date(e.dt * 1000).toLocaleString();
              return { dt, temp: e.temp };
            }) ?? []
          }
          xField='dt'
          yField='temp'
        />
      </div>
    </Card>
  );
};

export default CityPage;

const HourlyWeatherEntry = ({ data }: { data: Hourly }) => {
  const date = new Date(data.dt * 1000).toLocaleTimeString('uk-Ua', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <div className='small-weather-info'>
      <div className='temp'> {parseInt(String(data.temp))}°</div>

      {data.rain ? (
        <Badge accent>{Number(data.rain['1h']) * 100}%</Badge>
      ) : (
        <>{'\u00A0'}</>
      )}
      <img
        className='image'
        src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`}
      />
      <div className='date'>{date}</div>
    </div>
  );
};

const HourlyWeatherWidget = ({ data }: { data: TCityWeather }) => {
  const formedHourlyPrognose = data?.hourly.slice(0, 7);

  return (
    <>
      <h2>Hourly forecast</h2>
      <div className='hourly'>
        {(formedHourlyPrognose ?? []).map(e => (
          <HourlyWeatherEntry data={e} />
        ))}
      </div>
    </>
  );
};
