import { Seconds } from '../types';

export type IntervalParams = {
  duration: Seconds;
  startTimestamp: number;
  onTick(): void;
  onEnd(): void;
};

export interface TimerGateway {
  start(params: IntervalParams): number;
  pause(intervalId: number): void;
  clear(intervalId: number): void;
}
