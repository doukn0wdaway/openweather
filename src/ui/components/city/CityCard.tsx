import { Button, Card, Tooltip } from 'antd';
import { useGetCityWeatherQuery } from '../../../services/weatherApi';
import { Link } from 'react-router-dom';
import { TCity } from '../../../services/types';

export const CityCard = ({ city }: { city: TCity }) => {
  const { data, isLoading } = useGetCityWeatherQuery({ ...city, exclude: [] });

  return (
    <Card
      title={`${city.name}, ${city.state}, ${city.country}`}
      loading={isLoading}
      className='card'
    >
      {data?.current.temp} {data?.current.humidity} {data?.current.wind_deg}{' '}
      {data?.current.wind_speed} {data?.current.weather[0].main}
      <img
        src={`https://openweathermap.org/img/wn/${data?.current.weather[0].icon}@2x.png`}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          gap: 16,
          marginTop: 16,
        }}
      >
        <Link to={`${city.country}_${city.name}`}>
          <Button
            variant='solid'
            color='default'
          >
            Detailed
          </Button>
        </Link>
        <Button
          variant='dashed'
          color='danger'
          onClick={() => {
            alert('delete');
          }}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};
