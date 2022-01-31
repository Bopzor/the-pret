import { IntervalParams, TimerGateway } from '../../domain/timer/TimerGateway';

export class UITimerGateway implements TimerGateway {
  start({ startTimestamp, duration, onTick, onEnd }: IntervalParams) {
    return setInterval(() => {
      if (startTimestamp + duration * 1000 >= Date.now()) {
        onTick();
      } else {
        onEnd();
      }
    }, 1000) as unknown as number;
  }

  pause(intervalId: number) {
    clearInterval(intervalId);
  }

  clear(intervalId: number) {
    clearInterval(intervalId);
  }
}
