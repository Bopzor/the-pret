import { Store } from '../tests/store';

import { setDuration, startTimer } from './timer.slice';
import { getRemainingTime, pauseTimer, resumeTimer, runTimer } from './use-cases';

describe('runTimer', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('starts a timer', () => {
    store.dispatch(runTimer(jest.fn()));

    const state = store.getState();

    expect(state.timer.startedAt).toBe(0);
    expect(store.timerGateway.timer).not.toBeUndefined();
  });

  it('triggers the callback on timer end', async () => {
    const callback = jest.fn();

    await store.dispatch(runTimer(callback));

    expect(callback).not.toHaveBeenCalled;

    store.timerGateway.end();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('pauseTimer', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('pauses the timer', () => {
    expect(() => store.dispatch(pauseTimer())).toThrowError('No timer is started.');

    store.dispatch(setDuration(200));
    store.dispatch(startTimer(0));
    jest.spyOn(store.timerGateway, 'now').mockReturnValue(10);

    store.dispatch(pauseTimer());

    const state = store.getState();

    expect(state.timer.startedAt).toBe(null);
    expect(state.timer.duration).toEqual(190);
  });
});

describe('resumeTimer', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('resumes the timer', () => {
    store.dispatch(setDuration(190));

    jest.spyOn(store.timerGateway, 'now').mockReturnValue(10);

    store.dispatch(resumeTimer());

    const state = store.getState();

    expect(state.timer.startedAt).toBe(10);
  });
});

describe('getRemainingTime', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('gets remaining time', () => {
    store.dispatch(setDuration(200));
    store.dispatch(startTimer(0));

    jest.spyOn(store.timerGateway, 'now').mockReturnValue(10);

    store.dispatch(getRemainingTime());

    const state = store.getState();
    expect(state.timer.remainingTime).toEqual(190);
  });

  it("throws if the timer isn't started", () => {
    expect(() => store.dispatch(getRemainingTime())).toThrowError('Timer is not started.');
  });
});
