import { AppSelector, createStore } from '../store';

import { FakeTimerGateway } from './FakeTimerGateway';
import { ImMemoryIdGateway } from './InMemoryIdGateway';
import { InMemoryTeaStoreGateway, InMemoryTeaTimerGateway } from './InMemoryTeaGateway';

type InMemoryDependencies = {
  idGateway: ImMemoryIdGateway;
  teaStoreGateway: InMemoryTeaStoreGateway;
  teaTimerGateway: InMemoryTeaTimerGateway;
  timerGateway: FakeTimerGateway;
};

export class Store {
  deps: InMemoryDependencies = {
    idGateway: new ImMemoryIdGateway(),
    teaStoreGateway: new InMemoryTeaStoreGateway(),
    teaTimerGateway: new InMemoryTeaTimerGateway(),
    timerGateway: new FakeTimerGateway(),
  };

  private store = createStore<InMemoryDependencies>(this.deps);

  getState = this.store.getState;

  dispatch = this.store.dispatch;

  select<T>(selector: AppSelector<T>): T {
    return selector(this.getState());
  }

  get teaStoreGateway() {
    return this.deps.teaStoreGateway;
  }

  get teaTimerGateway() {
    return this.deps.teaTimerGateway;
  }

  get timerGateway() {
    return this.deps.timerGateway;
  }
}
