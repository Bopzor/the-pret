import { Store } from '../../tests/store';
import { selectRemainingTime } from '../../timer/timer.slice';
import { createTea, createTeas, Tea, TeaData } from '../Tea';
import { selectTea, selectTeas, selectTimerId, setTeas } from '../tea.slice';

import { addTea, editTea, fetchTea, fetchTeas, loadTea } from './tea';

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
    expect(store.select(selectRemainingTime)).toEqual(tea.time);
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

describe('loadTea', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('load the tea and its timer', async () => {
    const tea = createTea();
    store.teaGateway.teas = [tea];
    store.teaGateway.timerId = '9';

    await store.dispatch(loadTea({ teaId: tea.id }));

    expect(store.select(selectTea)).toEqual(tea);
    expect(store.select(selectRemainingTime)).toEqual(0);
    expect(store.select(selectTimerId)).toEqual('9');
  });
});
