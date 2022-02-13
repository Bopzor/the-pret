import { AppState as RNAppState, AppStateStatus } from 'react-native';

import { AppStatePort } from './AppStatePort';

export class RNAppStateAdapter implements AppStatePort {
  listeners: ((state: string) => Promise<void>)[] = [];

  addEventListener(state: AppStateStatus, listener: (state: string) => Promise<void>): void {
    RNAppState.addEventListener('change', (nextAppChange: AppStateStatus) => {
      console.log('nextAppChange', nextAppChange);

      if (nextAppChange === state) {
        listener(state);
      }
    });

    this.listeners.push(listener);
  }

  removeAllEventListener(): void {
    for (const listener of this.listeners) {
      RNAppState.removeEventListener('change', listener);
    }

    this.listeners = [];
  }
}
