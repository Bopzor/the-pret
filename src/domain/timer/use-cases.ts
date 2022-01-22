import { ThunkResult } from '../store';

import {
  decreaseRemainingTime,
  pauseTimer as pauseTimerAction,
  selectIntervalId,
  selectIsStarted,
  setIntervalId,
  startTimer,
  stopTimer as stopTimerAction,
} from './timer.slice';

export const runTimer =
  (): ThunkResult<Promise<void>> =>
  async (dispatch, _getState, { timerGateway }) => {
    try {
      const intervalId = timerGateway.startInterval(() => dispatch(setDecreasedRemainingTime()), 1);

      dispatch(startTimer(intervalId));
    } catch (e) {
      console.error(e);
    }
  };

export const pauseTimer =
  (): ThunkResult<void> =>
  (dispatch, getState, { timerGateway }) => {
    const intervalId = selectIntervalId(getState());

    if (!intervalId) {
      throw new Error('No timer is started.');
    }

    timerGateway.pauseInterval(intervalId);
    dispatch(pauseTimerAction());
  };

export const resumeTimer =
  (): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { timerGateway }) => {
    const isStarted = selectIsStarted(getState());

    if (isStarted) {
      throw new Error('The timer is already running.');
    }

    const intervalId = timerGateway.resume();

    dispatch(setIntervalId(intervalId));
  };

export const stopTimer =
  (): ThunkResult<void> =>
  (dispatch, getState, { timerGateway }) => {
    const intervalId = selectIntervalId(getState());

    if (!intervalId) {
      throw new Error('No timer is started.');
    }

    timerGateway.stopInterval(intervalId);
    dispatch(stopTimerAction());
  };

export const setDecreasedRemainingTime = (): ThunkResult<void> => (dispatch, getState) => {
  if (selectIsStarted(getState())) {
    dispatch(decreaseRemainingTime());
  }
};
