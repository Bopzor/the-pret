import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

import { SafeAreaView } from 'react-native-safe-area-context';

import { listenAppState, removeAppStateListener } from './features/appState/appState';
import { listenNotifications, removeNotificationsListener } from './features/notifications/notifications';
import { loadTeas } from './features/teas/teas';
import TeaView from './features/teas/TeaView';
import { useAppDispatch } from './reduxAppHooks';

const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins: require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Italic': require('../assets/fonts/Poppins/Poppins-LightItalic.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    CourierPrime: require('../assets/fonts/CourierPrime/CourierPrime-Regular.ttf'),
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    // TODO: avoid using async await in useEffect
    (async () => await dispatch(loadTeas()))();
    dispatch(listenAppState());

    return () => dispatch(removeAppStateListener());
  }, []);

  useEffect(() => {
    dispatch(listenNotifications());

    () => dispatch(removeNotificationsListener());
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TeaView id="tea-1" />
      <StatusBar style="auto" />
    </SafeAreaView>
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
