import { AppThunkAction } from '../../store';
import { endCountdown } from '../countdown/countdown';
import { selectTea, setTeaIsReady, setTeaNotificationId } from '../teas/teasSlice';

import { NotificationDetails, NotificationState } from './NotificationsPort';

export const scheduleNotification =
  (teaId: string): AppThunkAction<Promise<void>> =>
  async (dispatch, getState, { notifications, teaStorage }) => {
    const tea = selectTea(getState(), teaId);

    const notificationDetails: NotificationDetails = {
      title: 'Thé Prêt ?',
      body: `${tea.name} est prêt !`,
      teaId: tea.id,
      duration: tea.duration,
    };

    const notificationId = await notifications.scheduleNotification(notificationDetails);

    teaStorage.saveTeaNotificationId(tea.id, notificationId);
    dispatch(setTeaNotificationId({ id: tea.id, notificationId }));
  };

export const listenNotifications =
  (): AppThunkAction<void> =>
  (dispatch, _getState, { notifications }) => {
    notifications.addListener(NotificationState.received, (teaId: string, notificationId?: string) => {
      if (notificationId) {
        dispatch(setTeaNotificationId({ id: teaId, notificationId }));
      }

      dispatch(setTeaIsReady({ id: teaId, isReady: true }));
      dispatch(endCountdown());
    });
  };

export const removeNotificationsListener =
  (): AppThunkAction<void> =>
  (_dispatch, _getState, { notifications }) => {
    notifications.removeAllListeners();
  };
