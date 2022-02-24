import { Seconds } from '../types';

export type NotificationDetails = {
  title: string;
  body: string;
  teaId: string;
  duration: Seconds;
};

export enum NotificationState {
  received,
}

export type NotificationListener = (teaId: string, notificationId?: string) => void;

export interface NotificationsPort {
  scheduleNotification(notificationDetails: NotificationDetails): Promise<string>;
  addListener(notificationState: NotificationState, listener: NotificationListener): void;
  removeAllListeners(): void;
  cancelScheduledNotification(notificationId: string): Promise<void>;
  dismissNotification(notificationId: string): Promise<void>;
}
