import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocalStorageKeys, ls } from '../services/localStorageService';
import { RootState } from './redux';
import { TCity } from '../services/types';

interface WeatherState {
  cities: TCity[];
}

const initialState: WeatherState = {
  cities: (function (): TCity[] {
    return ls.getItem(LocalStorageKeys.CITIES) ?? [];
  })(),
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
    removeCity: (state, action: PayloadAction<TCity>) => {
      const newCities = state.cities.filter(
        e => e.country + e.name != action.payload.country + action.payload.name
      );
      state.cities = newCities;
      ls.setItem(LocalStorageKeys.CITIES, state.cities);
    },
    removeAllCities: state => {
      state.cities = [];
      ls.setItem(LocalStorageKeys.CITIES, state.cities);
    },
  },
});

export const weatherSliceSelector = (state: RootState) => state.weatherSlice;
export const { addCity, removeCity, removeAllCities } = weatherSlice.actions;
export default weatherSlice;
