import { AppThunkAction } from '../../store';
import { startCountdown, stopCountdown } from '../countdown/countdown';
import { Seconds } from '../types';

import { selectTea, setTeas, setTeaStartedTimestamp } from './teasSlice';

export const loadTeas =
  (): AppThunkAction<Promise<void>> =>
  async (dispatch, _getState, { teaStorage }) => {
    const teas = await teaStorage.loadTeas();

    dispatch(setTeas(teas));
  };

export const startTeaCountdown =
  (teaId: string): AppThunkAction<Promise<void>> =>
  async (dispatch, getState, { date, teaStorage }) => {
    const tea = selectTea(getState(), teaId);

    if (!tea) {
      throw new Error(`Tea ${teaId} not found`);
    }

    // TODO: handle when no countdownId
    dispatch(stopCountdown());

    const now = date.now();
    let duration = tea.duration;

    if (tea.startedTimestamp !== null) {
      const elapsedSeconds: Seconds = Math.ceil((now - tea.startedTimestamp) / 1000);

      duration = duration - elapsedSeconds;
    }

    dispatch(startCountdown(duration));

    if (tea.startedTimestamp === null) {
      await teaStorage.saveTeaStartedTimestamp(tea.id, now);
      dispatch(setTeaStartedTimestamp({ id: teaId, startedTimestamp: now }));
    }
  };

export const stopTeaCountdown =
  (id: string): AppThunkAction<Promise<void>> =>
  async (dispatch, _getState, { teaStorage }) => {
    await teaStorage.saveTeaStartedTimestamp(id, null);

    dispatch(setTeaStartedTimestamp({ id, startedTimestamp: null }));
    dispatch(stopCountdown());
  };
