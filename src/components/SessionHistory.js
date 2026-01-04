import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, spacing } from '../styles/theme';

const SessionHistory = ({ session, onDelete }) => {
  const startTime = new Date(session.startTime).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.time}>🏃 {startTime}</Text>
          <Text style={styles.duration}>{session.duration} min</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>HR</Text>
            <Text style={styles.statValue}>
              {session.minHeartRate}-{session.maxHeartRate}
            </Text>
            <Text style={styles.statSubtitle}>avg: {session.avgHeartRate}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Calories</Text>
            <Text style={styles.statValue}>{session.caloriesBurned}</Text>
            <Text style={styles.statSubtitle}>kcal</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Readings</Text>
            <Text style={styles.statValue}>{session.heartRateReadings.length}</Text>
            <Text style={styles.statSubtitle}>samples</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteIcon}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 3,
    borderLeftColor: '#FF9500',
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  duration: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF9500',
  },
  statSubtitle: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: spacing.xs,
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

export default SessionHistory;
