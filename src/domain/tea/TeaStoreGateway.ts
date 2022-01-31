import { Tea } from './Tea';

export interface TeaStoreGateway {
  getTeas(): Promise<Tea[]>;
  getTea(id: string): Promise<Tea | undefined>;
  saveTea(tea: Tea): Promise<void>;
}
