import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

import { TeaTimerGateway, TeaTimerParams, TeaTimerPayload } from '../../domain/tea/TeaTimerGateway';

export class ExpoNotificationTeaTimeGateway implements TeaTimerGateway {
  timerId?: string;
  foregroundListener?: Subscription;
  backgroundListener?: Subscription;

  async runTimer(
    { title, body, payload, duration }: TeaTimerParams,
    onTimerEnd: (timerId: string, payload: TeaTimerPayload) => Promise<void>,
  ): Promise<string> {
    this.foregroundListener = this.listenForegroundTimer(onTimerEnd);
    this.backgroundListener = this.listenBackgroundTimer(onTimerEnd);

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
        title,
        body,
        autoDismiss: true,
        data: payload,
      },
      trigger: {
        seconds: duration,
        channelId,
      },
    });
  }

  async clearTimer(id: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(id);
    await this.foregroundListener?.remove();
    await this.backgroundListener?.remove();
  }

  async saveTimer(id: string): Promise<void> {
    this.timerId = id;
  }

  async loadTimer(): Promise<string | null> {
    return this.timerId ?? null;
  }

  private listenForegroundTimer(
    onTimerEnd: (timerId: string, payload: TeaTimerPayload) => Promise<void>,
  ): Subscription {
    return Notifications.addNotificationReceivedListener((notification) => {
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
          console.log('received');
          if (typeof notification.request.content.data.teaId === 'string') {
            onTimerEnd(notificationId, notification.request.content.data as TeaTimerPayload);
          }

          await Notifications.dismissNotificationAsync(notificationId);
        },
        handleError: (notification) => {
          console.log('error', notification);
        },
      });
    });
  }

  private listenBackgroundTimer(
    onTimerEnd: (timerId: string, payload: TeaTimerPayload) => Promise<void>,
  ): Subscription {
    return Notifications.addNotificationResponseReceivedListener((response) => {
      if (typeof response.notification.request.content.data.teaId === 'string') {
        onTimerEnd(
          response.notification.request.identifier,
          response.notification.request.content.data as TeaTimerPayload,
        );
      }
    });
  }
}
