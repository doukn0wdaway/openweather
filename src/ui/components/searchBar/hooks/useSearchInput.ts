import { useEffect, useState } from 'react';
import { useSearchCityQuery } from '../../../../services/weatherApi';
import { DropdownOption } from '../SearchDropdown';
import { formTitle } from '../../../../utils/formTitle';
import { TCity } from '../../../../services/types';

export const useSearchInput = () => {
  const [inputText, setInputText] = useState<string | null>(null);
  const [debouncedInput, setDebouncedInput] = useState<string | null>(null);
  const { data } = useSearchCityQuery(debouncedInput, {
    skip: debouncedInput === null || debouncedInput.trim() === '',
  });
  const [options, setOptions] = useState<DropdownOption<TCity>[]>([]);
  useEffect(() => {
    if (!data) return;
    const newData: DropdownOption<TCity>[] = data.map(el => ({
      key: formTitle([el.name, el.country, el.lat, el.lon]),
      value: el,
      text: formTitle([el.name, el.state, el.country]),
    }));
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

  return { setInputText, inputText, options };
};
