import { createTea, Tea } from '../tea/Tea';
import { TeaStoreGateway, TeaTimerGateway } from '../tea/TeaGateways';
import { Seconds } from '../types';

export class InMemoryTeaStoreGateway implements TeaStoreGateway {
  private _teas: Tea[] = [];

  set teas(t: Tea[]) {
    this._teas = t;
  }

  async getTeas(): Promise<Tea[]> {
    return this._teas;
  }

  async getTea(id: string): Promise<Tea | undefined> {
    return this._teas.find((t) => t.id === id);
  }

  async saveTea(tea: Tea): Promise<void> {
    createTea(tea);
  }
}

export class InMemoryTeaTimerGateway implements TeaTimerGateway {
  timerId: string | null = null;

  async saveTimer(id: string): Promise<void> {
    this.timerId = id;
  }

  async loadTimer(): Promise<string | null> {
    return this.timerId;
  }

  async runTimer(_duration: Seconds, _teaId: string): Promise<string> {
    this.timerId = '9';

    return new Promise((res) => res(this.timerId!.toString()));
  }

  async cancelTimer(_timerId: string) {
    this.timerId = null;
  }

  listenForegroundTimer(_onReceivedNotification: (timerId: string, teaId: string) => void): () => void {
    return () => undefined;
  }

  listenBackgroundTimer(_callback: (timerId: string, teaId: string) => void): () => void {
    return () => undefined;
  }
}
