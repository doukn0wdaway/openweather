import { AutoComplete, Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { DefaultOptionType } from 'antd/es/select';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../../hooks/useTypedReduxHooks';
import { useSearchCityQuery } from '../../../services/weatherApi';
import {
  addCity,
  removeAllCities,
  weatherSliceSelector,
} from '../../../store/weatherSlice';

const { confirm } = Modal;
export const SearchBar = () => {
  const [inputText, setInputText] = useState<string>('');
  const [debouncedInput, setDebouncedInput] = useState<string | null>(null);
  const { data, error } = useSearchCityQuery(debouncedInput);
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
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
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputText]);

  return (
    <div className='search'>
      <AutoComplete
        status={error ? 'error' : ''}
        value={inputText}
        size='large'
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
      <Button
        variant='solid'
        color='danger'
        size='large'
        disabled={cities.length < 1}
        onClick={() => {
          confirm({
            title: 'Do you want to delete all cities?',
            icon: null,
            cancelButtonProps: { variant: 'solid', color: 'default' },
            okButtonProps: {
              variant: 'solid',
              color: 'danger',
            },
            onOk() {
              dispatch(removeAllCities());
            },
            maskClosable: true,
          });
        }}
      >
        Delete all
      </Button>
    </div>
  );
};
