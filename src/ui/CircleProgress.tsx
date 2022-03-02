import { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';

import Svg, { Circle, G } from 'react-native-svg';

type CircleProgressProps = {
  radius?: number;
  percentage?: number;
  strokeWidth?: number;
  color?: string;
};

export const CircleProgress: React.FC<CircleProgressProps> = ({
  radius = 40,
  percentage = 75,
  strokeWidth = 10,
  color = 'green',
  children,
}) => {
  const [contentHeight, setContentHeight] = useState(0);

  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const strokeDashOffset = circleCircumference - (circleCircumference * percentage) / 100;

  const handleOnLayout = (event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  };

  return (
    <View>
      <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeOpacity={0.2}
          />

          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circleCircumference}
            strokeDashoffset={strokeDashOffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>

      <View style={{ ...StyleSheet.absoluteFillObject, top: contentHeight / 2 }} onLayout={handleOnLayout}>
        {children}
      </View>
    </View>
  );
};
