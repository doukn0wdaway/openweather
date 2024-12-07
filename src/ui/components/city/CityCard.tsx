import { Button, Card, Popconfirm } from 'antd';
import {
  useGetCityWeatherQuery,
  useLazyGetCityWeatherQuery,
} from '../../../services/weatherApi';
import { Link } from 'react-router-dom';
import { TCity } from '../../../services/types';
import { ReactNode } from 'react';
import { HumidityIcon } from '../../../assets/HumidityIcon';
import { degreesToDirection } from '../../../utils/degreesToDirection';
import { useTypedDispatch } from '../../../hooks/useTypedReduxHooks';
import { removeCity } from '../../../store/weatherSlice';

export const CityCard = ({ city }: { city: TCity }) => {
  const { data, isLoading } = useGetCityWeatherQuery({ ...city, exclude: [] });
  const dispatch = useTypedDispatch();

  const [triggerUpdate] = useLazyGetCityWeatherQuery();
  const title = [city.name, city.state, city.country]
    .filter(e => e !== undefined)
    .join(', ');
  return (
    <Card
      title={title}
      loading={isLoading}
      className='card'
    >
      <div className='info-badges'>
        <Badge>{parseInt(String(data?.current.temp))}°</Badge>
        <Badge>
          <HumidityIcon />
          {data?.current.humidity}
        </Badge>
        <Badge>
          {degreesToDirection(data?.current.wind_deg ?? 0)}{' '}
          {data?.current.wind_speed} m/s
        </Badge>
        <Badge className='weather-name'>{data?.current.weather[0].main}</Badge>
      </div>
      <img
        className='card-image'
        src={`https://openweathermap.org/img/wn/${data?.current.weather[0].icon}@2x.png`}
      />
      <div className='footer-wrapper'>
        <Button
          variant='outlined'
          color='default'
          className='update-button'
          onClick={() => {
            triggerUpdate(city);
          }}
        >
          Update info
        </Button>
        <Link to={`${city.country}_${city.name}`}>
          <Button
            variant='solid'
            color='default'
          >
            Detailed
          </Button>
        </Link>
        <Popconfirm
          title='Delete city'
          description='Are you sure that u want to delete this city?'
          onConfirm={() => {
            dispatch(removeCity(city));
          }}
        >
          <Button
            variant='dashed'
            color='danger'
          >
            Delete
          </Button>
        </Popconfirm>
      </div>
    </Card>
  );
};

const Badge = (props: { children: ReactNode; className?: string }) => {
  return (
    <span className={`badge ${props.className ?? ''}`}>{props.children}</span>
  );
};
