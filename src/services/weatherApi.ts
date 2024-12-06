import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//
const token = import.meta.env.VITE_OPENWEATHER_TOKEN;

export interface TCity {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}
export type TCityWithLocalNames = TCity & {
  local_names: string[];
};
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
  }),
});
export const { useSearchCityQuery } = weatherApi;
