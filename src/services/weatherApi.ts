import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TCity } from './types';
// onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//
const token = import.meta.env.VITE_OPENWEATHER_TOKEN;

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/',
  }),
  endpoints: builder => ({
    searchCity: builder.query<TCity[], string | null>({
      query: name => `geo/1.0/direct?q=${name}&limit=5&appid=${token}`,
    }),
  }),
});
export const { useSearchCityQuery } = weatherApi;
