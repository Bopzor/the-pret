import { Seconds } from '../types';

export type NotificationDetails = {
  teaId: string;
  duration: Seconds;
};

export enum NotificationState {
  received,
}

export type NotificationListener = (teaId: string) => void;

export interface NotificationsPort {
  scheduleNotification(notificationDetails: NotificationDetails): Promise<string>;
  addListener(notificationState: NotificationState, listener: NotificationListener): void;
}
