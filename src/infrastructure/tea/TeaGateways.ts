import * as Notifications from 'expo-notifications';

import { TeaTimerGateway } from '../../domain/tea/TeaGateways';
import { Seconds } from '../../domain/types';

export class ExpoNotificationTeaTimeGateway implements TeaTimerGateway {
  timerId: string | null = null;

  async runTimer(duration: Seconds, teaId: string): Promise<string> {
    const channelId = 'test-channel';

    await Notifications.setNotificationChannelAsync(channelId, {
      name: 'Test notif',
      importance: Notifications.AndroidImportance.DEFAULT,
      sound: 'tea_time.mp3',
      enableVibrate: true,
      vibrationPattern: [300, 500],
    });

    return await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time's up!",
        body: 'Change sides!',
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
  }

  async cancelTimer(id: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(id);
  }

  listenForegroundTimer(onReceivedNotification: (timerId: string, teaId: string) => void): () => void {
    const received = Notifications.addNotificationReceivedListener((notification) => {
      Notifications.setNotificationHandler({
        handleNotification: async () => {
          return {
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
            priority: Notifications.AndroidNotificationPriority.DEFAULT,
          };
        },
        handleSuccess: async (notificationId) => {
          if (typeof notification.request.content.data.teaId === 'string') {
            onReceivedNotification(notification.request.identifier, notification.request.content.data.teaId);
          }

          await Notifications.dismissNotificationAsync(notificationId);
        },
        handleError: (notification) => {
          console.log('error', notification);
        },
      });
    });

    return received.remove;
  }

  listenBackgroundTimer(callback: (timerId: string, teaId: string) => void): () => void {
    const response = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('response', response);
      if (typeof response.notification.request.content.data.teaId === 'string') {
        callback(response.notification.request.identifier, response.notification.request.content.data.teaId);
      }
    });

    return response.remove;
  }

  async saveTimer(id: string): Promise<void> {
    this.timerId = id;
  }

  async loadTimer(): Promise<string | null> {
    return this.timerId;
  }
}
