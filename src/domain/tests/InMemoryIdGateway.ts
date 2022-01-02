import { IdGateway } from '../IdGateway';

export class ImMemoryIdGateway implements IdGateway {
  nextId = 'tea-1';

  id() {
    return this.nextId;
  }
}
