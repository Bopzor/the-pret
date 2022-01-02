import { Seconds } from '../types';

export interface TimerGateway {
  start(callback: () => unknown, duration: Seconds): Promise<void>;
  pause(): void;
  resume(remainingTime: Seconds): Promise<void>;
  now(): Seconds;
}
