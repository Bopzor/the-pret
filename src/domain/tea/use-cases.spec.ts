import { Store } from '../tests/store';

import { createTea, createTeas, Tea, TeaData } from './Tea';
import { setTeas } from './tea.slice';
import { addTea, editTea, getTeas } from './use-cases';

describe('getTeas', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it("get the teas' list", async () => {
    const teas = createTeas();

    store.teaGateway.teas = teas;

    await store.dispatch(getTeas());

    const state = store.getState();

    expect(state.teas.teas).toMatchObject(teas);
  });

  it('creates a tea', async () => {
    const tea: TeaData = {
      name: 'name',
      brand: 'brand',
      temperature: 80,
      time: 180,
    };

    await store.dispatch(addTea(tea));

    const state = store.getState();

    const createdTea = createTea(tea);
    expect(state.teas.teas).toMatchObject([createdTea]);
  });

  it('edit a tea', async () => {
    const tea: Tea = createTea();
    store.dispatch(setTeas([tea]));

    const editedTea: Tea = { ...tea, name: 'Edited name' };

    await store.dispatch(editTea(editedTea));

    const state = store.getState();

    expect(state.teas.teas).toMatchObject([editedTea]);
  });
});
