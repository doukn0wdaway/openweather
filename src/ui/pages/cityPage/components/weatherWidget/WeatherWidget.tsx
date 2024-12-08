import { TCityWeather } from '../../../../../services/types';
import { getTemperatureColor } from '../../../../../utils/getTemperatureColor';
import { isDateToday } from '../../../../../utils/isDateToday';
import { Badge } from '../../../../components/badge/Badge';
import './WeatherWidget.scss';
export const WeatherWidget = ({ data }: { data: TCityWeather }) => {
  const next24H = data?.hourly.filter(e => isDateToday(e.dt));
  const temps = next24H?.reduce(
    (acc, current) => {
      if (current.temp > acc.max) acc.max = current.temp;
      if (current.temp < acc.min) acc.min = current.temp;
      return acc;
    },
    { min: Infinity, max: -Infinity }
  );
  return (
    <div className='weather-widget'>
      <div className='now-temp-wrapper'>
        <div
          className='now-temp'
          style={{ color: getTemperatureColor(data.current.temp ?? 0) }}
        >
          {parseInt(String(data.current.temp))}°
        </div>
        <div>Feels like: {parseInt(String(data.current.feels_like))}°</div>
        <div>Low: {parseInt(String(temps.min))}°</div>
        <div>High: {parseInt(String(temps.max))}°</div>
      </div>
      <div className='image-wrapper'>
        <img
          className='image'
          src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`}
        />
        <Badge accent>{data?.current.weather[0].main ?? ''}</Badge>
      </div>
    </div>
  );
};
