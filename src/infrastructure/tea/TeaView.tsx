import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../domain/store';
import { selectTea } from '../../domain/tea/tea.slice';
import { loadTea } from '../../domain/tea/use-cases/tea';
import { pauseTeaTimer, runTeaTimer, stopTeaTimer } from '../../domain/tea/use-cases/tea-timer';
import { selectIsFinished, selectIsPaused, selectIsStarted, selectRemainingTime } from '../../domain/timer/timer.slice';

const TeaView = ({ id }: { id: string }) => {
  const dispatch = useDispatch();

  const tea = useSelector((state: RootState) => selectTea(state));

  const remainingTime = useSelector(selectRemainingTime);
  const isStarted = useSelector(selectIsStarted);
  const isPaused = useSelector(selectIsPaused);
  const isFinished = useSelector(selectIsFinished);

  useEffect(() => {
    dispatch(loadTea({ teaId: id }));
  }, []);

  if (!tea) {
    return <Text>...fetching</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>{tea.name}</Text>

      <Text>{remainingTime}</Text>

      <Button
        onPress={() => dispatch(runTeaTimer())}
        title="start timer"
        color="#841584"
        accessibilityLabel="Start a timer"
        disabled={isStarted && !isPaused}
      />

      <Button
        onPress={() => dispatch(pauseTeaTimer())}
        title="Pause timer"
        color="#059343"
        accessibilityLabel="Pause the timer"
        disabled={!isStarted || isPaused || isFinished}
      />

      <Button
        onPress={() => dispatch(stopTeaTimer())}
        title="Stop timer"
        color="#F54433"
        accessibilityLabel="Stop the timer"
        disabled={!isFinished || !isStarted}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TeaView;
