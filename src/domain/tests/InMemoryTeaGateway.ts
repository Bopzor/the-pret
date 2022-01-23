import { createTea, Tea } from '../tea/Tea';
import { TeaGateway } from '../tea/TeaGateway';

export class ImMemoryTeaGateway implements TeaGateway {
  private _teas: Tea[] = [];
  timerId: string | null = null;
  callback: (() => void) | null = null;

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

  async saveTimer(id: string): Promise<void> {
    this.timerId = id;
  }

  async loadTimer(): Promise<string | null> {
    return this.timerId;
  }

  async runTimer(_duration: number, onEnd?: () => void): Promise<string> {
    this.callback = onEnd ?? null;
    this.timerId = '9';

    return new Promise((res) => res(this.timerId!.toString()));
  }

  async cancelTimer(_timerId: string) {
    this.timerId = null;
  }

  endTimer() {
    this.callback?.();
    this.timerId = null;
  }
}
