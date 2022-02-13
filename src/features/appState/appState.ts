import { AppThunkAction } from '../../store';
import { stopCountdown } from '../countdown/countdown';
import { startTeaCountdown } from '../teas/teas';
import { selectTeaStartedAtTimestamp } from '../teas/teasSlice';

export const listenAppState =
  (): AppThunkAction<void> =>
  (dispatch, getState, { appState }) => {
    // TODO: check behavior on app killed

    // TODO: use routing to get tea Id if any and only if a tea timer is started
    appState.addEventListener('active', () => {
      const teaStartedTimestamp = selectTeaStartedAtTimestamp(getState(), 'tea-1');

      if (teaStartedTimestamp !== null) {
        dispatch(startTeaCountdown('tea-1'));
      }
    });
    appState.addEventListener('background', () => {
      // TODO: check behavior on app killed
      dispatch(stopCountdown());
    });
  };

export const removeAppStateListener =
  (): AppThunkAction<void> =>
  (_dispatch, _getState, { appState }) => {
    appState.removeAllEventListener();
  };
