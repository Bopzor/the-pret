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
    setTeas: (state, { payload }: PayloadAction<Tea[]>) => {
      state.teas = payload;
    },
    addTea: (state, { payload }: PayloadAction<Tea>) => {
      state.teas.push(payload);
    },
    editTea: (state, { payload }: PayloadAction<Tea>) => {
      const idx = state.teas.findIndex(({ id }) => id === payload.id);

      if (idx < 0) {
        throw new Error(`Tea ${payload.name} with id ${payload.id} not found`);
      }

      // prettier-ignore
      state.teas = [
        ...state.teas.slice(0, idx),
        payload,
        ...state.teas.slice(idx + 1),
      ];
    },
  },
});

export const { setTeas, addTea, editTea } = teaSlice.actions;
export type TeaAction = typeof setTeas;

export default teaSlice.reducer;
