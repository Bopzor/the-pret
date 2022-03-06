import { useEffect } from 'react';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { listenAppState, removeAppStateListener } from './features/appState/appState';
import { listenNotifications, removeNotificationsListener } from './features/notifications/notifications';
import { loadTeas } from './features/teas/teas';
import { useAppDispatch } from './reduxAppHooks';
import { Navigation } from './ui/Navigation';

const App = () => {
  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
    'Lato-Italic': require('../assets/fonts/Lato/Lato-LightItalic.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato/Lato-Bold.ttf'),
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
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
