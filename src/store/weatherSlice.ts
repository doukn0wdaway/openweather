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
  cities: (function () {
    const cities: TCity[] = ls.getItem(LocalStorageKeys.CITIES) ?? [];
    return cities;
  })(),
  value: 0,
};

const weatherSlice = createSlice({
  name: 'weatherSlice',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<TCity>) => {
      state.cities = [action.payload, ...state.cities];
      state.cities = Array.from(new Set(state.cities));

      // TODO: Пофиксить штуку когда город может дважды повториться
      ls.setItem(LocalStorageKeys.CITIES, state.cities);
    },
  },
});

export const weatherSliceSelector = (state: RootState) => state.weatherSlice;
export const { addCity } = weatherSlice.actions;
export default weatherSlice;
