import {
  NotificationDetails,
  NotificationListener,
  NotificationsPort,
  NotificationState,
} from '../features/notifications/NotificationsPort';

export class StubNotificationsAdapter implements NotificationsPort {
  scheduled?: NotificationDetails;
  receivedListener: NotificationListener[] = [];

  async scheduleNotification(notificationDetails: NotificationDetails): Promise<string> {
    this.scheduled = notificationDetails;

    return `${notificationDetails.teaId}-${notificationDetails.duration}`;
  }

  addListener(notificationState: NotificationState, listener: NotificationListener): void {
    if (notificationState === NotificationState.received) {
      this.receivedListener.push(listener);
    }
  }

  removeAllListeners(): void {
    this.receivedListener = [];
  }

  onReceived(teaId: string) {
    for (const listener of this.receivedListener) {
      listener(teaId);
    }
  }
}
