import { CountdownId, Seconds } from '../types';

export type CountdownParams = {
  duration: Seconds;
  onTick: () => void;
  onEnd: () => void;
};

export interface CountdownPort {
  start(params: CountdownParams): CountdownId;
  stop(countdownId: CountdownId): void;
}
