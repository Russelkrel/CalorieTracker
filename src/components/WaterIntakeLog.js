import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing } from '../styles/theme';

const WaterIntakeLog = ({ log, onRemove }) => {
  const time = new Date(log.timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <View style={styles.logItem}>
      <View style={styles.logContent}>
        <Text style={styles.logAmount}>💧 {log.amount}ml</Text>
        <Text style={styles.logTime}>{time}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
        <Text style={styles.deleteIcon}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logItem: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 3,
    borderLeftColor: '#00D9FF',
  },
  logContent: {
    flex: 1,
  },
  logAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00D9FF',
    marginBottom: spacing.xs,
  },
  logTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  deleteIcon: {
    fontSize: 18,
    color: colors.text,
    fontWeight: 'bold',
  },
});

export default WaterIntakeLog;
