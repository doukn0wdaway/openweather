import { LineChart } from '@opd/g2plot-react';
import { TCityWeather } from '../../../../../services/types';
import './TempChart.scss';
export const TempChart = ({ data }: { data: TCityWeather }) => {
  return (
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
  );
};
