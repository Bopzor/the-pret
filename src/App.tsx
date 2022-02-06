import { StyleSheet, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { Provider } from 'react-redux';

import CountdownView from './features/countdown/CountdownView';
import { UICountdownAdapter } from './features/countdown/UICountdownAdapter';
import { createStore } from './store';

const store = createStore({
  countdown: new UICountdownAdapter(),
});

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <CountdownView />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
