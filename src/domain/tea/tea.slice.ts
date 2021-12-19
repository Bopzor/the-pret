import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Tea } from './Tea';

type TeaState = {
  teas: Tea[];
};

const initialState = {
  teas: [],
} as TeaState;

const teaSlice = createSlice({
  name: 'tea',
  initialState,
  reducers: {
    setTeas: (state, action: PayloadAction<Tea[]>) => {
      state.teas = action.payload;
    },
  },
});

export const { setTeas } = teaSlice.actions;
export type TeaAction = typeof setTeas;

export default teaSlice.reducer;
