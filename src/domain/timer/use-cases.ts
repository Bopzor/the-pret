import { ThunkResult } from '../store';

import {
  decreaseRemainingTime,
  pauseTimer as pauseTimerAction,
  selectIntervalId,
  selectRemainingTime,
  setIntervalId,
  startTimer,
  stopTimer as stopTimerAction,
} from './timer.slice';

export const runTimer =
  (): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { timerGateway }) => {
    try {
      const duration = selectRemainingTime(getState()) ?? 0;

      const onTick = () => dispatch(setDecreasedRemainingTime());
      const onEnd = () => {
        dispatch(setIntervalId(null));
        timerGateway.clear(intervalId);
      };

      const intervalId = timerGateway.start({
        startTimestamp: Date.now(),
        duration,
        onTick,
        onEnd,
      });

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
      throw new Error('pauseTimer: No timer is started.');
    }

    timerGateway.pause(intervalId);
    dispatch(pauseTimerAction());
  };

export const stopTimer =
  (): ThunkResult<void> =>
  (dispatch, getState, { timerGateway }) => {
    const intervalId = selectIntervalId(getState());

    if (intervalId) {
      timerGateway.clear(intervalId);
    }

    dispatch(stopTimerAction());
  };

export const setDecreasedRemainingTime = (): ThunkResult<void> => (dispatch, getState) => {
  const remainingTime = selectRemainingTime(getState());

  if (remainingTime && remainingTime > 0) {
    dispatch(decreaseRemainingTime());
  }
};
