import { Tea } from '../features/teas/teasSlice';
import { TeaStoragePort } from '../features/teas/TeaStoragePort';

export class InMemoryTeaStorageAdapter implements TeaStoragePort {
  teas: Tea[] = [];

  async loadTeas(): Promise<Tea[]> {
    return this.teas;
  }
}
