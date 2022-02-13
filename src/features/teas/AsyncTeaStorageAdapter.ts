import AsyncStorage from '@react-native-async-storage/async-storage';

import { createTea as fakeCreateTea } from '../../tests/factories';

import { createTea } from './creatTea';
import { Tea } from './teasSlice';
import { TeaStoragePort } from './TeaStoragePort';

const tempTeas = [fakeCreateTea()];

export class AsyncTeaStorageAdapter implements TeaStoragePort {
  async loadTeas(): Promise<Tea[]> {
    try {
      const teas = await AsyncStorage.getItem('teas-list');

      console.log('loaded tea', teas);

      if (!teas) {
        // TODO: this is temporary. Must load from `.json` if exist
        console.log('load from inMemory');
        await AsyncStorage.setItem('tea-list', JSON.stringify([]));
        return tempTeas;
      }

      return JSON.parse(teas).map(createTea);
    } catch (error) {
      console.error(error);
      throw new Error('error from load teas');
    }
  }

  async saveTeaStartedTimestamp(teaId: string, startedTimestamp: number | null): Promise<void> {
    await this.updateTea(teaId, { startedTimestamp });
  }

  private async updateTea(teaId: string, changes: Partial<Tea>): Promise<void> {
    const teas = await this.loadTeas();
    const teaIdx = teas.findIndex((tea) => tea.id === teaId);

    if (teaIdx < 0) {
      throw Error(`tea with id ${teaId} not found`);
    }

    // prettier-ignore
    const updatedTeas = [
      ...teas.slice(0, teaIdx),
      {...teas[teaIdx], ...changes},
      ...teas.slice(teaIdx + 1),
    ];

    await AsyncStorage.setItem('teas-list', JSON.stringify(updatedTeas));
  }
}
