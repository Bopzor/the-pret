import { StyleSheet, Text as RNText } from 'react-native';

import { Style } from 'tailwind-rn/dist';

import theme from './theme';

type TextProps = {
  style?: Style;
};

export const Text: React.FC<TextProps> = ({ style = [], children }) => {
  const textStyles = Array.isArray(style) ? style : [style];

  return <RNText style={[styles.base, ...textStyles]}>{children}</RNText>;
};

const styles = StyleSheet.create({
  base: {
    color: theme.palette.text,
    fontSize: theme.fontSize.base,
    fontFamily: theme.fontFamily.default,
  },
});
