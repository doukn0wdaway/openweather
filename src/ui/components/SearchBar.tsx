import {
  AutoComplete,
  Button,
  Dropdown,
  Input,
  InputRef,
  MenuProps,
  Modal,
} from 'antd';
import { createRef, ReactNode, useEffect, useRef, useState } from 'react';
import { DefaultOptionType } from 'antd/es/select';
import './SearchBar.scss';
import {
  useTypedSelector,
  useTypedDispatch,
} from '../../hooks/useTypedReduxHooks';
import { useSearchCityQuery } from '../../services/weatherApi';
import {
  weatherSliceSelector,
  addCity,
  removeAllCities,
} from '../../store/weatherSlice';
import { formTitle } from '../../utils/formTitle';

const { confirm } = Modal;
export const SearchBar = () => {
  const dispatch = useTypedDispatch();
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string | null>(null);
  const [debouncedInput, setDebouncedInput] = useState<string | null>(null);
  const { data, error } = useSearchCityQuery(debouncedInput, {
    skip: debouncedInput === null || debouncedInput.trim() === '',
  });
  const [options, setOptions] = useState<{ key: string; element: ReactNode }[]>(
    []
  );
  const { cities } = useTypedSelector(weatherSliceSelector);

  useEffect(() => {
    if (!data) return;
    const newData: { key: string; element: ReactNode }[] = data.map(
      (el, id) => ({
        key: formTitle([el.name, el.country, el.lat, el.lon]),
        element: (
          <div
            onClick={() => {
              dispatch(addCity(el));
              setInputText('');
              setOptions([]);
            }}
          >
            {formTitle([el.name, el.state, el.country])}
          </div>
        ),
      })
    );
    setOptions(newData);
  }, [data]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputText && inputText.length >= 3) {
        setDebouncedInput(inputText);
      } else {
        setOptions([]);
        setDebouncedInput(null);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputText]);

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {}, [inputRef]);

  return (
    <div className='search'>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            visibility: (inputText ?? '').length > 0 ? 'visible' : 'hidden',
            position: 'absolute',
            zIndex: 2,
            background: 'red',
            top: 40,
            left: 0,
            width:
              inputRef.current?.nativeElement?.getBoundingClientRect().width,
            height: 100,
          }}
        >
          {options.map(e => e.element)}
        </div>
      </div>
      <Input
        ref={inputRef}
        status={error ? 'error' : ''}
        placeholder='Seach by city'
        onChange={e => {
          setInputText(e.currentTarget.value);
        }}
        value={inputText ?? ''}
      ></Input>
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
