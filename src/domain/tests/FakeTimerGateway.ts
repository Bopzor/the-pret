import { IntervalParams, TimerGateway } from '../timer/TimerGateway';

export class FakeTimerGateway implements TimerGateway {
  intervalId: number | null = null;
  duration: number | null = null;
  startTimestamp: number | null = null;
  onTick: (() => void) | null = null;
  onEnd: (() => void) | null = null;

  start(params: IntervalParams) {
    this.intervalId = 1;

    this.startTimestamp = params.startTimestamp;
    this.duration = params.duration;
    this.onTick = params.onTick;
    this.onEnd = params.onEnd;

    return this.intervalId;
  }

  pause(_intervalId: number) {
    this.intervalId = null;
  }

  clear(_intervalId: number) {
    this.intervalId = null;
    this.onTick = null;
    this.onEnd = null;
  }

  runInterval(now: number) {
    if (!this.startTimestamp || !this.duration || !this.onTick || !this.onEnd) {
      throw new Error('Not started');
    }

    if (this.startTimestamp + this.duration * 1000 >= now) {
      this.onTick();
    } else {
      this.onEnd();
    }
  }
}
