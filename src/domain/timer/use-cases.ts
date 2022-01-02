import { ThunkResult } from '../store';

import {
  selectDuration,
  selectIsStarted,
  selectRemainingTime,
  selectStartedAt,
  setDuration,
  setRemainingTime,
  startTimer,
  stopTimer,
} from './timer.slice';

export const runTimer =
  (callback: () => unknown): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { timerGateway }) => {
    try {
      const duration = selectDuration(getState());

      dispatch(startTimer(timerGateway.now()));

      await timerGateway.start(callback, duration);

      dispatch(setRemainingTime(0));
      dispatch(stopTimer());
    } catch (e) {
      console.error(e);
    }
  };

export const pauseTimer =
  (): ThunkResult<void> =>
  (dispatch, getState, { timerGateway }) => {
    const startedAt = selectStartedAt(getState());

    if (startedAt === null) {
      throw new Error('No timer is started.');
    }

    dispatch(getRemainingTime());
    const remainingTime = selectRemainingTime(getState());

    if (remainingTime === null) {
      // TODO handle this correctly. The message should not be implementation oriented
      throw new Error('Timer cannot be paused because remaining time is null.');
    }

    dispatch(setDuration(remainingTime));
    dispatch(stopTimer());
    timerGateway.pause();
  };

export const resumeTimer =
  (): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { timerGateway }) => {
    const isStarted = selectIsStarted(getState());

    if (isStarted) {
      throw new Error('The timer is already running.');
    }

    const duration = selectDuration(getState());

    dispatch(startTimer(timerGateway.now()));
    await timerGateway.resume(duration);
  };

export const getRemainingTime =
  (): ThunkResult<void> =>
  (dispatch, getState, { timerGateway }) => {
    const startedAt = selectStartedAt(getState());

    if (startedAt === null) {
      throw new Error('Timer is not started.');
    }

    const duration = selectDuration(getState());
    const passed = timerGateway.now() - startedAt;

    const remaining = duration - passed;

    const time = remaining > 0 ? remaining : 0;

    dispatch(setRemainingTime(time));
  };
