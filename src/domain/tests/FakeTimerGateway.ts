import { TimerGateway } from '../timer/TimerGateway';
import { Seconds } from '../types';

export class FakeTimerGateway implements TimerGateway {
  timer?: () => unknown;

  now(current = 0) {
    return current;
  }

  async start(callback: () => unknown, _ms: number) {
    this.timer = callback;
  }

  pause() {
    return;
  }

  async resume(_remainingTime: Seconds) {
    return;
  }

  end() {
    const result = this.timer?.();

    this.timer = undefined;

    return result;
  }
}
