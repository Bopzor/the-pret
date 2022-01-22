import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppSelector } from '../store';

import { Tea } from './Tea';

type TeaState = {
  list: Tea[];
  tea: Tea | null;
  timerId: number | null;
};

const initialState: TeaState = {
  list: [],
  tea: null,
  timerId: null,
};

const teaSlice = createSlice({
  name: 'tea',
  initialState,
  reducers: {
    setTeas: (state, { payload }: PayloadAction<Tea[]>) => {
      state.list = payload;
    },
    setTea: (state, { payload }: PayloadAction<Tea>) => {
      state.tea = payload;
    },
    addTea: (state, { payload }: PayloadAction<Tea>) => {
      state.list.push(payload);
    },
    editTea: (state, { payload }: PayloadAction<Tea>) => {
      const idx = state.list.findIndex(({ id }) => id === payload.id);

      if (idx < 0) {
        throw new Error(`Tea ${payload.name} with id ${payload.id} not found`);
      }

      state.list[idx] = payload;
    },
    setTimerId: (state, { payload }: PayloadAction<number | null>) => {
      state.timerId = payload;
    },
  },
});

export const { setTeas, setTea, addTea, editTea, setTimerId } = teaSlice.actions;

export const selectTeas: AppSelector<TeaState['list']> = (state) => state.teas.list;
export const selectTea: AppSelector<TeaState['tea']> = (state) => state.teas.tea;
export const selectTimerId: AppSelector<TeaState['timerId']> = (state) => state.teas.timerId;

export type TeaAction = typeof setTeas;

export default teaSlice.reducer;
