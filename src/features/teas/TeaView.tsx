import { StyleSheet, Text, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../reduxAppHooks';
import CountdownView from '../countdown/CountdownView';

import { startTeaCountdown, stopTeaCountdown } from './teas';
import { selectTea } from './teasSlice';

const TeaView: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const tea = useAppSelector((state) => selectTea(state, id));

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
    <View>
      <Text>
        <Text style={styles.label}>tea:</Text> {tea.name}
      </Text>
      <Text>
        <Text style={styles.label}>started at:</Text>{' '}
        {tea.startedTimestamp ? new Date(tea.startedTimestamp).toISOString() : 'not started'}
      </Text>
      <CountdownView onStart={onStart} onStop={onStop} />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: '700',
  },
});

export default TeaView;
