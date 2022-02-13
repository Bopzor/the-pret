import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { listenAppState, removeAppStateListener } from './features/appState/appState';
import { loadTeas } from './features/teas/teas';
import TeaView from './features/teas/TeaView';
import { useAppDispatch } from './reduxAppHooks';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // TODO: avoid using async await in useEffect
    (async () => await dispatch(loadTeas()))();
    dispatch(listenAppState());

    return () => dispatch(removeAppStateListener());
  }, []);

  return (
    <View style={styles.container}>
      <TeaView id="tea-1" />
      <StatusBar style="auto" />
    </View>
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
