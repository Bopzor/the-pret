import { createTea, Tea } from '../tea/Tea';
import { TeaGateway } from '../tea/TeaGateway';

export class ImMemoryTeaGateway implements TeaGateway {
  private _teas: Tea[] = [];
  timerId: number | null = null;
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

  runTimer(_duration: number, onEnd?: () => void): number {
    this.callback = onEnd ?? null;
    this.timerId = 9;

    return this.timerId;
  }

  cancelTimer(_timerId: number) {
    this.timerId = null;
  }

  endTimer() {
    this.callback?.();
    this.timerId = null;
  }
}
