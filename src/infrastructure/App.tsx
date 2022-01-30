import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { Provider } from 'react-redux';

import { createStore } from '../domain/store';
import { createTea } from '../domain/tea/Tea';
import { loadTea } from '../domain/tea/use-cases/tea';
import { addTeaTimer, loadTeaTimer } from '../domain/tea/use-cases/tea-timer';
import { ImMemoryIdGateway } from '../domain/tests/InMemoryIdGateway';
import { InMemoryTeaStoreGateway } from '../domain/tests/InMemoryTeaGateway';

import { ExpoNotificationTeaTimeGateway } from './tea/TeaGateways';
import TeaView from './tea/TeaView';
import { UITimerGateway } from './tea/UITimerGateway';

const teaStoreGateway = new InMemoryTeaStoreGateway();

teaStoreGateway.teas = [createTea({ id: 'tea-1', name: 'TEST TEA', time: 5 })];

const teaTimerGateway = new ExpoNotificationTeaTimeGateway();

const store = createStore({
  teaStoreGateway,
  teaTimerGateway,
  timerGateway: new UITimerGateway(),
  idGateway: new ImMemoryIdGateway(),
});

const App = () => {
  useEffect(() => {
    const received = teaTimerGateway.listenForegroundTimer((timerId: string, _teaId: string) => {
      store.dispatch(addTeaTimer(timerId));
      store.dispatch(loadTeaTimer());
    });

    const response = teaTimerGateway.listenBackgroundTimer((timerId: string, teaId: string) => {
      store.dispatch(addTeaTimer(timerId));
      store.dispatch(loadTea({ teaId }));
    });

    return () => {
      received();
      response();
    };
  }, []);

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

export default App;
