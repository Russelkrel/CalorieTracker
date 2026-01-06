import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedContainer from '../components/AnimatedContainer';
import { CalorieProgress } from '../components/CalorieProgress';
import { MacroChart } from '../components/MacroChart';
import { MealCard } from '../components/MealCard';
import { useMealStore } from '../store/mealStore';
import { colors, spacing } from '../styles/theme';

export const DashboardScreen = ({ navigation }) => {
  const [todayCalories, setTodayCalories] = useState(0);
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fat: 0 });
  const todayMeals = useMealStore((state) => state.todayMeals);
  const settings = useMealStore((state) => state.settings);
  const getTodayMeals = useMealStore((state) => state.getTodayMeals);
  const deleteMeal = useMealStore((state) => state.deleteMeal);
  const getTodayCaloriesCount = useMealStore((state) => state.getTodayCalories);

  useFocusEffect(
    React.useCallback(() => {
      loadTodayMeals();
    }, [])
  );

  const loadTodayMeals = async () => {
    await getTodayMeals();
    setTodayCalories(getTodayCaloriesCount());
    
    // Calculate total macros
    const totalProtein = todayMeals.reduce((sum, meal) => {
      return sum + meal.foods.reduce((foodSum, food) => 
        foodSum + (food.macronutrients?.protein || 0), 0);
    }, 0);
    
    const totalCarbs = todayMeals.reduce((sum, meal) => {
      return sum + meal.foods.reduce((foodSum, food) => 
        foodSum + (food.macronutrients?.carbs || 0), 0);
    }, 0);
    
    const totalFat = todayMeals.reduce((sum, meal) => {
      return sum + meal.foods.reduce((foodSum, food) => 
        foodSum + (food.macronutrients?.fat || 0), 0);
    }, 0);
    
    setMacros({ protein: totalProtein, carbs: totalCarbs, fat: totalFat });
  };

  const handleDeleteMeal = (mealId) => {
    Alert.alert('Delete Meal', 'Are you sure you want to delete this meal?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteMeal(mealId);
          setTodayCalories(getTodayCaloriesCount());
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>CalorieTracker</Text>
        <AnimatedButton onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </AnimatedButton>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AnimatedContainer>
          <CalorieProgress
            consumed={todayCalories}
            goal={settings.dailyCalorieGoal}
          />
        </AnimatedContainer>

        <AnimatedContainer>
          <MacroChart
            protein={macros.protein > 0 ? Math.round(macros.protein) : 30}
            carbs={macros.carbs > 0 ? Math.round(macros.carbs) : 120}
            fat={macros.fat > 0 ? Math.round(macros.fat) : 25}
          />
        </AnimatedContainer>

        <View style={styles.mealsSection}>
          <Text style={styles.sectionTitle}>Today&apos;s Meals</Text>
          {todayMeals.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No meals logged yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Tap the camera to add your first meal
              </Text>
            </View>
          ) : (
            todayMeals.map((meal) => (
              <AnimatedContainer
                key={meal.id}
                style={{ marginBottom: spacing.md }}
              >
                <MealCard
                  meal={meal}
                  onDelete={() => handleDeleteMeal(meal.id)}
                  onPress={() => {
                    // Navigate to meal details if needed
                  }}
                />
              </AnimatedContainer>
            ))
          )}
        </View>
      </ScrollView>

      <AnimatedButton
        style={styles.fab}
        onPress={() => navigation.navigate('Camera')}
      >
        <Text style={styles.fabIcon}>📷</Text>
      </AnimatedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logoContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  logo: {
    width: 110,
    height: 110,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
  },
  settingsIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  mealsSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  emptyStateSubtext: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 32,
  },
});
