import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../styles/theme';
import { calculateCaloriePercentage, calculateRemainingCalories } from '../utils/helpers';

export const CalorieProgress = ({ consumed, goal }) => {
  const percentage = calculateCaloriePercentage(consumed, goal);
  const remaining = calculateRemainingCalories(consumed, goal);
  const progressWidth = Math.min(percentage, 100);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Progress</Text>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progressWidth}%`,
              backgroundColor:
                percentage > 100 ? colors.error : colors.primary,
            },
          ]}
        />
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Consumed</Text>
          <Text style={styles.statValue}>{consumed}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Goal</Text>
          <Text style={styles.statValue}>{goal}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Remaining</Text>
          <Text style={[
            styles.statValue,
            { color: percentage > 100 ? colors.error : colors.success },
          ]}>
            {remaining}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderTopWidth: 2,
    borderTopColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  percentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
});
