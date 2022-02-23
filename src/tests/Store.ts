import { AppDispatch, AppSelector, createStore } from '../store';

import { DateAdapter } from './DateAdapter';
import { InMemoryCountdownAdapter } from './InMemoryCountdownAdapter';
import { InMemoryTeaStorageAdapter } from './InMemoryTeaStorageAdapter';
import { StubAppStateAdapter } from './StubAppStateAdapter';
import { StubNotificationsAdapter } from './StubNotificationsAdapter';

class Store {
  store;
  teaStorage: InMemoryTeaStorageAdapter;
  countdown: InMemoryCountdownAdapter;
  date: DateAdapter;
  appState: StubAppStateAdapter;
  notifications: StubNotificationsAdapter;

  constructor() {
    this.countdown = new InMemoryCountdownAdapter();
    this.teaStorage = new InMemoryTeaStorageAdapter();
    this.date = new DateAdapter();
    this.appState = new StubAppStateAdapter();
    this.notifications = new StubNotificationsAdapter();

    this.store = createStore({
      countdown: this.countdown,
      teaStorage: this.teaStorage,
      date: this.date,
      appState: this.appState,
      notifications: this.notifications,
    });
  }

  get getState() {
    return this.store.getState;
  }

  get dispatch(): AppDispatch {
    return this.store.dispatch;
  }

  select<Result, Params extends unknown[]>(selector: AppSelector<Result, Params>, ...params: Params) {
    return selector(this.getState(), ...params);
  }
}

export default Store;
