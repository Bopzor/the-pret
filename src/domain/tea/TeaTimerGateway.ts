import { Seconds } from '../types';

export type TeaTimerPayload = {
  teaId: string;
};

export type TeaTimerParams = {
  title: string;
  duration: Seconds;
  body?: string;
  payload: TeaTimerPayload;
};

export interface TeaTimerGateway {
  runTimer(
    notification: TeaTimerParams,
    onTimerEnd: (timerId: string, payload: TeaTimerPayload) => Promise<void>,
  ): Promise<string>;
  clearTimer(id: string): Promise<void>;

  // registerTimer(params: TeaTimerRegistrationParams): void;
  // clearRegistrationTimer(timerId: string): void;

  loadTimer(): Promise<string | null>;
  saveTimer(id: string): Promise<void>;
}
