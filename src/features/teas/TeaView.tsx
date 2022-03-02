import { StyleSheet, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../reduxAppHooks';
import { Text } from '../../ui';
import theme from '../../ui/theme';
import CountdownView from '../countdown/CountdownView';

import { startTeaCountdown, stopTeaCountdown } from './teas';
import { selectTea, selectTeaTemperatureCelsius } from './teasSlice';

const TeaView: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const tea = useAppSelector((state) => selectTea(state, id));
  const temperature = useAppSelector((state) => selectTeaTemperatureCelsius(state, id));

  const onStart = async () => {
    await dispatch(startTeaCountdown(id));
  };

  const onStop = async () => {
    await dispatch(stopTeaCountdown(id));
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

      <View style={styles.temperatureContainer}>
        <Text style={styles.temperature}>{temperature.value}</Text>
        <Text style={styles.unit}>{temperature.unit}</Text>
      </View>
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
    fontFamily: 'Poppins-Italic',
  },
  temperatureContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  temperature: {
    textAlign: 'center',
    fontSize: theme.fontSize.large * 1.5,
    fontFamily: theme.fontFamily.monospace,
  },
  unit: {
    fontSize: theme.fontSize.large - 10,
  },
});
export default TeaView;
