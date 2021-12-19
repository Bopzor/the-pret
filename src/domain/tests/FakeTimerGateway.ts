import { TimerGateway } from '../timer/TimerGateway';

export class FakeTimerGateway implements TimerGateway {
  timer?: () => unknown;

  now(current = 0) {
    return current;
  }

  getRemainingTime(startedAt: number, duration: number): number {
    const now = this.now();
    const passed = now - startedAt;

    const remaining = duration - passed;

    return remaining > 0 ? remaining : 0;
  }

  async start(callback: () => unknown, _ms: number) {
    this.timer = callback;
  }

  end() {
    const result = this.timer?.();

    this.timer = undefined;

    return result;
  }
}
