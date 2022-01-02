import { Store } from '../tests/store';

import { createTea, createTeas, Tea, TeaData } from './Tea';
import { selectTeas, setTeas } from './tea.slice';
import { addTea, editTea, fetchTeas } from './use-cases';

describe('getTeas', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it("get the teas' list", async () => {
    const teas = createTeas();

    store.teaGateway.teas = teas;

    await store.dispatch(fetchTeas());

    expect(store.select(selectTeas)).toEqual(teas);
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

  it('edit a tea', async () => {
    const tea: Tea = createTea();
    store.dispatch(setTeas([tea]));

    const editedTea: Tea = { ...tea, name: 'Edited name' };

    await store.dispatch(editTea(editedTea));

    expect(store.select(selectTeas)).toMatchObject([editedTea]);
  });
});
