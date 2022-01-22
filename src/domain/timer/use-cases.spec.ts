import { Store } from '../tests/store';

import { selectIntervalId, selectIsStarted, selectRemainingTime, setRemainingTime, startTimer } from './timer.slice';
import { pauseTimer, resumeTimer, runTimer } from './use-cases';

describe('runTimer', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('starts a timer that decrease remaining time each invocation', async () => {
    store.dispatch(setRemainingTime(200));

    store.dispatch(runTimer());

    expect(store.select(selectIsStarted)).toBe(true);
    expect(store.select(selectIntervalId)).toEqual(1);

    store.timerGateway.runInterval();
    expect(store.select(selectRemainingTime)).toEqual(199);
  });
});

describe('pauseTimer', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('pauses the timer', () => {
    expect(() => store.dispatch(pauseTimer())).toThrowError('No timer is started.');

    store.dispatch(startTimer(1));

    store.dispatch(pauseTimer());

    expect(store.select(selectIsStarted)).toBe(true);
    expect(store.select(selectIntervalId)).toBeNull();
  });
});

describe('resumeTimer', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('resumes the paused timer', () => {
    store.dispatch(setRemainingTime(190));

    store.dispatch(resumeTimer());

    expect(store.select(selectIntervalId)).toBe(2);
  });
});
