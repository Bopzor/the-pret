import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { Seconds } from '../types';

export type Tea = {
  id: string;
  name: string;
  duration: Seconds;
  startedTimestamp: number | null;
};

const teasAdapter = createEntityAdapter<Tea>();

const teasSlice = createSlice({
  name: 'teas',
  initialState: teasAdapter.getInitialState(),
  reducers: {
    setTeas: teasAdapter.setAll,
    setTeaStartedTimestamp: (
      state,
      { payload: { startedTimestamp, id } }: PayloadAction<Pick<Tea, 'id' | 'startedTimestamp'>>,
    ) => {
      teasAdapter.updateOne(state, { id, changes: { startedTimestamp } });
    },
  },
});

const teasSelectors = teasAdapter.getSelectors<RootState>((state) => state.teas);

export const selectTeas = teasSelectors.selectAll;
export const selectTea = teasSelectors.selectById;
export const selectTeaStartedAtTimestamp = createSelector(teasSelectors.selectById, (tea) => tea?.startedTimestamp);

export const { setTeas, setTeaStartedTimestamp } = teasSlice.actions;

export default teasSlice.reducer;
