import { DatePort } from './DatePort';

export class DateAdapter implements DatePort {
  now(): number {
    return Date.now();
  }
}
