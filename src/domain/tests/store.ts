import { createStore } from '../store';

import { FakeTimerGateway } from './FakeTimerGateway';
import { ImMemoryIdGateway } from './InMemoryIdGateway';
import { ImMemoryTeaGateway } from './InMemoryTeaGateway';

type InMemoryDependencies = {
  idGateway: ImMemoryIdGateway;
  teaGateway: ImMemoryTeaGateway;
  timerGateway: FakeTimerGateway;
};

export class Store {
  deps: InMemoryDependencies = {
    idGateway: new ImMemoryIdGateway(),
    teaGateway: new ImMemoryTeaGateway(),
    timerGateway: new FakeTimerGateway(),
  };

  private store = createStore<InMemoryDependencies>(this.deps);

  getState = this.store.getState;

  dispatch = this.store.dispatch;

  get teaGateway() {
    return this.deps.teaGateway;
  }

  get timerGateway() {
    return this.deps.timerGateway;
  }
}
