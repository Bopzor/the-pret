import { ThunkResult } from '../store';
import { selectRemainingTime, setRemainingTime } from '../timer/timer.slice';
import { pauseTimer, resumeTimer, runTimer, stopTimer } from '../timer/use-cases';

import { Tea, TeaData } from './Tea';
import {
  addTea as addTeaAction,
  editTea as editTeaAction,
  selectTea,
  selectTimerId,
  setTea,
  setTeas,
  setTimerId,
} from './tea.slice';

export const fetchTeas =
  (): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { teaGateway }) => {
    try {
      const teas = await teaGateway.getTeas();

      dispatch(setTeas(teas));
    } catch (e) {
      console.error(e);
    }
  };

export const fetchTea =
  (id: string): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { teaGateway }) => {
    try {
      const tea = await teaGateway.getTea(id);

      if (!tea) {
        throw new Error('Tea with id ${id} not found.');
      }

      dispatch(setTea(tea));
    } catch (e) {
      console.error(e);
    }
  };

export const addTea =
  (teaData: TeaData): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { teaGateway, idGateway }) => {
    try {
      const tea: Tea = {
        ...teaData,
        id: idGateway.id(),
        count: 0,
        archived: false,
      };

      await teaGateway.saveTea(tea);

      dispatch(addTeaAction(tea));
    } catch (e) {
      console.error(e);
    }
  };

export const editTea =
  (tea: Tea): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { teaGateway }) => {
    try {
      await teaGateway.saveTea(tea);

      dispatch(editTeaAction(tea));
    } catch (e) {
      console.error(e);
    }
  };

export const runTeaTimer =
  (): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { teaGateway }) => {
    try {
      const tea = selectTea(getState());

      if (!tea) {
        throw new Error('Missing selected tea.');
      }

      dispatch(setRemainingTime(tea.time));
      dispatch(runTimer());

      const timerId = teaGateway.runTimer(tea.time, () => console.log('finish'));

      dispatch(setTimerId(timerId));
    } catch (e) {
      console.error(e);
    }
  };

export const pauseTeaTimer =
  (): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { teaGateway }) => {
    try {
      const timerId = selectTimerId(getState());

      if (!timerId) {
        throw new Error('No tea timer running.');
      }

      dispatch(pauseTimer());

      teaGateway.cancelTimer(timerId);

      dispatch(setTimerId(null));
    } catch (e) {
      console.error(e);
    }
  };

export const resumeTeaTimer =
  (): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { teaGateway }) => {
    try {
      const remainingTime = selectRemainingTime(getState());

      dispatch(resumeTimer());
      const timerId = teaGateway.runTimer(remainingTime, () => console.log('finish'));

      dispatch(setTimerId(timerId));
    } catch (e) {
      console.error(e);
    }
  };

export const stopTeaTimer =
  (): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { teaGateway }) => {
    try {
      const timerId = selectTimerId(getState());

      if (!timerId) {
        throw new Error('No tea timer running.');
      }

      dispatch(stopTimer());
      teaGateway.cancelTimer(timerId);

      dispatch(setTimerId(null));
    } catch (e) {
      console.error(e);
    }
  };
