import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppSelector } from '../store';

import { Tea } from './Tea';

type TeaState = Tea[];

const initialState: TeaState = [];

const teaSlice = createSlice({
  name: 'tea',
  initialState,
  reducers: {
    setTeas: (_, { payload }: PayloadAction<Tea[]>) => {
      return payload;
    },
    addTea: (state, { payload }: PayloadAction<Tea>) => {
      state.push(payload);
    },
    editTea: (state, { payload }: PayloadAction<Tea>) => {
      const idx = state.findIndex(({ id }) => id === payload.id);

      if (idx < 0) {
        throw new Error(`Tea ${payload.name} with id ${payload.id} not found`);
      }

      state[idx] = payload;
    },
  },
});

export const { setTeas, addTea, editTea } = teaSlice.actions;

export const selectTeas: AppSelector<TeaState> = (state) => state.teas;

export type TeaAction = typeof setTeas;

export default teaSlice.reducer;
