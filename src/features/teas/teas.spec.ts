import { createTea } from '../../tests/factories';
import Store from '../../tests/Store';
import { selectRemainingTime } from '../countdown/countdownSlice';

import { endTeaCountdown, loadTeas, startTeaCountdown, stopTeaCountdown } from './teas';
import {
  selectTeaIsReady,
  selectTeaNotificationId,
  selectTeas,
  selectTeaStartedAtTimestamp,
  setTeas,
} from './teasSlice';

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
    expect(() => store.dispatch(startTeaCountdown('tea-1'))).rejects.toThrow('Tea tea-1 not found');
  });

  it('starts the tea countdown', async () => {
    const tea = createTea();
    store.dispatch(setTeas([tea]));
    store.teaStorage.teas = [tea];

    await store.dispatch(startTeaCountdown(tea.id));

    expect(store.select(selectTeaStartedAtTimestamp, tea.id)).toEqual(0);
    expect(store.select(selectTeaNotificationId, tea.id)).toEqual(`${tea.id}-${tea.duration}`);

    expect(store.teaStorage.teas[0].startedTimestamp).toEqual(0);
    expect(store.teaStorage.teas[0].notificationId).toEqual(`${tea.id}-${tea.duration}`);
  });

  it('starts the tea countdown with remaining time according to tea started timestamp', async () => {
    const tea = createTea({ startedTimestamp: 0 });
    store.dispatch(setTeas([tea]));
    store.date.currentNow = 20000;

    await store.dispatch(startTeaCountdown(tea.id));

    expect(store.select(selectRemainingTime)).toEqual(40);
  });
});

describe('stopTeaCountdown', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('stops the tea countdown', async () => {
    const tea = createTea({ startedTimestamp: 0 });
    store.teaStorage.teas = [tea];

    await store.dispatch(stopTeaCountdown(tea.id));

    expect(store.teaStorage.teas[0].startedTimestamp).toBeNull();
    expect(store.teaStorage.teas[0].notificationId).toBeNull();
  });
});
