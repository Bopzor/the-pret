import { Seconds } from '../types';

export interface TimerGateway {
  start(callback: () => unknown, duration: Seconds): Promise<void>;
  getRemainingTime(startedAt: Seconds, duration: Seconds): Seconds;
  now(): Seconds;
}
