import { AutoComplete, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useSearchCityQuery } from '../../services/weatherApi';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { DefaultOptionType } from 'antd/es/select';
import { TCity } from '../../services/types';

export const SearchBar = () => {
  const [inputText, setInputText] = useState<string>('');
  const [debouncedInput, setDebouncedInput] = useState<string | null>(null);
  const { data, error } = useSearchCityQuery(debouncedInput);
  const [api, contextHolder] = notification.useNotification();
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const [city, setCity] = useState<TCity>();

  useEffect(() => {
    if (!data) return;
    const newData: DefaultOptionType[] = data.map((el, id) => ({
      label: `${el.name} ${el.state}, ${el.country}`,
      value: id,
    }));
    setOptions(newData);
  }, [data]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputText.length >= 3) {
        setDebouncedInput(inputText);
      } else {
        setDebouncedInput(null); // Очищаем запрос если длина меньше 3 символов
      }
    }, 1000);

    return () => {
      clearTimeout(handler); // Очищаем таймер при изменении inputText
    };
  }, [inputText]);

  useEffect(() => {
    console.log(city);
  }, [city]);
  return (
    <>
      {contextHolder}
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
          if (data) setCity(data[Number(value)]);
        }}
      />
    </>
  );
};
