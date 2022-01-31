import { Store } from '../../tests/store';
import {
  selectIsPaused,
  selectIsStarted,
  selectRemainingTime,
  setRemainingTime,
  startTimer,
} from '../../timer/timer.slice';
import { createTea } from '../Tea';
import { selectTimerId, setTea, setTimerId } from '../tea.slice';

import { addTeaTimer, pauseTeaTimer, resumeTeaTimer, runTeaTimer, stopTeaTimer } from './tea-timer';

describe('runTeaTimer', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('runs a tea timer', async () => {
    const tea = createTea();

    store.dispatch(setTea(tea));

    await store.dispatch(runTeaTimer());

    expect(store.select(selectRemainingTime)).toEqual(tea.time);
    expect(store.select(selectIsStarted)).toEqual(true);

    expect(store.select(selectTimerId)).toEqual('9');
  });

  it('sets remaining time at 0 on end', async () => {
    const tea = createTea();
    store.teaStoreGateway.teas = [tea];
    store.dispatch(setTea(tea));

    await store.dispatch(runTeaTimer());
    await store.teaTimerGateway.endTimer();

    expect(store.select(selectRemainingTime)).toEqual(0);
  });
});

describe('pauseTeaTimer', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('pauses the tea timer', async () => {
    store.dispatch(setTimerId('9'));
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
    const tea = createTea();
    store.dispatch(setTea(tea));
    store.dispatch(setRemainingTime(tea.time));

    await store.dispatch(resumeTeaTimer());

    expect(store.select(selectTimerId)).toEqual('9');
  });
});

describe('stopTeaTimer', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('stops the tea timer', async () => {
    store.dispatch(setTimerId('9'));
    store.dispatch(startTimer(1));

    store.dispatch(stopTeaTimer());

    expect(store.select(selectTimerId)).toBeNull();
    expect(store.select(selectIsStarted)).toBe(false);
  });
});

describe('addTeaTimer', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('add a tea timer', async () => {
    await store.dispatch(addTeaTimer('42'));

    expect(store.select(selectTimerId)).toEqual('42');
  });
});
