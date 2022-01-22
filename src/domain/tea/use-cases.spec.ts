import { Store } from '../tests/store';
import { selectIsPaused, selectIsStarted, selectRemainingTime, startTimer } from '../timer/timer.slice';

import { createTea, createTeas, Tea, TeaData } from './Tea';
import { selectTea, selectTeas, selectTimerId, setTea, setTeas, setTimerId } from './tea.slice';
import {
  addTea,
  editTea,
  fetchTea,
  fetchTeas,
  pauseTeaTimer,
  resumeTeaTimer,
  runTeaTimer,
  stopTeaTimer,
} from './use-cases';

describe('getTeas', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it("gets the teas' list", async () => {
    const teas = createTeas();

    store.teaGateway.teas = teas;

    await store.dispatch(fetchTeas());

    expect(store.select(selectTeas)).toEqual(teas);
  });
});

describe('getTea', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('gets the tea from the id', async () => {
    const tea = createTea();

    store.teaGateway.teas = [tea];

    await store.dispatch(fetchTea(tea.id));

    expect(store.select(selectTea)).toEqual(tea);
  });
});

describe('addTea', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('creates a tea', async () => {
    const tea: TeaData = {
      name: 'name',
      brand: 'brand',
      temperature: 80,
      time: 180,
    };

    await store.dispatch(addTea(tea));

    const createdTea = {
      ...tea,
      id: 'tea-1',
      archived: false,
      count: 0,
    };
    expect(store.select(selectTeas)).toEqual([createdTea]);
  });
});

describe('editTea', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('edits a tea', async () => {
    const tea: Tea = createTea();
    store.dispatch(setTeas([tea]));

    const editedTea: Tea = { ...tea, name: 'Edited name' };

    await store.dispatch(editTea(editedTea));

    expect(store.select(selectTeas)).toMatchObject([editedTea]);
  });
});

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
