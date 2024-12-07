import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ExcludeOption,
  TCity,
  TCityWeather,
  TCityWithLocalNames,
} from './types';
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
      transformResponse: (response: TCityWithLocalNames[]) => {
        if (!response) return [];
        return response.map(el => ({
          state: el.state,
          name: el.name,
          country: el.country,
          lat: el.lat,
          lon: el.lon,
        }));
      },
    }),
    getCityWeather: builder.query<
      TCityWeather,
      {
        lat: number;
        lon: number;
        exclude?: ExcludeOption[];
      } | null
    >({
      query: params =>
        `data/3.0/onecall?lat=${params?.lat}&lon=${params?.lon}&appid=${token}&units=metric&exclude=${params?.exclude ? params.exclude.join(',') : 'daily,hourly,alerts,minutely'}}`,
    }),
  }),
});
export const {
  useSearchCityQuery,
  useGetCityWeatherQuery,
  useLazyGetCityWeatherQuery,
} = weatherApi;
