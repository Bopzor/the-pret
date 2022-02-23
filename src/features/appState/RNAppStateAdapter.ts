import { AppState as RNAppState, AppStateStatus } from 'react-native';

import { AppState, AppStatePort } from './AppStatePort';

export class RNAppStateAdapter implements AppStatePort {
  listeners: ((state: AppStateStatus) => void)[] = [];

  addEventListener(state: AppState, listener: (state: AppState) => void): void {
    RNAppState.addEventListener('change', (nextAppChange: AppStateStatus) => {
      const nextAppState = nextAppChange === 'active' ? AppState.active : AppState.background;

      if (nextAppState === state) {
        listener(nextAppState);
      }

      this.listeners.push((state: AppStateStatus) => {
        const appState = state === 'active' ? AppState.active : AppState.background;

        listener(appState);
      });
    });
  }

  removeAllEventListener(): void {
    for (const listener of this.listeners) {
      RNAppState.removeEventListener('change', listener);
    }

    this.listeners = [];
  }
}
