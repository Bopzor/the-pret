import { AppThunkAction } from '../../store';
import { startCountdown, stopCountdown } from '../countdown/countdown';

import { selectTea, setTeas, setTeaStartedTimestamp } from './teasSlice';

export const loadTeas =
  (): AppThunkAction<Promise<void>> =>
  async (dispatch, _getState, { teaStorage }) => {
    const teas = await teaStorage.loadTeas();

    dispatch(setTeas(teas));
  };

export const startTeaCountdown =
  (teaId: string): AppThunkAction<void> =>
  (dispatch, getState, { date }) => {
    const tea = selectTea(getState(), teaId);

    if (!tea) {
      throw new Error(`Tea ${teaId} not found`);
    }

    // TODO: handle when no countdownId
    dispatch(stopCountdown());

    const now = date.now();
    let duration = tea.duration;

    if (tea.startedTimestamp !== null) {
      duration = duration - now - tea.startedTimestamp;
    }

    dispatch(startCountdown(duration));
    dispatch(setTeaStartedTimestamp({ id: teaId, startedTimestamp: now }));
  };
