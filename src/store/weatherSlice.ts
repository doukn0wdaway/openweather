import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCity } from '../services/weatherApi';
import { LocalStorageKeys, ls } from '../services/localStorageService';
import { RootState } from './redux';

interface WeatherState {
  choosenCity: TCity | null;
  value: number;
  cities: TCity[];
}

const initialState: WeatherState = {
  choosenCity: null,
  cities: (function (): TCity[] {
    return ls.getItem(LocalStorageKeys.CITIES) ?? [];
  })(),
  value: 0,
};

const weatherSlice = createSlice({
  name: 'weatherSlice',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<TCity>) => {
      const isExists = state.cities.some(
        e =>
          e.name == action.payload.name && e.country == action.payload.country
      );

      if (isExists) return;

      state.cities = [action.payload, ...state.cities];
      ls.setItem(LocalStorageKeys.CITIES, state.cities);
    },
  },
});

export const weatherSliceSelector = (state: RootState) => state.weatherSlice;
export const { addCity } = weatherSlice.actions;
export default weatherSlice;
