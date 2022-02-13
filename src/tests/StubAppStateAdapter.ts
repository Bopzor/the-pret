import { AppStatePort } from '../features/appState/AppStatePort';

export class StubAppStateAdapter implements AppStatePort {
  onActiveListener: ((state: string) => void)[] = [];
  onBackgroundListener: ((state: string) => void)[] = [];

  addEventListener(state: 'active' | 'background', listener: (state: string) => void): void {
    if (state === 'active') {
      this.onActiveListener.push(listener);
    }

    if (state === 'background') {
      this.onBackgroundListener.push(listener);
    }
  }

  removeAllEventListener(): void {
    this.onActiveListener = [];
    this.onBackgroundListener = [];
  }

  onActive() {
    for (const listener of this.onActiveListener) {
      listener('active');
    }
  }

  onBackground() {
    for (const listener of this.onBackgroundListener) {
      listener('background');
    }
  }
}
