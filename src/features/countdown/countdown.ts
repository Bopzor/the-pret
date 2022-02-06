import { AppThunkAction } from '../../store';
import { Seconds } from '../types';

import {
  decrementRemainingTime,
  selectCountdownId,
  setCountdownId,
  setIsReady,
  setRemainingTime,
} from './countdownSlice';

export const startCountdown =
  (duration: Seconds): AppThunkAction<void> =>
  (dispatch, _getState, { countdown }) => {
    dispatch(setIsReady(false));
    dispatch(setRemainingTime(duration));

    const onTick = () => dispatch(decrementRemainingTime());
    const onEnd = () => dispatch(endCountdown());

    const countdownId = countdown.start({
      duration,
      onTick,
      onEnd,
    });

    dispatch(setCountdownId(countdownId));
  };

export const endCountdown = (): AppThunkAction<void> => (dispatch) => {
  dispatch(stopCountdown());

  dispatch(setIsReady(true));
};

export const stopCountdown =
  (): AppThunkAction<void> =>
  (dispatch, getState, { countdown }) => {
    const countdownId = selectCountdownId(getState());

    countdown.stop(countdownId);

    dispatch(setCountdownId(null));
    dispatch(setRemainingTime(null));
  };
