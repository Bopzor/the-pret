import { AppDispatch, AppSelector, createStore } from '../store';

import { DateAdapter } from './DateAdapter';
import { InMemoryCountdownAdapter } from './InMemoryCountdownAdapter';
import { InMemoryTeaStorageAdapter } from './InMemoryTeaStorageAdapter';

class Store {
  store;
  teaStorage: InMemoryTeaStorageAdapter;
  countdown: InMemoryCountdownAdapter;
  date: DateAdapter;

  constructor() {
    this.countdown = new InMemoryCountdownAdapter();
    this.teaStorage = new InMemoryTeaStorageAdapter();
    this.date = new DateAdapter();

    this.store = createStore({ countdown: this.countdown, teaStorage: this.teaStorage, date: this.date });
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
