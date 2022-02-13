import { AppThunkAction } from '../../store';
import { stopCountdown } from '../countdown/countdown';
import { loadTeas, startTeaCountdown } from '../teas/teas';
import { selectTeas, selectTeaStartedAtTimestamp } from '../teas/teasSlice';

export const listenAppState =
  (): AppThunkAction<void> =>
  (dispatch, getState, { appState }) => {
    appState.addEventListener('active', async () => {
      const teas = selectTeas(getState());

      // TODO: is this enough for killed management?
      if (teas.length === 0) {
        await dispatch(loadTeas());
      }

      // TODO: use routing to get tea Id if any and only if a tea timer is started
      const teaStartedTimestamp = selectTeaStartedAtTimestamp(getState(), 'tea-1');

      if (teaStartedTimestamp !== null) {
        await dispatch(startTeaCountdown('tea-1'));
      }
    });
    appState.addEventListener('background', async () => {
      dispatch(stopCountdown());
    });
  };

export const removeAppStateListener =
  (): AppThunkAction<void> =>
  (_dispatch, _getState, { appState }) => {
    appState.removeAllEventListener();
  };
