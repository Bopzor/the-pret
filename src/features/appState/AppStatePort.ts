export type AppState = 'active' | 'background';

export interface AppStatePort {
  addEventListener(state: AppState, listener: (state: string) => void): void;
  removeAllEventListener(): void;
}
