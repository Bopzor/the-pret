import { StyleSheet, View } from 'react-native';

import { Temperature, Text } from 'src/ui';
import { TeaScreenProps } from 'src/ui/navigation.type';
import theme from 'src/ui/theme';

import { useAppDispatch, useAppSelector } from '../../../reduxAppHooks';
import CountdownView from '../../countdown/CountdownView';
import { startTeaCountdown, stopTeaCountdown } from '../teas';
import { selectTeaTemperatureCelsius, selectTeaUnsafe } from '../teasSlice';

const TeaScreen: React.FC<TeaScreenProps> = ({ route }) => {
  const dispatch = useAppDispatch();
  const tea = useAppSelector((state) => selectTeaUnsafe(state, route.params.id));
  const temperature = useAppSelector((state) => selectTeaTemperatureCelsius(state, route.params.id));

  const onStart = async () => {
    await dispatch(startTeaCountdown(route.params.id));
  };

  const onStop = async () => {
    await dispatch(stopTeaCountdown(route.params.id));
  };

  if (!tea) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{tea.name}</Text>
        <Text style={styles.brand}>{tea.brand}</Text>
      </View>

      <CountdownView onStart={onStart} onStop={onStop} />

      <Temperature {...temperature} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
  },
  name: {
    textAlign: 'center',
    fontSize: theme.fontSize.large,
  },
  brand: {
    color: theme.palette.textLight,
    fontSize: theme.fontSize.medium,
    fontFamily: theme.fontStyle.italic,
  },
});

export default TeaScreen;
