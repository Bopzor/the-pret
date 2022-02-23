import { AppThunkAction } from '../../store';
import { endCountdown } from '../countdown/countdown';
import { selectTea, setTeaIsReady, setTeaNotificationId } from '../teas/teasSlice';

import { NotificationDetails, NotificationState } from './NotificationsPort';

export const scheduleNotification =
  (teaId: string): AppThunkAction<Promise<void>> =>
  async (dispatch, getState, { notifications, teaStorage }) => {
    const tea = selectTea(getState(), teaId);

    //TODO: can be factorized
    if (!tea) {
      throw new Error(`Tea ${teaId} not found`);
    }

    const notificationDetails: NotificationDetails = {
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
    notifications.addListener(NotificationState.received, (teaId: string) => {
      dispatch(setTeaIsReady({ id: teaId, isReady: true }));
      dispatch(endCountdown());
    });
  };
