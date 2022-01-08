import { TimerGateway } from '../timer/TimerGateway';
import { Seconds } from '../types';

export class FakeTimerGateway implements TimerGateway {
  intervalId: number | null = null;
  callback: (() => void) | null = null;

  now(current = 0) {
    return current;
  }

  startInterval(decreaseRemainingTime: () => void, _interval: Seconds) {
    this.intervalId = 1;
    this.callback = decreaseRemainingTime;

    return this.intervalId;
  }

  pauseInterval(_intervalId: number) {
    this.intervalId = null;
  }

  resume() {
    this.intervalId = 2;

    return this.intervalId;
  }

  stopInterval(_intervalId: number) {
    this.intervalId = null;
    this.callback = null;
  }

  runInterval() {
    this.callback?.();
  }
}
