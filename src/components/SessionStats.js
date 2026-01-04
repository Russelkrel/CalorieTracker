import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '../styles/theme';

const SessionStats = ({ sessions }) => {
  if (!sessions || sessions.length === 0) return null;

  const stats = {
    totalSessions: sessions.length,
    totalDuration: sessions.reduce((sum, s) => sum + s.duration, 0),
    totalCalories: sessions.reduce((sum, s) => sum + s.caloriesBurned, 0),
    avgHeartRate: Math.round(
      sessions.reduce((sum, s) => sum + s.avgHeartRate, 0) / sessions.length
    ),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Stats</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Sessions</Text>
          <Text style={styles.statValue}>{stats.totalSessions}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Duration</Text>
          <Text style={styles.statValue}>{stats.totalDuration}m</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Calories</Text>
          <Text style={styles.statValue}>{stats.totalCalories}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Avg HR</Text>
          <Text style={styles.statValue}>{stats.avgHeartRate}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  statBox: {
    width: '48%',
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#FF9500',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF9500',
  },
});

export default SessionStats;
