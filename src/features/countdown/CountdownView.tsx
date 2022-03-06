import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { CircleProgress, Text } from 'src/ui/';

import { useAppSelector } from '../../reduxAppHooks';
import { selectTeaDuration, selectTeaRemainingTimeDisplay } from '../teas/teasSlice';

import { selectIsRunning, selectRemainingTime } from './countdownSlice';
import { PlayIcon, StopIcon } from './SvgIcons';

type CountdownViewProps = {
  onStart: () => void;
  onStop: () => void;
};

const radius = 150;

const CountdownView: React.FC<CountdownViewProps> = ({ onStart, onStop }) => {
  // TODO: get tea id from route
  const remainingTeaTimeDisplay = useAppSelector((state) => selectTeaRemainingTimeDisplay(state, 'tea-1'));
  const remainingTime = useAppSelector((state) => selectRemainingTime(state));
  const duration = useAppSelector((state) => selectTeaDuration(state, 'tea-1'));
  const isRunning = useAppSelector(selectIsRunning);

  const percentage = 100 - ((remainingTime ? remainingTime : duration) * 100) / duration;

  const handleOnPress = () => {
    if (isRunning) {
      onStop();
    } else {
      onStart();
    }
  };

  return (
    <View>
      <CircleProgress radius={radius} strokeWidth={20} percentage={percentage}>
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
    fontSize: radius / 1.5,
    textAlign: 'center',
    marginBottom: 20,
  },
});
export default CountdownView;
