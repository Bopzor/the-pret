import { ThunkResult } from '../../store';
import { selectRemainingTime, setRemainingTime } from '../../timer/timer.slice';
import { pauseTimer, runTimer, stopTimer } from '../../timer/use-cases';
import { Seconds } from '../../types';
import { selectTea, selectTimerId, setTimerId } from '../tea.slice';
import { TeaTimerParams, TeaTimerPayload } from '../TeaTimerGateway';

import { loadTea } from './tea';

const startTeaTimer =
  (duration: Seconds): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { teaTimerGateway }) => {
    // TODO: get this from router?
    const tea = selectTea(getState());

    if (!tea) {
      throw new Error('startTeaTimer: No tea was found');
    }

    const notification: TeaTimerParams = {
      title: 'Thé prêt ?',
      body: 'Le thé est prêt !',
      duration,
      payload: {
        teaId: tea.id,
      },
    };

    const onTimerEnd = async (timerId: string, payload: TeaTimerPayload) => {
      await dispatch(addTeaTimer(timerId));
      await dispatch(loadTea(payload));
    };

    const timerId: string = await teaTimerGateway.runTimer(notification, onTimerEnd);

    dispatch(setTimerId(timerId));
  };

const cancelTeaTimer =
  (timerId: string): ThunkResult<Promise<void>> =>
  async (dispatch, _getState, { teaTimerGateway }) => {
    teaTimerGateway.clearTimer(timerId);

    dispatch(setTimerId(null));
  };

export const runTeaTimer = (): ThunkResult<Promise<void>> => async (dispatch, getState) => {
  try {
    const tea = selectTea(getState());

    if (!tea) {
      throw new Error('runTeaTimer: Missing selected tea.');
    }

    const remainingTime = selectRemainingTime(getState());

    if (!remainingTime) {
      dispatch(setRemainingTime(tea.time));
    }

    dispatch(runTimer());

    dispatch(startTeaTimer(remainingTime ?? tea.time));
  } catch (e) {
    console.error(e);
  }
};

export const pauseTeaTimer = (): ThunkResult<Promise<void>> => async (dispatch, getState) => {
  try {
    const timerId = selectTimerId(getState());

    if (!timerId) {
      throw new Error('pauseTeaTimer: No tea timer running.');
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

    if (!remainingTime) {
      throw new Error('resumeTeaTimer: not stated');
    }

    dispatch(runTimer());

    await dispatch(startTeaTimer(remainingTime));
  } catch (e) {
    console.error(e);
  }
};

export const stopTeaTimer = (): ThunkResult<Promise<void>> => async (dispatch, getState) => {
  try {
    const timerId = selectTimerId(getState());

    if (!timerId) {
      throw new Error('stopTeaTimer: No tea timer running.');
    }

    dispatch(stopTimer());

    dispatch(cancelTeaTimer(timerId));
  } catch (e) {
    console.error(e);
  }
};

export const addTeaTimer =
  (id: string): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { teaTimerGateway }) => {
    try {
      const timerId = selectTimerId(getState());

      if (timerId && timerId !== id) {
        throw new Error(`addTeaTimer: Timer "${timerId}" is already running.`);
      }

      await teaTimerGateway.saveTimer(id);

      dispatch(setTimerId(id));
    } catch (e) {
      console.error(e);
    }
  };

export const loadTeaTimer =
  (): ThunkResult<Promise<string | null | undefined>> =>
  async (dispatch, getState, { teaTimerGateway }) => {
    try {
      const existingTimerId = selectTimerId(getState());
      const timerId = await teaTimerGateway.loadTimer();

      if (existingTimerId && existingTimerId !== timerId) {
        throw new Error(`loadTeaTimer: Timer ${existingTimerId} is already running.`);
      }

      dispatch(setTimerId(timerId));

      return timerId;
    } catch (e) {
      console.error(e);
    }
  };
