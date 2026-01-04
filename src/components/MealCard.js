import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, spacing } from '../styles/theme';

export const MealCard = ({ meal, onDelete, onPress }) => {
  const totalCalories = meal.foods.reduce((sum, food) => sum + food.calories, 0);
  const mealTime = new Date(meal.createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.mealType}>{meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)}</Text>
          <Text style={styles.time}>{mealTime}</Text>
        </View>
        <View style={styles.calorieBox}>
          <Text style={styles.calorieText}>{totalCalories}</Text>
          <Text style={styles.calorieLabel}>cal</Text>
        </View>
      </View>

      <View style={styles.foodsList}>
        {meal.foods.map((food, index) => (
          <Text key={index} style={styles.foodItem}>
            • {food.name} ({food.calories} cal)
          </Text>
        ))}
      </View>

      {meal.notes && <Text style={styles.notes}>{meal.notes}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  mealType: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  time: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  calorieBox: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  calorieText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.background,
  },
  calorieLabel: {
    fontSize: 10,
    color: colors.background,
    marginTop: 2,
  },
  foodsList: {
    marginBottom: spacing.md,
  },
  foodItem: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  notes: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
});
