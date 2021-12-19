import { Store } from '../tests/store';

import { createTeas } from './Tea';
import { getTeas } from './use-cases';

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
});
