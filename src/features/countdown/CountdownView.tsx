import { Button, StyleSheet, Text, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../reduxAppHooks';

import { stopCountdown } from './countdown';
import { selectCountdownId, selectIsReady, selectIsRunning, selectRemainingTime } from './countdownSlice';

type CountdownViewProps = {
  onStart: () => void;
};

const CountdownView: React.FC<CountdownViewProps> = ({ onStart }) => {
  const countdownId = useAppSelector(selectCountdownId);
  const remainingTime = useAppSelector(selectRemainingTime);
  const isReady = useAppSelector(selectIsReady);
  const isRunning = useAppSelector(selectIsRunning);

  const dispatch = useAppDispatch();

  const handleOnPress = () => {
    if (isRunning) {
      dispatch(stopCountdown());
    } else {
      onStart();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>
          <Text style={styles.label}>CountdownId:</Text> {String(countdownId)}
        </Text>
        <Text>
          <Text style={styles.label}>RemainingTime:</Text> {String(remainingTime)}
        </Text>
        <Text>
          <Text style={styles.label}>isReady:</Text> {String(isReady)}
        </Text>
      </View>

      <Button onPress={handleOnPress} title={isRunning ? 'stop' : 'start'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  textContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: '700',
  },
});

export default CountdownView;
