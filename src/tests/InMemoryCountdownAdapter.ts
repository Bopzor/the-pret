import { CountdownParams, CountdownPort } from '../features/countdown/CountdownPort';
import { CountdownId } from '../features/types';

export class InMemoryCountdownAdapter implements CountdownPort {
  private onTick?: CountdownParams['onTick'];
  private onEnd?: CountdownParams['onEnd'];
  private duration?: CountdownParams['duration'];

  start({ duration, onTick, onEnd }: CountdownParams): CountdownId {
    this.onTick = onTick;
    this.onEnd = onEnd;

    this.duration = duration;

    return 1;
  }

  onCountdown(): void {
    if (!this.duration) {
      throw new Error('InMemoryCountdown not started');
    }

    this.duration--;

    if (this.duration > 0) {
      this.onTick?.();
    } else {
      this.onEnd?.();
    }
  }

  stop(_countdownId: CountdownId): void {
    this.onTick = undefined;
    this.onEnd = undefined;
    this.duration = undefined;
  }
}
