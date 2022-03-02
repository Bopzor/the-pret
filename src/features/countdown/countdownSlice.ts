import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { formatRemainingTime } from '../../utils';
import { CountdownId, Seconds } from '../types';

type CountdownState = {
  remainingTime: Seconds | null;
  countdownId: CountdownId | null;
  isReady: boolean;
};

const initialState: CountdownState = {
  remainingTime: null,
  countdownId: null,
  isReady: false,
};

const countdownSlice = createSlice({
  name: 'countdown',
  initialState,
  reducers: {
    setRemainingTime: (state, { payload: duration }: PayloadAction<CountdownState['remainingTime']>) => {
      state.remainingTime = duration;
    },
    decrementRemainingTime: (state) => {
      if (!state.remainingTime) {
        return;
      }

      state.remainingTime--;
    },
    setCountdownId: (state, { payload: countdownId }: PayloadAction<CountdownState['countdownId']>) => {
      state.countdownId = countdownId;
    },
    setIsReady: (state, { payload: isReady }: PayloadAction<CountdownState['isReady']>) => {
      state.isReady = isReady;
    },
  },
});

const countdownSelector = (state: RootState) => state.countdown;
export const selectCountdownId = createSelector(countdownSelector, (countdown) => countdown.countdownId);
export const selectRemainingTime = createSelector(countdownSelector, (countdown) => countdown.remainingTime);
export const selectIsReady = createSelector(countdownSelector, (countdown) => countdown.isReady);
export const selectIsRunning = (state: RootState) =>
  Boolean(selectCountdownId(state) && selectRemainingTime(state) && !selectIsReady(state));
export const selectRemainingTimeDisplay = createSelector(selectRemainingTime, (remainingTime) => {
  if (remainingTime === null) {
    return;
  }

  return formatRemainingTime(remainingTime);
});

export const { setCountdownId, setRemainingTime, setIsReady, decrementRemainingTime } = countdownSlice.actions;

export default countdownSlice.reducer;
