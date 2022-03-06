import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { formatRemainingTime } from '../../utils';
import { selectRemainingTimeDisplay } from '../countdown/countdownSlice';
import { Seconds } from '../types';

export type Tea = {
  id: string;
  name: string;
  brand: string;
  temperature: number;
  duration: Seconds;
  startedTimestamp: number | null;
  notificationId: string | null;
  isReady?: boolean;
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
    setTeaNotificationId: (
      state,
      { payload: { notificationId, id } }: PayloadAction<Pick<Tea, 'id' | 'notificationId'>>,
    ) => {
      teasAdapter.updateOne(state, { id, changes: { notificationId } });
    },
    setTeaIsReady: (state, { payload: { isReady, id } }: PayloadAction<Pick<Tea, 'id' | 'isReady'>>) => {
      teasAdapter.updateOne(state, { id, changes: { isReady } });
    },
  },
});

const teasSelectors = teasAdapter.getSelectors<RootState>((state) => state.teas);

export const selectTeas = teasSelectors.selectAll;
export const selectTeaUnsafe = teasSelectors.selectById;
export const selectTea = (state: RootState, id: string) => {
  const tea = selectTeaUnsafe(state, id);

  if (!tea) {
    throw new Error(`Tea ${id} not found`);
  }

  return tea;
};
export const selectTeaStartedAtTimestamp = createSelector(selectTea, (tea) => tea.startedTimestamp);
export const selectTeaNotificationId = createSelector(selectTea, (tea) => tea.notificationId);
export const selectTeaIsReady = createSelector(selectTea, (tea) => tea.isReady);
export const selectTeaDuration = createSelector(selectTea, (tea) => tea.duration);
export const selectTeaTemperatureCelsius = createSelector(selectTea, (tea) => ({
  value: tea.temperature,
  unit: '°C',
}));
export const selectTeaRemainingTimeDisplay = (state: RootState, teaId: string): string => {
  const remainingTimeDisplay = selectRemainingTimeDisplay(state);

  if (!remainingTimeDisplay) {
    const tea = selectTea(state, teaId);

    return formatRemainingTime(tea.duration);
  }

  return remainingTimeDisplay;
};

export const { setTeas, setTeaStartedTimestamp, setTeaNotificationId, setTeaIsReady } = teasSlice.actions;

export default teasSlice.reducer;
