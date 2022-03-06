import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Tea: { id: string; name: string };
};

export type TeaScreenProps = NativeStackScreenProps<RootStackParamList, 'Tea'>;
export type TeasListScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
