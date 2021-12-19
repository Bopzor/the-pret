import { Tea } from './Tea';

export interface TeaGateway {
  getTeas(): Promise<Tea[]>;
}
