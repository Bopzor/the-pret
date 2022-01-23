import React from 'react';
import { StyleSheet, View } from 'react-native';

import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';

import { Provider } from 'react-redux';

import { createStore } from '../domain/store';
import { createTea } from '../domain/tea/Tea';
import { ImMemoryIdGateway } from '../domain/tests/InMemoryIdGateway';

import { TeaGateway } from './tea/TeaGateway';
import TeaView from './tea/TeaView';
import { UITimerGateway } from './tea/UITimerGateway';

const teaGateway = new TeaGateway();

teaGateway.teas = [createTea({ id: 'tea-1', name: 'TEST TEA', time: 5 })];

const store = createStore({
  teaGateway,
  timerGateway: new UITimerGateway(),
  idGateway: new ImMemoryIdGateway(),
});

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <TeaView id="tea-1" />
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

export default registerRootComponent(App);
