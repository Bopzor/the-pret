import { registerRootComponent } from 'expo';

import { Provider } from 'react-redux';

import App from './App';
import { RNAppStateAdapter } from './features/appState/RNAppStateAdapter';
import { UICountdownAdapter } from './features/countdown/UICountdownAdapter';
import { DateAdapter } from './features/DateAdapter';
import { AsyncTeaStorageAdapter } from './features/teas/AsyncTeaStorageAdapter';
import { createStore } from './store';

const teaStorage = new AsyncTeaStorageAdapter();

const store = createStore({
  teaStorage,
  countdown: new UICountdownAdapter(),
  date: new DateAdapter(),
  appState: new RNAppStateAdapter(),
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(() => (
  <Provider store={store}>
    <App />
  </Provider>
));
