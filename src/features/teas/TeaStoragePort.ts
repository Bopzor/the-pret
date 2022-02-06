import { Tea } from './teasSlice';

export interface TeaStoragePort {
  loadTeas(): Promise<Tea[]>;
}
