import { AppState, AppStatePort } from '../features/appState/AppStatePort';

export class StubAppStateAdapter implements AppStatePort {
  onActiveListener: ((state: AppState.active) => void)[] = [];
  onBackgroundListener: ((state: AppState.background) => void)[] = [];

  addEventListener(state: AppState, listener: (state: AppState) => void): void {
    if (state === AppState.active) {
      this.onActiveListener.push(listener);
    }

    if (state === AppState.background) {
      this.onBackgroundListener.push(listener);
    }
  }

  removeAllEventListener(): void {
    this.onActiveListener = [];
    this.onBackgroundListener = [];
  }

  async onActive() {
    for (const listener of this.onActiveListener) {
      await listener(AppState.active);
    }
  }

  async onBackground() {
    for (const listener of this.onBackgroundListener) {
      await listener(AppState.background);
    }
  }
}
