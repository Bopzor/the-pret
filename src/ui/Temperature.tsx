import { StyleSheet, View } from 'react-native';

import { Text } from './Text';
import theme from './theme';

type TemperatureProps = {
  value: number;
  unit: string;
  size?: 'medium' | 'large';
};

const SIZES = {
  temperature: {
    medium: theme.fontSize.medium,
    large: theme.fontSize.large,
  },
  unit: {
    medium: theme.fontSize.medium - theme.fontSize.medium / 2,
    large: theme.fontSize.large - theme.fontSize.large / 2,
  },
};

export const Temperature: React.FC<TemperatureProps> = ({ value, unit, size = 'large' }) => {
  return (
    <View style={styles.temperatureContainer}>
      <Text style={[styles.temperature, { fontSize: SIZES.temperature[size] }]}>{value}</Text>
      <Text style={{ fontSize: SIZES.unit[size] }}>{unit}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  temperatureContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  temperature: {
    textAlign: 'center',
  },
});
