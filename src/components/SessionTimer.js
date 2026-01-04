import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, spacing } from '../styles/theme';

const SessionTimer = ({ startTime, onEndSession }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(startTime);
      const seconds = Math.floor((now - start) / 1000);
      setElapsed(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;

  const formatTime = (h, m, s) => {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handlePress = () => {
    console.log('End Session button pressed');
    onEndSession();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerLabel}>Session Time</Text>
      <Text style={styles.timer}>{formatTime(hours, minutes, seconds)}</Text>
      <TouchableOpacity
        style={styles.endButtonContainer}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text style={styles.endButtonText}>End Session</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#FF9500',
  },
  timerLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF9500',
    marginBottom: spacing.lg,
    fontFamily: 'Courier New',
  },
  endButtonContainer: {
    backgroundColor: '#FF6347',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  endButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SessionTimer;
