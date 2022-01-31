import { createTea, Tea } from '../tea/Tea';
import { TeaStoreGateway } from '../tea/TeaStoreGateway';
import { TeaTimerGateway, TeaTimerParams, TeaTimerPayload, TeaTimerRegistrationParams } from '../tea/TeaTimerGateway';

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
  timerId?: string;
  payload?: TeaTimerPayload;
  onTimerEnd?: (timerId: string, payload: TeaTimerPayload) => Promise<void>;

  async saveTimer(id: string): Promise<void> {
    this.timerId = id;
  }

  async loadTimer(): Promise<string | null> {
    return this.timerId ?? null;
  }

  async runTimer(
    notification: TeaTimerParams,
    onTimerEnd: (timerId: string, payload: TeaTimerPayload) => Promise<void>,
  ): Promise<string> {
    this.timerId = '9';
    this.payload = notification.payload;

    this.onTimerEnd = onTimerEnd;

    return new Promise((res) => res(this.timerId!.toString()));
  }

  async clearTimer(_timerId: string) {
    this.timerId = undefined;
  }

  async endTimer(): Promise<void> {
    if (!this.timerId || !this.onTimerEnd || !this.payload) {
      throw new Error('Missing tea timer initialization');
    }

    await this.onTimerEnd(this.timerId, this.payload);
  }
}
