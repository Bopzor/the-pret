import { Seconds } from '../types';

export interface TimerGateway {
  startInterval(decreaseRemainingTime: () => void, interval: Seconds): number;
  pauseInterval(intervalId: number): void;
  resume(): number;
  stopInterval(intervalId: number): void;
  now(): Seconds;
}
