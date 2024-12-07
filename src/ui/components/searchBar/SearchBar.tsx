import { AutoComplete } from 'antd';
import { useEffect, useState } from 'react';
import { DefaultOptionType } from 'antd/es/select';
import { useTypedDispatch } from '../../../hooks/useTypedReduxHooks';
import { useSearchCityQuery } from '../../../services/weatherApi';
import { addCity } from '../../../store/weatherSlice';

export const SearchBar = () => {
  const [inputText, setInputText] = useState<string>('');
  const [debouncedInput, setDebouncedInput] = useState<string | null>(null);
  const { data, error } = useSearchCityQuery(debouncedInput);
  const [options, setOptions] = useState<DefaultOptionType[]>([]);

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

  return (
    <>
      <AutoComplete
        className='search'
        status={error ? 'error' : ''}
        style={{ width: '100%', padding: '0 120px' }}
        value={inputText}
        placeholder={'Search by city'}
        options={options}
        onSearch={value => {
          setInputText(value);
        }}
        onSelect={value => {
          if (!data) return;
          dispatch(addCity(data[Number(value)]));
        }}
      />
    </>
  );
};
