import { createTea } from '../../tests/factories';
import Store from '../../tests/Store';
import { selectTeaIsReady, selectTeaNotificationId, setTeas } from '../teas/teasSlice';

import { listenNotifications, scheduleNotification } from './notifications';

describe('scheduleNotification', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('schedules a notification for given tea', async () => {
    const tea = createTea();
    store.dispatch(setTeas([tea]));

    await store.dispatch(scheduleNotification(tea.id));

    expect(store.select(selectTeaNotificationId, tea.id)).toEqual(`${tea.id}-${tea.duration}`);
    expect(store.notifications.scheduled).toHaveProperty('teaId', tea.id);
  });
});

describe('listenNotifications', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('sets tea is ready on notification received', async () => {
    const tea = createTea({ startedTimestamp: 0, duration: 0 });
    store.dispatch(setTeas([tea]));

    store.dispatch(listenNotifications());

    store.notifications.onReceived(tea.id);

    expect(store.select(selectTeaIsReady, tea.id)).toBe(true);
  });
});
