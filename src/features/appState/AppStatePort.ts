export enum AppState {
  active,
  background,
}

export interface AppStatePort {
  addEventListener(state: AppState, listener: (state: AppState) => void): void;
  removeAllEventListener(): void;
}
