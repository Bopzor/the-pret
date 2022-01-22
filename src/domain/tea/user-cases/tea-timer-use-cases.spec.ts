import { Store } from '../../tests/store';
import { selectIsPaused, selectIsStarted, selectRemainingTime, startTimer } from '../../timer/timer.slice';
import { createTea } from '../Tea';
import { selectTimerId, setTea, setTimerId } from '../tea.slice';

import { pauseTeaTimer, resumeTeaTimer, runTeaTimer, stopTeaTimer } from './tea-timer-use-cases';

describe('runTeaTimer', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('runs a tea timer', async () => {
    const tea = createTea();

    store.dispatch(setTea(tea));

    store.dispatch(runTeaTimer());

    expect(store.select(selectRemainingTime)).toEqual(tea.time);
    expect(store.select(selectIsStarted)).toEqual(true);

    expect(store.select(selectTimerId)).toEqual(9);
  });
});

describe('pauseTeaTimer', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('pauses the tea timer', async () => {
    store.dispatch(setTimerId(9));
    store.dispatch(startTimer(1));

    store.dispatch(pauseTeaTimer());

    expect(store.select(selectTimerId)).toBeNull();
    expect(store.select(selectIsPaused)).toBe(true);
  });
});

describe('resumeTeaTimer', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('resumes the tea timer', async () => {
    store.dispatch(resumeTeaTimer());

    expect(store.select(selectTimerId)).toEqual(9);
  });
});

describe('stopTeaTimer', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('stops the tea timer', async () => {
    store.dispatch(setTimerId(9));
    store.dispatch(startTimer(1));

    store.dispatch(stopTeaTimer());

    expect(store.select(selectTimerId)).toBeNull();
    expect(store.select(selectIsStarted)).toBe(false);
  });
});
