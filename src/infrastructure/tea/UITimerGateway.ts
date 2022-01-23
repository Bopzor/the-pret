import { TimerGateway } from '../../domain/timer/TimerGateway';

export class UITimerGateway implements TimerGateway {
  interval = 0;
  callback: (() => void) | null = null;

  startInterval(decreaseRemainingTime: () => void, interval: number): number {
    this.interval = interval;

    const intervalId = setInterval(decreaseRemainingTime, interval * 1000) as unknown as number;

    return intervalId;
  }

  pauseInterval(intervalId: number): void {
    clearInterval(intervalId);
  }

  resume(): number {
    if (!this.callback) {
      throw new Error('something wrong happened. setInterval callback is missing');
    }

    const intervalId = setInterval(this.callback, this.interval * 1000) as unknown as number;

    return intervalId;
  }

  stopInterval(intervalId: number): void {
    clearInterval(intervalId);
  }
}
