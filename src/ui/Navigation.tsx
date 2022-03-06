import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TeaScreen from '../features/teas/ui/TeaScreen';
import TeasListScreen from '../features/teas/ui/TeasListScreen';

import { RootStackParamList } from './navigation.type';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => (
  <NavigationContainer>
    <Navigator initialRouteName="Home">
      <Screen name="Home" component={TeasListScreen} />
      <Screen
        name="Tea"
        options={({ route }) => ({
          title: route.params.name,
        })}
        component={TeaScreen}
      />
    </Navigator>
  </NavigationContainer>
);
