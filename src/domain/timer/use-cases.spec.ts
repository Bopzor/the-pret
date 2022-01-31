import { Store } from '../tests/store';

import { selectIntervalId, selectIsStarted, selectRemainingTime, setRemainingTime, startTimer } from './timer.slice';
import { pauseTimer, runTimer, stopTimer } from './use-cases';

describe('runTimer', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('starts a timer', () => {
    store.dispatch(setRemainingTime(200));

    store.dispatch(runTimer());

    expect(store.select(selectIsStarted)).toBe(true);
    expect(store.select(selectIntervalId)).toEqual(1);
  });

  it('decreases remaining time each invocation', async () => {
    store.dispatch(setRemainingTime(200));

    store.dispatch(runTimer());

    store.timerGateway.runInterval(Date.now());
    expect(store.select(selectRemainingTime)).toEqual(199);
  });

  it('stops when finished', async () => {
    store.dispatch(setRemainingTime(200));

    store.dispatch(runTimer());

    store.timerGateway.runInterval(Date.now() + 201 * 1000);
    expect(store.select(selectIntervalId)).toBeNull();
  });
});

describe('pauseTimer', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('pauses the timer', () => {
    expect(() => store.dispatch(pauseTimer())).toThrowError('pauseTimer: No timer is started.');

    store.dispatch(startTimer(1));

    store.dispatch(pauseTimer());

    expect(store.select(selectIsStarted)).toBe(true);
    expect(store.select(selectIntervalId)).toBeNull();
  });
});

describe('stopTimer', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('stops the timer', () => {
    store.dispatch(startTimer(1));

    store.dispatch(stopTimer());

    expect(store.select(selectIsStarted)).toBe(false);
    expect(store.select(selectIntervalId)).toBeNull();
  });
});
