import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from './weatherSlice.ts';
import { weatherApi } from '../services/weatherApi.ts';
export const store = configureStore({
  reducer: {
    [weatherSlice.name]: weatherSlice.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export default store;
