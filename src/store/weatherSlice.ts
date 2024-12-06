import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
  value: number;
}

const initialState: WeatherState = {
  value: 0,
};

const weatherSlice = createSlice({
  name: 'weatherSlice',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    reset: state => {
      state.value = 0;
    },
    // Приклад для дій з параметрами
    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, reset, setValue } = weatherSlice.actions;
export default weatherSlice;
