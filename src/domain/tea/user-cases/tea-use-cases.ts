import { ThunkResult } from '../../store';
import { Tea, TeaData } from '../Tea';
import { addTea as addTeaAction, editTea as editTeaAction, setTea, setTeas } from '../tea.slice';

export const fetchTeas =
  (): ThunkResult<Promise<void>> =>
  async (dispatch, _getState, { teaGateway }) => {
    try {
      const teas = await teaGateway.getTeas();

      dispatch(setTeas(teas));
    } catch (e) {
      console.error(e);
    }
  };

export const fetchTea =
  (id: string): ThunkResult<Promise<void>> =>
  async (dispatch, _getState, { teaGateway }) => {
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
  async (dispatch, _getState, { teaGateway, idGateway }) => {
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
  async (dispatch, _getState, { teaGateway }) => {
    try {
      await teaGateway.saveTea(tea);

      dispatch(editTeaAction(tea));
    } catch (e) {
      console.error(e);
    }
  };