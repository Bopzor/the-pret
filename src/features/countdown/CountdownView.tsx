import { Button, StyleSheet, Text, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../reduxAppHooks';

import { startCountdown, stopCountdown } from './countdown';
import { selectCountdownId, selectIsReady, selectIsRunning, selectRemainingTime } from './countdownSlice';

const CountdownView: React.FC = () => {
  const countdownId = useAppSelector(selectCountdownId);
  const remainingTime = useAppSelector(selectRemainingTime);
  const isReady = useAppSelector(selectIsReady);
  const isRunning = useAppSelector(selectIsRunning);

  const dispatch = useAppDispatch();

  const handleOnPress = () => {
    if (isRunning) {
      dispatch(stopCountdown());
    } else {
      dispatch(startCountdown(10));
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
