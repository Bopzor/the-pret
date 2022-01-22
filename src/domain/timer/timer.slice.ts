import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { Seconds } from '../types';

type TimerState = {
  started: boolean;
  remainingTime: Seconds;
  intervalId: number | null;
};

const initialState: TimerState = {
  started: false,
  remainingTime: 0,
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
      --state.remainingTime;
    },
    setIntervalId: (state, { payload: intervalId }: PayloadAction<number>) => {
      state.intervalId = intervalId;
    },
  },
});

export const { startTimer, stopTimer, setRemainingTime, pauseTimer, decreaseRemainingTime, setIntervalId } =
  timerSlice.actions;

export const selectIsStarted = (state: RootState) => state.timer.started;
export const selectIsPaused = (state: RootState) => state.timer.started && state.timer.intervalId === null;
export const selectRemainingTime = (state: RootState) => state.timer.remainingTime;
export const selectIntervalId = (state: RootState) => state.timer.intervalId;

export default timerSlice.reducer;
