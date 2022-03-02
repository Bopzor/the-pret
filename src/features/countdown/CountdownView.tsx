import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useAppSelector } from '../../reduxAppHooks';
import { CircleProgress, Text } from '../../ui/';
import theme from '../../ui/theme';
import { selectTeaRemainingTimeDisplay } from '../teas/teasSlice';

import { selectIsRunning } from './countdownSlice';
import { PlayIcon, StopIcon } from './SvgIcons';

type CountdownViewProps = {
  onStart: () => void;
  onStop: () => void;
};

const radius = 150;

const CountdownView: React.FC<CountdownViewProps> = ({ onStart, onStop }) => {
  // TODO: get tea id from route
  const remainingTeaTimeDisplay = useAppSelector((state) => selectTeaRemainingTimeDisplay(state, 'tea-1'));
  const isRunning = useAppSelector(selectIsRunning);

  const handleOnPress = () => {
    if (isRunning) {
      onStop();
    } else {
      onStart();
    }
  };

  return (
    <View>
      <CircleProgress radius={radius} strokeWidth={25}>
        <View style={styles.countdownIndication}>
          <Text style={styles.remainingTime}>{remainingTeaTimeDisplay}</Text>
          <TouchableOpacity onPress={handleOnPress}>
            {isRunning ? <StopIcon width={42} height={42} /> : <PlayIcon width={42} height={42} />}
          </TouchableOpacity>
        </View>
      </CircleProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  countdownIndication: {
    alignItems: 'center',
  },
  remainingTime: {
    fontFamily: theme.fontFamily.monospace,
    fontSize: radius / 2,
    textAlign: 'center',
    marginBottom: 30,
  },
});
export default CountdownView;
