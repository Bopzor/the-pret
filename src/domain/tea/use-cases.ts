import { ThunkResult } from '../store';

import { setTeas } from './tea.slice';

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
