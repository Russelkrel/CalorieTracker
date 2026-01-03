import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../styles/theme';

export const NutritionBadge = ({ protein, carbs, fat }) => {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.label}>Protein</Text>
        <Text style={styles.value}>{protein}g</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.label}>Carbs</Text>
        <Text style={styles.value}>{carbs}g</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.label}>Fat</Text>
        <Text style={styles.value}>{fat}g</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: spacing.md,
  },
  badge: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
