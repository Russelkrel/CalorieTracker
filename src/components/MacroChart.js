import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { colors, spacing } from '../styles/theme';

export const MacroChart = ({ protein = 0, carbs = 0, fat = 0 }) => {
  const total = protein + carbs + fat;
  
  // Avoid division by zero
  if (total === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Macronutrients</Text>
        <Text style={styles.emptyText}>No meals logged yet</Text>
      </View>
    );
  }

  const chartData = [
    {
      name: 'Protein',
      population: protein,
      color: colors.primary,
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Carbs',
      population: carbs,
      color: colors.secondary,
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Fat',
      population: fat,
      color: '#FF6B9D',
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Macronutrients Breakdown</Text>
      
      <PieChart
        data={chartData}
        width={320}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          backgroundColor: colors.surface,
          backgroundGradientFrom: colors.surface,
          backgroundGradientTo: colors.surface,
        }}
        accessor="population"
        backgroundColor={colors.surface}
        paddingLeft="0"
        hasLegend={true}
      />

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Protein</Text>
          <Text style={[styles.statValue, { color: colors.primary }]}>{protein}g</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Carbs</Text>
          <Text style={[styles.statValue, { color: colors.secondary }]}>{carbs}g</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Fat</Text>
          <Text style={[styles.statValue, { color: '#FF6B9D' }]}>{fat}g</Text>
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
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopColor: colors.border,
    borderTopWidth: 1,
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
  },
});
