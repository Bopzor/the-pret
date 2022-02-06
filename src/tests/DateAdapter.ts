import { DatePort } from '../features/DatePort';

export class DateAdapter implements DatePort {
  currentNow = 0;

  now() {
    return this.currentNow;
  }
}
