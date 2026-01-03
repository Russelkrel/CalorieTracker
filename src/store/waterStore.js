import { create } from 'zustand';
import { storageService } from '../services/storageService';
import { getTodayDate } from '../utils/helpers';

export const useWaterStore = create((set) => ({
  waterLogs: [],
  todayWater: [],
  settings: {
    dailyGoal: 3000, // ml
    enableHourlyReminders: true,
    enableCustomReminders: true,
    customReminderTimes: ['09:00', '12:00', '15:00', '18:00'], // HH:mm format
  },
  loading: false,
  error: null,

  // Initialize store with persisted data
  initializeStore: async () => {
    set({ loading: true });
    try {
      const waterLogs = await storageService.getWaterLogs();
      const waterSettings = await storageService.getWaterSettings();
      set({
        waterLogs: waterLogs || [],
        settings: waterSettings || {
          dailyGoal: 3000,
          enableHourlyReminders: true,
          enableCustomReminders: true,
          customReminderTimes: ['09:00', '12:00', '15:00', '18:00'],
        },
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Get today's water intake
  getTodayWater: async () => {
    try {
      const today = getTodayDate();
      const todayWater = await storageService.getWaterLogsByDate(today);
      set({ todayWater: todayWater || [] });
      return todayWater;
    } catch (err) {
      set({ error: err.message });
    }
  },

  // Add water intake
  addWaterIntake: async (amount) => {
    set({ loading: true });
    try {
      const waterLog = {
        id: Date.now().toString(),
        amount,
        date: getTodayDate(),
        timestamp: new Date().toISOString(),
      };
      const savedLog = await storageService.saveWaterLog(waterLog);
      set((state) => ({
        waterLogs: [...state.waterLogs, savedLog],
        todayWater: [...state.todayWater, savedLog],
        loading: false,
        
      }));
      return savedLog;
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Remove water intake
  removeWaterIntake: async (id) => {
    set({ loading: true });
    try {
      await storageService.deleteWaterLog(id);
      set((state) => ({
        waterLogs: state.waterLogs.filter((log) => log.id !== id),
        todayWater: state.todayWater.filter((log) => log.id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Update water settings
  updateSettings: async (newSettings) => {
    set({ loading: true });
    try {
      const updatedSettings = { ...newSettings };
      await storageService.saveWaterSettings(updatedSettings);
      set({ settings: updatedSettings, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Get today's total water intake
  getTodayTotal: (state) => {
    return state.todayWater.reduce((total, log) => total + log.amount, 0);
  },

  // Get daily goal
  getDailyGoal: (state) => {
    return state.settings.dailyGoal;
  },
}));
