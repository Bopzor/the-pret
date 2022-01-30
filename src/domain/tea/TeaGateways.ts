import { Seconds } from '../types';

import { Tea } from './Tea';

export interface TeaStoreGateway {
  getTeas(): Promise<Tea[]>;
  getTea(id: string): Promise<Tea | undefined>;
  saveTea(tea: Tea): Promise<void>;
}

export interface TeaTimerGateway {
  runTimer(duration: Seconds, teaId: string): Promise<string>;
  cancelTimer(id: string): Promise<void>;

  listenForegroundTimer(onReceivedNotification: (timerId: string, teaId: string) => void): () => void;
  listenBackgroundTimer(callback: (timerId: string, teaId: string) => void): () => void;

  loadTimer(): Promise<string | null>;
  saveTimer(id: string): Promise<void>;
}
