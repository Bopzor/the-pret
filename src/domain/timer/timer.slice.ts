import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { Seconds } from '../types';

type TimerState = {
  startedAt: number | null;
  duration: Seconds;
  remainingTime: Seconds | null;
};

const initialState = {
  startedAt: null,
  duration: 0,
  remainingTime: null,
} as TimerState;

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state, action: PayloadAction<number>) => {
      state.startedAt = action.payload;
    },
    stopTimer: (state) => {
      state.startedAt = null;
    },
    setDuration: (state, action: PayloadAction<Seconds>) => {
      state.duration = action.payload;
    },
    setRemainingTime: (state, action: PayloadAction<Seconds>) => {
      state.remainingTime = action.payload;
    },
  },
});

export const { startTimer, stopTimer, setDuration, setRemainingTime } = timerSlice.actions;

export const selectIsStarted = (state: RootState) => state.timer.startedAt !== null;

export default timerSlice.reducer;