import { StyleSheet, View } from 'react-native';

import { TeasListScreenProps } from 'src/ui/navigation.type';

import { useAppSelector } from '../../../reduxAppHooks';
import { selectTeas } from '../teasSlice';

import TeaCard from './TeaCard';

const TeasListScreen: React.FC<TeasListScreenProps> = ({ navigation }) => {
  const teas = useAppSelector(selectTeas);

  const onTeaCardPress = (id: string, name: string) => {
    navigation.navigate('Tea', { id, name });
  };

  return (
    <View style={styles.container}>
      {teas.map((tea) => (
        <TeaCard key={tea.id} tea={tea} onPress={() => onTeaCardPress(tea.id, tea.name)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5,
  },
});

export default TeasListScreen;
