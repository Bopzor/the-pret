import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

import { NotificationDetails, NotificationListener, NotificationsPort, NotificationState } from './NotificationsPort';

const isTeaData = (data: { [key: string]: unknown }): data is { teaId: string } => {
  return typeof data.teaId === 'string';
};

export class ExpoNotificationsAdapter implements NotificationsPort {
  private subscriptions: Subscription[] = [];

  async scheduleNotification({ body, duration, title, teaId }: NotificationDetails): Promise<string> {
    const channelId = `${title}-${teaId}`;

    await Notifications.setNotificationChannelAsync(channelId, {
      name: channelId,
      importance: Notifications.AndroidImportance.DEFAULT,
      sound: 'the_pret.mp3',
      enableVibrate: true,
      vibrationPattern: [300, 500],
    });

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        autoDismiss: true,
        data: {
          teaId,
        },
      },
      trigger: {
        seconds: duration,
        channelId,
      },
    });

    return notificationId;
  }

  addListener(notificationState: NotificationState, listener: NotificationListener): void {
    const received = Notifications.addNotificationReceivedListener((notification) => {
      Notifications.setNotificationHandler({
        handleNotification: async () => {
          return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
            priority: Notifications.AndroidNotificationPriority.DEFAULT,
          };
        },
        handleSuccess: async (notificationId) => {
          if (isTeaData(notification.request.content.data)) {
            listener(notification.request.content.data.teaId, notificationId);
          }
        },
        handleError: (error) => {
          // TODO: handle error
          console.log('error', error);
        },
      });
    });

    this.subscriptions.push(received);
  }

  removeAllListeners(): void {
    for (const subscription of this.subscriptions) {
      subscription.remove();
    }

    this.subscriptions = [];
  }

  async cancelScheduledNotification(notificationId: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }

  async dismissNotification(notificationId: string): Promise<void> {
    await Notifications.dismissNotificationAsync(notificationId);
  }
}
