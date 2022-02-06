import { CountdownId } from '../types';

import { CountdownParams, CountdownPort } from './CountdownPort';

export class UICountdownAdapter implements CountdownPort {
  duration?: number;

  start({ duration, onTick, onEnd }: CountdownParams): CountdownId {
    this.duration = duration;

    const countdownId = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (this.duration! > 0) {
        onTick();
      } else {
        onEnd();
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.duration!--;
    }, 1000);

    return countdownId;
  }
  stop(countdownId: CountdownId): void {
    clearInterval(countdownId);
  }
}
