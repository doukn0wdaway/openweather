import { Button, Card, Modal } from 'antd';
import {
  useGetCityWeatherQuery,
  useLazyGetCityWeatherQuery,
} from '../../services/weatherApi';
import { HumidityIcon } from '../../assets/HumidityIcon';
import { useTypedDispatch } from '../../hooks/useTypedReduxHooks';
import { removeCity } from '../../store/weatherSlice';
import { degreesToDirection } from '../../utils/degreesToDirection';
import { TCity } from '../../services/types';
import './CityCard.scss';
import { useNavigate } from 'react-router-dom';
import { formTitle } from '../../utils/formTitle';
import { Badge } from './Badge';

const { confirm } = Modal;

const confirmDeletion = (callbackFn: () => any) => {
  confirm({
    title: 'Are you sure that u want to delete this city?',

    icon: null,
    cancelButtonProps: { variant: 'solid', color: 'default' },
    okButtonProps: {
      variant: 'solid',
      color: 'danger',
    },
    onOk() {
      callbackFn();
    },
    maskClosable: true,
  });
};

export const CityCard = ({ city }: { city: TCity }) => {
  const { data, isLoading } = useGetCityWeatherQuery({ ...city });
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [triggerUpdate] = useLazyGetCityWeatherQuery();

  const title = formTitle([city?.name, city?.state, city?.country]);

  return (
    <Card
      title={title}
      loading={isLoading}
      className='card'
      onClick={() => {
        navigate(`/${city.country}_${city.name}`);
      }}
    >
      <div className='info-badges'>
        <Badge>{parseInt(String(data?.current.temp))}°</Badge>
        <Badge>
          <HumidityIcon />
          {data?.current.humidity}
        </Badge>
        <Badge>
          {degreesToDirection(data?.current.wind_deg ?? 0)}{' '}
          {Number(data?.current.wind_speed).toFixed(1)} m/s
        </Badge>
        <Badge accent>{data?.current.weather[0].main}</Badge>
      </div>
      <img
        className='image'
        src={`https://openweathermap.org/img/wn/${data?.current.weather[0].icon}@4x.png`}
      />
      <div className='footer-wrapper'>
        <Button
          variant='outlined'
          color='default'
          className='update-button'
          onClick={e => {
            e.stopPropagation();
            triggerUpdate(city);
          }}
        >
          Update info
        </Button>
        <Button
          variant='dashed'
          color='danger'
          onClick={e => {
            e.stopPropagation();
            confirmDeletion(() => dispatch(removeCity(city)));
          }}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};
