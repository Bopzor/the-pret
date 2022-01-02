import { ThunkResult } from '../store';

import { Tea, TeaData } from './Tea';
import { addTea as addTeaAction, editTea as editTeaAction, setTeas } from './tea.slice';

export const getTeas =
  (): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { teaGateway }) => {
    try {
      const teas = await teaGateway.getTeas();

      dispatch(setTeas(teas));
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

      const createdTea = await teaGateway.createTea(tea);

      dispatch(addTeaAction(createdTea));
    } catch (e) {
      console.error(e);
    }
  };

export const editTea =
  (tea: Tea): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { teaGateway }) => {
    try {
      const editedTea: Tea = await teaGateway.editTea(tea);

      dispatch(editTeaAction(editedTea));
    } catch (e) {
      console.error(e);
    }
  };
