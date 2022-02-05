import Store from '../../tests/Store';

import { pauseCountdown, resumeCountdown, startCountdown, stopCountdown } from './countdown';
import {
  selectCountdownId,
  selectIsPaused,
  selectIsReady,
  selectRemainingTime,
  setCountdownId,
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
    expect(store.select(selectIsPaused)).toBe(false);
  });
});

describe('pauseCountdown', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('pauses the running countdown', () => {
    store.dispatch(setRemainingTime(60));
    store.dispatch(setCountdownId(1));

    store.dispatch(pauseCountdown());

    expect(store.select(selectCountdownId)).toBeNull();
    expect(store.select(selectIsPaused)).toBe(true);
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
    expect(store.select(selectIsPaused)).toBe(false);
    expect(store.select(selectIsReady)).toBe(false);
  });
});

describe('resumeCountdown', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('resumes the paused countdown', () => {
    store.dispatch(setRemainingTime(60));

    expect(store.select(selectIsPaused)).toBe(true);

    store.dispatch(resumeCountdown());

    expect(store.select(selectCountdownId)).toEqual(1);
    expect(store.select(selectIsPaused)).toBe(false);
  });
});
