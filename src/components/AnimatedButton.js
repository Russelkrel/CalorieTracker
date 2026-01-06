import { useRef, useState } from 'react';
import {
    Animated,
    Pressable
} from 'react-native';

const AnimatedButton = ({
  onPress,
  children,
  style,
  disabled = false,
  ...props
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [isHovered, setIsHovered] = useState(false);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.94,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: isHovered ? 1.08 : 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
      Animated.spring(scaleValue, {
        toValue: 1.08,
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
        {
          transform: [{ scale: scaleValue }],
        },
      ]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[style, { flex: 1 }]}
        {...props}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

export default AnimatedButton;
