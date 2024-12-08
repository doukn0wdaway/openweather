import { Button, Input, InputRef } from 'antd';
import { useRef, useState } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedReduxHooks';
import { weatherSliceSelector } from '../../../store/weatherSlice';
import { useSearchInput } from './hooks/useSearchInput';
import './SearchBar.scss';
import { SearchDropdown } from './SearchDropdown';
import { useConfirmAllCitiesDeletion } from './hooks/useConfirmAllCitiesDeletion';
import { useAddNewCity } from './hooks/useAddNewCity';

export const SearchBar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const { cities } = useTypedSelector(weatherSliceSelector);
  const { options, setInputText, inputText } = useSearchInput();

  const { addNewCity } = useAddNewCity();

  const confirmDeletion = useConfirmAllCitiesDeletion();

  const inputRef = useRef<InputRef>(null);

  return (
    <div className='search'>
      <SearchDropdown
        width={
          inputRef.current?.nativeElement?.getBoundingClientRect().width ?? 0
        }
        setIsVisible={setDropdownVisible}
        isVisible={isDropdownVisible && options.length > 0}
        options={options}
        onChoose={value => {
          if (value) addNewCity(value);
        }}
      />
      <Input
        ref={inputRef}
        placeholder='Seach by city'
        onChange={e => {
          setInputText(e.currentTarget.value);
          setDropdownVisible(true);
        }}
        value={inputText ?? ''}
      ></Input>
      <Button
        variant='solid'
        color='danger'
        size='large'
        disabled={cities.length < 1}
        onClick={() => {
          confirmDeletion();
        }}
      >
        Delete all
      </Button>
    </div>
  );
};
