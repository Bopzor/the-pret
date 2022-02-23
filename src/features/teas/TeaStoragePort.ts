import { Tea } from './teasSlice';

export interface TeaStoragePort {
  loadTeas(): Promise<Tea[]>;
  saveTeaStartedTimestamp(teaId: string, startedTimestamp: number | null): Promise<void>;
  saveTeaNotificationId(teaId: string, notificationId: string | null): Promise<void>;
}
