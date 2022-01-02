import { createTea, Tea } from '../tea/Tea';
import { TeaGateway } from '../tea/TeaGateway';

export class ImMemoryTeaGateway implements TeaGateway {
  private _teas: Tea[] = [];

  set teas(t: Tea[]) {
    this._teas = t;
  }

  async getTeas(): Promise<Tea[]> {
    return this._teas;
  }

  async saveTea(tea: Tea): Promise<void> {
    createTea(tea);
  }
}
