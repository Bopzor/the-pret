import { registerRootComponent } from 'expo';

import { Provider } from 'react-redux';

import App from './App';
import { RNAppStateAdapter } from './features/appState/RNAppStateAdapter';
import { UICountdownAdapter } from './features/countdown/UICountdownAdapter';
import { DateAdapter } from './features/DateAdapter';
import { ExpoNotificationsAdapter } from './features/notifications/ExpoNotificationsAdapter.1';
import { AsyncTeaStorageAdapter } from './features/teas/AsyncTeaStorageAdapter';
import { createStore } from './store';

const teaStorage = new AsyncTeaStorageAdapter();

const store = createStore({
  teaStorage,
  countdown: new UICountdownAdapter(),
  date: new DateAdapter(),
  appState: new RNAppStateAdapter(),
  notifications: new ExpoNotificationsAdapter(),
});

registerRootComponent(() => (
  <Provider store={store}>
    <App />
  </Provider>
));
