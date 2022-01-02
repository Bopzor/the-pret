import { Tea } from './Tea';

export interface TeaGateway {
  getTeas(): Promise<Tea[]>;
  createTea(tea: Tea): Promise<Tea>;
  editTea(tea: Tea): Promise<Tea>;
}
