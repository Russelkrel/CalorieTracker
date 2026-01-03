import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../styles/theme';

const WaterProgressChart = ({ current, goal, percentage }) => {
  const remaining = Math.max(goal - current, 0);

  return (
    <View style={styles.container}>
      {/* Progress Circle */}
      <View style={styles.chartContainer}>
        <View style={styles.circleBackground}>
          <View
            style={[
              styles.circleProgress,
              {
                height: `${percentage}%`,
              },
            ]}
          />
          <View style={styles.circleContent}>
            <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
            <Text style={styles.current}>
              {current}ml
            </Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Consumed</Text>
          <Text style={styles.statValue}>{current}ml</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Goal</Text>
          <Text style={styles.statValue}>{goal}ml</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Remaining</Text>
          <Text style={styles.statValue}>{remaining}ml</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  circleBackground: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.surface,
    borderWidth: 3,
    borderColor: '#0099FF',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    position: 'relative',
  },
  circleProgress: {
    width: '100%',
    backgroundColor: '#00D9FF',
    opacity: 0.6,
  },
  circleContent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00D9FF',
  },
  current: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#00D9FF',
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
    color: '#00D9FF',
  },
});

export default WaterProgressChart;
