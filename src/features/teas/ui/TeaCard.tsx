import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Temperature, Text } from 'src/ui';
import theme from 'src/ui/theme';

import { useAppSelector } from '../../../reduxAppHooks';
import { selectTeaRemainingTimeDisplay, selectTeaTemperatureCelsius, Tea } from '../teasSlice';

type TeaCardProps = {
  tea: Tea;
  onPress: () => void;
};

const TeaCard: React.FC<TeaCardProps> = ({ tea, onPress }) => {
  const temperature = useAppSelector((state) => selectTeaTemperatureCelsius(state, tea.id));
  const duration = useAppSelector((state) => selectTeaRemainingTimeDisplay(state, tea.id));

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, styles.shadow]}>
        <Text style={styles.name}>{tea.name}</Text>
        <Text style={styles.brand}>{tea.brand}</Text>

        <View style={styles.bottom}>
          <Text style={styles.duration}>{duration}</Text>
          <Temperature size="medium" {...temperature} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 3,
    height: 140,
    width: 160,
    margin: 5,
    padding: 8,
    justifyContent: 'space-between',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
  },
  name: {
    textAlign: 'center',
    fontSize: theme.fontSize.medium,
  },
  brand: {
    color: theme.palette.textLight,
    fontSize: theme.fontSize.base,
    fontFamily: theme.fontStyle.italic,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  duration: {
    fontSize: theme.fontSize.medium,
  },
});

export default TeaCard;
