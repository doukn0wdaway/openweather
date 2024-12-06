import { AutoComplete } from 'antd';
import { useEffect, useState } from 'react';
import { useSearchCityQuery } from '../../services/weatherApi';
import { DefaultOptionType } from 'antd/es/select';
import { TCity } from '../../services/weatherApi';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../hooks/useTypedReduxHooks';
import { addCity, weatherSliceSelector } from '../../store/weatherSlice';

export const SearchBar = () => {
  const [inputText, setInputText] = useState<string>('');
  const [debouncedInput, setDebouncedInput] = useState<string | null>(null);
  const { data, error } = useSearchCityQuery(debouncedInput);
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const [city, setCity] = useState<TCity>();

  const { cities } = useTypedSelector(weatherSliceSelector);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (!data) return;
    const newData: DefaultOptionType[] = data.map((el, id) => ({
      label: `${el.name} ${el.state}, ${el.country}`,
      value: String(id),
    }));
    setOptions(newData);
  }, [data]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputText.length >= 3) {
        setDebouncedInput(inputText);
      } else {
        setDebouncedInput(null);
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [inputText]);

  useEffect(() => {
    console.log(city);
  }, [city]);
  return (
    <>
      <AutoComplete
        status={error ? 'error' : ''}
        style={{ width: 200 }}
        value={inputText}
        placeholder={'Search by city'}
        options={options}
        onSearch={value => {
          setInputText(value);
        }}
        onSelect={value => {
          if (!data) return;
          setCity(data[Number(value)]);
          dispatch(addCity(data[Number(value)]));
        }}
      />
      {JSON.stringify({ test: cities })}
    </>
  );
};
