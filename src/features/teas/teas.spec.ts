import { createTea } from '../../tests/factories';
import Store from '../../tests/Store';
import { selectRemainingTime } from '../countdown/countdownSlice';

import { loadTeas, startTeaCountdown } from './teas';
import { selectTeas, selectTeaStartedAtTimestamp, setTeas } from './teasSlice';

describe('loadTeas', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('loads the teas', async () => {
    const tea = createTea();
    store.teaStorage.teas = [tea];

    await store.dispatch(loadTeas());

    expect(store.select(selectTeas)).toEqual([tea]);
  });
});

describe('startTeaCountdown', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('throws if no tea is found', () => {
    expect(() => store.dispatch(startTeaCountdown('tea-1'))).toThrowError('Tea tea-1 not found');
  });

  it('starts the tea countdown', () => {
    const tea = createTea();
    store.dispatch(setTeas([tea]));

    store.dispatch(startTeaCountdown(tea.id));

    expect(store.select(selectTeaStartedAtTimestamp, tea.id)).toEqual(0);
  });

  it('starts the tea countdown with remaining time according to tea started timestamp', () => {
    const tea = createTea({ startedTimestamp: 0 });
    store.dispatch(setTeas([tea]));
    store.date.currentNow = 20000;

    store.dispatch(startTeaCountdown(tea.id));

    expect(store.select(selectRemainingTime)).toEqual(40);
  });
});
