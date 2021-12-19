import { ThunkResult } from '../store';

import { setRemainingTime, startTimer, stopTimer } from './timer.slice';

export const runTimer =
  (callback: () => unknown): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { timerGateway }) => {
    try {
      const duration = getState().timer.duration;

      dispatch(startTimer(timerGateway.now()));

      await timerGateway.start(callback, duration);

      dispatch(stopTimer());
    } catch (e) {
      console.error(e);
    }
  };

export const getRemainingTime =
  (): ThunkResult<void> =>
  (dispatch, getState, { timerGateway }) => {
    const startedAt = getState().timer.startedAt;

    if (startedAt === null) {
      throw new Error('Timer is not started.');
    }

    const duration = getState().timer.duration;

    const time = timerGateway.getRemainingTime(startedAt, duration);

    dispatch(setRemainingTime(time));
  };
