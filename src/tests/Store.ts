import { AppDispatch, AppSelector, createStore } from '../store';

import { InMemoryCountdownAdapter } from './InMemoryCountdownAdapter';

class Store {
  store;
  countdown: InMemoryCountdownAdapter;

  constructor() {
    this.countdown = new InMemoryCountdownAdapter();
    this.store = createStore({ countdown: this.countdown });
  }

  get getState() {
    return this.store.getState;
  }

  get dispatch(): AppDispatch {
    return this.store.dispatch;
  }

  select<Result, Params extends unknown[]>(selector: AppSelector<Result, Params>) {
    return selector(this.getState());
  }
}

export default Store;
