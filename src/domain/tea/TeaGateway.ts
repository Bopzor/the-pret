import { Seconds } from '../types';

import { Tea } from './Tea';

export interface TeaGateway extends TeaStoreGateway, TeaTimerGateway {}

export interface TeaStoreGateway {
  getTeas(): Promise<Tea[]>;
  getTea(id: string): Promise<Tea | undefined>;
  saveTea(tea: Tea): Promise<void>;
}

export interface TeaTimerGateway {
  runTimer(duration: Seconds, onEnd?: () => void): number;
  cancelTimer(timerId: number): void;
}
