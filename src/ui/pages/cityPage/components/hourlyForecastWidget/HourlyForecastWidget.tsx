import { TCityWeather, Hourly } from '../../../../../services/types';
import { Badge } from '../../../../components/badge/Badge';
import './HourlyForecastWidget.scss';

export const HourlyWeatherWidget = ({ data }: { data: TCityWeather }) => {
  const formedHourlyPrognose = data?.hourly.slice(0, 7);

  return (
    <div className='hourly-wrapper'>
      <h3>Hourly forecast</h3>
      <div className='hourly'>
        {(formedHourlyPrognose ?? []).map(e => (
          <HourlyWeatherEntry
            key={e.dt}
            data={e}
          />
        ))}
      </div>
    </div>
  );
};

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
