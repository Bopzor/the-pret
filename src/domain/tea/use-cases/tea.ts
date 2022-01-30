import { ThunkResult } from '../../store';
import { setRemainingTime } from '../../timer/timer.slice';
import { runTimer } from '../../timer/use-cases';
import { Tea, TeaData } from '../Tea';
import { addTea as addTeaAction, editTea as editTeaAction, setTea, setTeas, setTimerId } from '../tea.slice';

import { loadTeaTimer } from './tea-timer';

export const fetchTeas =
  (): ThunkResult<Promise<void>> =>
  async (dispatch, _getState, { teaStoreGateway }) => {
    try {
      const teas = await teaStoreGateway.getTeas();

      dispatch(setTeas(teas));
    } catch (e) {
      console.error(e);
    }
  };

export const fetchTea =
  (id: string): ThunkResult<Promise<void>> =>
  async (dispatch, _getState, { teaStoreGateway }) => {
    try {
      const tea = await teaStoreGateway.getTea(id);

      if (!tea) {
        throw new Error('Tea with id ${id} not found.');
      }

      dispatch(setTea(tea));
      dispatch(setRemainingTime(tea.time));
    } catch (e) {
      console.error(e);
    }
  };

export const loadTea =
  ({ teaId }: { teaId: string }): ThunkResult<Promise<void>> =>
  async (dispatch, _getState) => {
    try {
      await dispatch(fetchTea(teaId));

      const timerId = await dispatch(loadTeaTimer());

      if (!timerId) {
        return;
      }

      // dispatch(setTimerId(timerId));
      // TODO: get end time of timer
      // const time = teaStoreGateway.getTimerTimeEnd(timerId)
      // if (time >= teaStoreGateway.now()) timer is over
      dispatch(setRemainingTime(0));
      // else calculate remaining time

      await dispatch(runTimer());
    } catch (e) {
      console.error(e);
    }
  };

export const addTea =
  (teaData: TeaData): ThunkResult<Promise<void>> =>
  async (dispatch, _getState, { teaStoreGateway, idGateway }) => {
    try {
      const tea: Tea = {
        ...teaData,
        id: idGateway.id(),
        count: 0,
        archived: false,
      };

      await teaStoreGateway.saveTea(tea);

      dispatch(addTeaAction(tea));
    } catch (e) {
      console.error(e);
    }
  };

export const editTea =
  (tea: Tea): ThunkResult<Promise<void>> =>
  async (dispatch, _getState, { teaStoreGateway }) => {
    try {
      await teaStoreGateway.saveTea(tea);

      dispatch(editTeaAction(tea));
    } catch (e) {
      console.error(e);
    }
  };
