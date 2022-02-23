import { createTea } from '../../tests/factories';
import Store from '../../tests/Store';
import { selectCountdownId, selectIsRunning, setCountdownId } from '../countdown/countdownSlice';
import { selectTeaStartedAtTimestamp, setTeas } from '../teas/teasSlice';

import { listenAppState, removeAppStateListener } from './appState';

describe('listenAppState', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it("starts tea's countdown on app is active", async () => {
    store.dispatch(setTeas([createTea({ startedTimestamp: 0 })]));

    store.dispatch(listenAppState());

    await store.appState.onActive();

    expect(store.select(selectIsRunning)).toBe(true);
  });

  it('does not start any countdown if no tea is started', async () => {
    store.dispatch(setTeas([createTea({ startedTimestamp: null })]));

    store.dispatch(listenAppState());

    await store.appState.onActive();

    expect(store.select(selectIsRunning)).toBe(false);
  });

  it('stops countdown on app is in background', async () => {
    const tea = createTea({ startedTimestamp: 0 });
    store.dispatch(setTeas([tea]));
    store.dispatch(setCountdownId(1));

    store.dispatch(listenAppState());

    await store.appState.onBackground();

    expect(store.select(selectCountdownId)).toBeNull();
    expect(store.select(selectTeaStartedAtTimestamp, tea.id)).toEqual(0);
  });
});

describe('removeAppStateListener', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('removes listener', () => {
    store.dispatch(setTeas([createTea()]));
    store.dispatch(listenAppState());

    store.dispatch(removeAppStateListener());

    store.appState.onActive();

    expect(store.select(selectIsRunning)).toBe(false);
  });
});
