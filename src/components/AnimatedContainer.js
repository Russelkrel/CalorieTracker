import { useRef, useState } from 'react';
import {
    Animated
} from 'react-native';

const AnimatedContainer = ({
  children,
  style,
  onPress,
  disabled = false,
  ...props
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [isHovered, setIsHovered] = useState(false);

  const handlePressIn = () => {
    if (onPress) {
      Animated.spring(scaleValue, {
        toValue: 0.96,
        useNativeDriver: true,
        speed: 20,
        bounciness: 8,
      }).start();
    }
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: isHovered ? 1.01 : 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
    if (onPress) {
      onPress();
    }
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
      Animated.spring(scaleValue, {
        toValue: 1.01,
        useNativeDriver: true,
        speed: 20,
        bounciness: 8,
      }).start();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  };

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{ scale: scaleValue }],
        },
      ]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
      {...props}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedContainer;
