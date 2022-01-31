import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { Seconds } from '../types';

type TimerState = {
  started: boolean;
  remainingTime: Seconds | null;
  intervalId: number | null;
};

const initialState: TimerState = {
  started: false,
  remainingTime: null,
  intervalId: null,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state, { payload: intervalId }: PayloadAction<number>) => {
      state.started = true;
      state.intervalId = intervalId;
    },
    pauseTimer: (state) => {
      state.intervalId = null;
    },
    stopTimer: (state) => {
      state.started = false;
      state.intervalId = null;
    },
    setRemainingTime: (state, { payload: remainingTime }: PayloadAction<Seconds>) => {
      state.remainingTime = remainingTime;
    },
    decreaseRemainingTime: (state) => {
      if (state.remainingTime) {
        --state.remainingTime;
      }
    },
    setIntervalId: (state, { payload: intervalId }: PayloadAction<number | null>) => {
      state.intervalId = intervalId;
    },
  },
});

export const { startTimer, stopTimer, setRemainingTime, pauseTimer, decreaseRemainingTime, setIntervalId } =
  timerSlice.actions;

export const selectIsStarted = (state: RootState) => state.timer.started;
export const selectIsPaused = (state: RootState) => state.timer.started && state.timer.intervalId === null;
export const selectRemainingTime = (state: RootState) => {
  const remainingTime = state.timer.remainingTime;

  if (!remainingTime) {
    return remainingTime;
  }

  return remainingTime < 0 ? 0 : remainingTime;
};
export const selectIntervalId = (state: RootState) => state.timer.intervalId;
export const selectIsFinished = (state: RootState) => {
  const isStarted = selectIsStarted(state);
  const remainingTime = selectRemainingTime(state);

  return isStarted && remainingTime === 0;
};

export default timerSlice.reducer;
