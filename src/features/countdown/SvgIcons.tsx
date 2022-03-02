import Svg, { Path, SvgProps } from 'react-native-svg';

export const PlayIcon = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 73 73" width={24} height={24} {...props}>
    <Path
      d="M66.506 44.946 15.099 71.417C8.777 74.673 1.25 70.082 1.25 62.971V10.029c0-7.112 7.527-11.702 13.85-8.446l51.406 26.471c6.868 3.537 6.868 13.356 0 16.892Z"
      fill="#000"
      stroke="#000"
    />
  </Svg>
);

export const StopIcon = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 73 73" width={24} height={24} {...props}>
    <Path
      d="M0 10C0 4.477 4.477 0 10 0h53c5.523 0 10 4.477 10 10v53c0 5.523-4.477 10-10 10H10C4.477 73 0 68.523 0 63V10Z"
      fill="#000"
    />
  </Svg>
);
