import Store from '../../tests/Store';

import { startCountdown, stopCountdown } from './countdown';
import {
  selectCountdownId,
  selectIsReady,
  selectRemainingTime,
  setCountdownId,
  setIsReady,
  setRemainingTime,
} from './countdownSlice';

describe('startCountdown', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('starts the countdown of 60 seconds', () => {
    store.dispatch(startCountdown(60));

    expect(store.select(selectRemainingTime)).toEqual(60);
  });

  it('starts a new countdowns', () => {
    store.dispatch(setIsReady(true));

    store.dispatch(startCountdown(30));

    expect(store.select(selectIsReady)).toBe(false);
  });

  it('decrements the countdown by 1 second', () => {
    store.dispatch(startCountdown(60));
    store.countdown.onCountdown();

    expect(store.select(selectRemainingTime)).toEqual(59);
  });

  it('ends the countdown when the duration has elapsed', () => {
    store.dispatch(startCountdown(1));
    store.countdown.onCountdown();

    expect(store.select(selectRemainingTime)).toBeNull();
    expect(store.select(selectIsReady)).toBe(true);
  });
});

describe('stopCountdown', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('stops the running countdown', () => {
    store.dispatch(setRemainingTime(60));
    store.dispatch(setCountdownId(1));

    store.dispatch(stopCountdown());

    expect(store.select(selectCountdownId)).toBeNull();
    expect(store.select(selectRemainingTime)).toBeNull();
    expect(store.select(selectIsReady)).toBe(false);
  });
});
