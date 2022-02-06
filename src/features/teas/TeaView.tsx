import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../reduxAppHooks';
import { stopCountdown } from '../countdown/countdown';
import CountdownView from '../countdown/CountdownView';

import { startTeaCountdown } from './teas';
import { selectTea, selectTeaStartedAtTimestamp } from './teasSlice';

const TeaView: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const tea = useAppSelector((state) => selectTea(state, id));
  const startedTimestamp = useAppSelector((state) => selectTeaStartedAtTimestamp(state, id));

  const onStart = () => {
    dispatch(startTeaCountdown(id));
  };

  useEffect(() => {
    if (startedTimestamp) {
      dispatch(startTeaCountdown(id));
    }

    return () => dispatch(stopCountdown());
  }, [id]);

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
      <CountdownView onStart={onStart} />
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
