import { registerRootComponent } from 'expo';

import { Provider } from 'react-redux';

import App from './App';
import { UICountdownAdapter } from './features/countdown/UICountdownAdapter';
import { DateAdapter } from './features/DateAdapter';
import { createStore } from './store';
import { createTea } from './tests/factories';
import { InMemoryTeaStorageAdapter } from './tests/InMemoryTeaStorageAdapter';

const teaStorage = new InMemoryTeaStorageAdapter();
teaStorage.teas = [createTea()];

const store = createStore({
  teaStorage,
  countdown: new UICountdownAdapter(),
  date: new DateAdapter(),
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(() => (
  <Provider store={store}>
    <App />
  </Provider>
));
