import { ThunkResult } from '../../store';
import { selectRemainingTime, setRemainingTime } from '../../timer/timer.slice';
import { pauseTimer, resumeTimer, runTimer, stopTimer } from '../../timer/use-cases';
import { Seconds } from '../../types';
import { selectTea, selectTimerId, setTimerId } from '../tea.slice';

const startTeaTimer =
  (duration: Seconds): ThunkResult<Promise<void>> =>
  async (dispatch, _getState, { teaGateway }) => {
    const timerId: string = await teaGateway.runTimer(duration, () => console.log(`timer ${timerId} ends`));

    dispatch(setTimerId(timerId));
  };

const cancelTeaTimer =
  (timerId: string): ThunkResult<Promise<void>> =>
  async (dispatch, _getState, { teaGateway }) => {
    teaGateway.cancelTimer(timerId);

    dispatch(setTimerId(null));
  };

export const runTeaTimer = (): ThunkResult<Promise<void>> => async (dispatch, getState) => {
  try {
    const tea = selectTea(getState());

    if (!tea) {
      throw new Error('Missing selected tea.');
    }

    dispatch(setRemainingTime(tea.time));
    dispatch(runTimer());

    dispatch(startTeaTimer(tea.time));
  } catch (e) {
    console.error(e);
  }
};

export const pauseTeaTimer = (): ThunkResult<Promise<void>> => async (dispatch, getState) => {
  try {
    const timerId = selectTimerId(getState());

    if (!timerId) {
      throw new Error('No tea timer running.');
    }

    dispatch(pauseTimer());

    dispatch(cancelTeaTimer(timerId));
  } catch (e) {
    console.error(e);
  }
};

export const resumeTeaTimer = (): ThunkResult<Promise<void>> => async (dispatch, getState) => {
  try {
    const remainingTime = selectRemainingTime(getState());

    dispatch(resumeTimer());

    await dispatch(startTeaTimer(remainingTime));
  } catch (e) {
    console.error(e);
  }
};

export const stopTeaTimer = (): ThunkResult<Promise<void>> => async (dispatch, getState) => {
  try {
    const timerId = selectTimerId(getState());

    if (!timerId) {
      throw new Error('No tea timer running.');
    }

    dispatch(stopTimer());

    dispatch(cancelTeaTimer(timerId));
  } catch (e) {
    console.error(e);
  }
};

export const addTeaTimer =
  (id: string): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { teaGateway }) => {
    try {
      const timerId = selectTimerId(getState());

      if (timerId && timerId !== id) {
        throw new Error(`Timer "${timerId}" is already running.`);
      }

      await teaGateway.saveTimer(id);

      dispatch(setTimerId(id));
    } catch (e) {
      console.error(e);
    }
  };

export const loadTeaTimer =
  (): ThunkResult<Promise<string | null | undefined>> =>
  async (dispatch, getState, { teaGateway }) => {
    try {
      const existingTimerId = selectTimerId(getState());
      const timerId = await teaGateway.loadTimer();

      if (existingTimerId && existingTimerId !== timerId) {
        throw new Error(`Timer ${existingTimerId} is already running.`);
      }

      dispatch(setTimerId(timerId));

      return timerId;
    } catch (e) {
      console.error(e);
    }
  };
