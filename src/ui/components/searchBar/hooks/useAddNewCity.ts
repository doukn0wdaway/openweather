import { useTypedDispatch } from '../../../../hooks/useTypedReduxHooks';
import { TCity } from '../../../../services/types';
import { addCity } from '../../../../store/weatherSlice';

export const useAddNewCity = () => {
  const dispatch = useTypedDispatch();
  const addNewCity = (city: TCity) => dispatch(addCity(city));
  return { addNewCity };
};
