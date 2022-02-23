import { Tea } from '../features/teas/teasSlice';
import { TeaStoragePort } from '../features/teas/TeaStoragePort';

export class InMemoryTeaStorageAdapter implements TeaStoragePort {
  teas: Tea[] = [];

  async loadTeas(): Promise<Tea[]> {
    return this.teas;
  }

  async saveTeaStartedTimestamp(teaId: string, startedTimestamp: number): Promise<void> {
    const idx = this.teas.findIndex((tea) => tea.id === teaId);

    // prettier-ignore
    this.teas = [
      ...this.teas.slice(0, idx),
      { ...this.teas[idx], startedTimestamp },
      ...this.teas.slice(idx + 1),
    ];
  }

  async saveTeaNotificationId(teaId: string, notificationId: string | null): Promise<void> {
    const idx = this.teas.findIndex((tea) => tea.id === teaId);

    // prettier-ignore
    this.teas = [
      ...this.teas.slice(0, idx),
      { ...this.teas[idx], notificationId },
      ...this.teas.slice(idx + 1),
    ];
  }
}
