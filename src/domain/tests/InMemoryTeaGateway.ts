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

  async createTea(tea: Tea): Promise<Tea> {
    return createTea(tea);
  }

  async editTea(tea: Tea): Promise<Tea> {
    return tea;
  }
}
