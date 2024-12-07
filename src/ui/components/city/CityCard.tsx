import { useParams } from 'react-router-dom';

export const CityCard = () => {
  const { id } = useParams();
  return <div>card {id}</div>;
};
