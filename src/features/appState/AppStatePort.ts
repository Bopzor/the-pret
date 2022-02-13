export type AppState = 'active' | 'background';

export interface AppStatePort {
  addEventListener(state: AppState, listener: (state: string) => Promise<void>): void;
  removeAllEventListener(): void;
}
