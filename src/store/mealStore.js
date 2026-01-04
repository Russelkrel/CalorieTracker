import { create } from 'zustand';
import { storageService } from '../services/storageService';
import { getTodayDate } from '../utils/helpers';

export const useMealStore = create((set) => ({
  meals: [],
  todayMeals: [],
  settings: {
    dailyCalorieGoal: 2000,
    darkMode: true,
    preferredUnits: 'metric',
  },
  loading: false,
  error: null,

  // Initialize store with persisted data
  initializeStore: async () => {
    set({ loading: true });
    try {
      const meals = await storageService.getAllMeals();
      const settings = await storageService.getSettings();
      set({
        meals,
        settings,
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Get today's meals
  getTodayMeals: async () => {
    try {
      const today = getTodayDate();
      const todayMeals = await storageService.getMealsByDate(today);
      set({ todayMeals });
      return todayMeals;
    } catch (err) {
      set({ error: err.message });
    }
  },

  // Add a new meal
  addMeal: async (meal) => {
    set({ loading: true });
    try {
      const savedMeal = await storageService.saveMeal(meal);
      set((state) => ({
        meals: [...state.meals, savedMeal],
        loading: false,
      }));
      // Refresh today's meals
      const today = getTodayDate();
      const todayMeals = await storageService.getMealsByDate(today);
      set({ todayMeals });
      return savedMeal;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  // Delete a meal
  deleteMeal: async (mealId) => {
    set({ loading: true });
    try {
      await storageService.deleteMeal(mealId);
      set((state) => ({
        meals: state.meals.filter((m) => m.id !== mealId),
        todayMeals: state.todayMeals.filter((m) => m.id !== mealId),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  // Update settings
  updateSettings: async (newSettings) => {
    set({ loading: true });
    try {
      await storageService.saveSettings(newSettings);
      set({
        settings: newSettings,
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  // Get total calories for today
  getTodayCalories: () => {
    const state = useMealStore.getState();
    return state.todayMeals.reduce(
      (total, meal) => total + (meal.totalCalories || 0),
      0
    );
  },

  // Clear error
  clearError: () => set({ error: null }),
}));
