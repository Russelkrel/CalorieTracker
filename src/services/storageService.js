import AsyncStorage from '@react-native-async-storage/async-storage';

const MEALS_KEY = '@calorie_tracker/meals';
const USER_SETTINGS_KEY = '@calorie_tracker/settings';
const IMAGES_KEY = '@calorie_tracker/images';
const WATER_LOGS_KEY = '@calorie_tracker/water_logs';
const WATER_SETTINGS_KEY = '@calorie_tracker/water_settings';
const HEART_RATE_SESSIONS_KEY = '@calorie_tracker/heart_rate_sessions';
const HEART_RATE_SETTINGS_KEY = '@calorie_tracker/heart_rate_settings';

export const storageService = {
  // Meal operations
  async saveMeal(meal) {
    try {
      const existingMeals = await this.getAllMeals();
      const updatedMeals = [...existingMeals, { ...meal, id: Date.now().toString() }];
      await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(updatedMeals));
      return meal;
    } catch (error) {
      console.error('Error saving meal:', error);
      throw error;
    }
  },

  async getAllMeals() {
    try {
      const meals = await AsyncStorage.getItem(MEALS_KEY);
      return meals ? JSON.parse(meals) : [];
    } catch (error) {
      console.error('Error fetching meals:', error);
      return [];
    }
  },

  async getMealsByDate(date) {
    try {
      const meals = await this.getAllMeals();
      const targetDate = new Date(date);
      targetDate.setHours(0, 0, 0, 0);

      return meals.filter((meal) => {
        const mealDate = new Date(meal.createdAt);
        mealDate.setHours(0, 0, 0, 0);
        return mealDate.getTime() === targetDate.getTime();
      });
    } catch (error) {
      console.error('Error fetching meals by date:', error);
      return [];
    }
  },

  async deleteMeal(mealId) {
    try {
      const existingMeals = await this.getAllMeals();
      const updatedMeals = existingMeals.filter((meal) => meal.id !== mealId);
      await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(updatedMeals));
    } catch (error) {
      console.error('Error deleting meal:', error);
      throw error;
    }
  },

  // Settings operations
  async saveSettings(settings) {
    try {
      await AsyncStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  },

  async getSettings() {
    try {
      const settings = await AsyncStorage.getItem(USER_SETTINGS_KEY);
      return settings
        ? JSON.parse(settings)
        : {
            dailyCalorieGoal: 2000,
            darkMode: true,
            preferredUnits: 'metric',
          };
    } catch (error) {
      console.error('Error fetching settings:', error);
      return {
        dailyCalorieGoal: 2000,
        darkMode: true,
        preferredUnits: 'metric',
      };
    }
  },

  // Image operations
  async saveImage(imageUri, mealId) {
    try {
      const images = await this.getAllImages();
      const updatedImages = [...images, { uri: imageUri, mealId }];
      await AsyncStorage.setItem(IMAGES_KEY, JSON.stringify(updatedImages));
    } catch (error) {
      console.error('Error saving image:', error);
    }
  },

  async getAllImages() {
    try {
      const images = await AsyncStorage.getItem(IMAGES_KEY);
      return images ? JSON.parse(images) : [];
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  },

  // Water operations
  async saveWaterLog(waterLog) {
    try {
      const existingLogs = await this.getWaterLogs();
      const updatedLogs = [...existingLogs, waterLog];
      await AsyncStorage.setItem(WATER_LOGS_KEY, JSON.stringify(updatedLogs));
      return waterLog;
    } catch (error) {
      console.error('Error saving water log:', error);
      throw error;
    }
  },

  async getWaterLogs() {
    try {
      const logs = await AsyncStorage.getItem(WATER_LOGS_KEY);
      return logs ? JSON.parse(logs) : [];
    } catch (error) {
      console.error('Error fetching water logs:', error);
      return [];
    }
  },

  async getWaterLogsByDate(date) {
    try {
      const logs = await this.getWaterLogs();
      const targetDate = new Date(date);
      targetDate.setHours(0, 0, 0, 0);

      return logs.filter((log) => {
        const logDate = new Date(log.date);
        logDate.setHours(0, 0, 0, 0);
        return logDate.getTime() === targetDate.getTime();
      });
    } catch (error) {
      console.error('Error fetching water logs by date:', error);
      return [];
    }
  },

  async deleteWaterLog(logId) {
    try {
      const existingLogs = await this.getWaterLogs();
      const updatedLogs = existingLogs.filter((log) => log.id !== logId);
      await AsyncStorage.setItem(WATER_LOGS_KEY, JSON.stringify(updatedLogs));
    } catch (error) {
      console.error('Error deleting water log:', error);
      throw error;
    }
  },

  async saveWaterSettings(settings) {
    try {
      await AsyncStorage.setItem(WATER_SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving water settings:', error);
      throw error;
    }
  },

  async getWaterSettings() {
    try {
      const settings = await AsyncStorage.getItem(WATER_SETTINGS_KEY);
      return settings
        ? JSON.parse(settings)
        : {
            dailyGoal: 3000,
            enableHourlyReminders: true,
            enableCustomReminders: true,
            customReminderTimes: ['09:00', '12:00', '15:00', '18:00'],
          };
    } catch (error) {
      console.error('Error fetching water settings:', error);
      return {
        dailyGoal: 3000,
        enableHourlyReminders: true,
        enableCustomReminders: true,
        customReminderTimes: ['09:00', '12:00', '15:00', '18:00'],
      };
    }
  },

  // Heart rate operations
  async saveHeartRateSession(session) {
    try {
      const existingSessions = await this.getHeartRateSessions();
      const updatedSessions = [...existingSessions, session];
      await AsyncStorage.setItem(HEART_RATE_SESSIONS_KEY, JSON.stringify(updatedSessions));
      return session;
    } catch (error) {
      console.error('Error saving heart rate session:', error);
      throw error;
    }
  },

  async getHeartRateSessions() {
    try {
      const sessions = await AsyncStorage.getItem(HEART_RATE_SESSIONS_KEY);
      return sessions ? JSON.parse(sessions) : [];
    } catch (error) {
      console.error('Error fetching heart rate sessions:', error);
      return [];
    }
  },

  async getHeartRateSessionsByDate(date) {
    try {
      const sessions = await this.getHeartRateSessions();
      const targetDate = new Date(date);
      targetDate.setHours(0, 0, 0, 0);

      return sessions.filter((session) => {
        const sessionDate = new Date(session.date);
        sessionDate.setHours(0, 0, 0, 0);
        return sessionDate.getTime() === targetDate.getTime();
      });
    } catch (error) {
      console.error('Error fetching heart rate sessions by date:', error);
      return [];
    }
  },

  async deleteHeartRateSession(sessionId) {
    try {
      const existingSessions = await this.getHeartRateSessions();
      const updatedSessions = existingSessions.filter((session) => session.id !== sessionId);
      await AsyncStorage.setItem(HEART_RATE_SESSIONS_KEY, JSON.stringify(updatedSessions));
    } catch (error) {
      console.error('Error deleting heart rate session:', error);
      throw error;
    }
  },

  async saveHeartRateSettings(settings) {
    try {
      await AsyncStorage.setItem(HEART_RATE_SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving heart rate settings:', error);
      throw error;
    }
  },

  async getHeartRateSettings() {
    try {
      const settings = await AsyncStorage.getItem(HEART_RATE_SETTINGS_KEY);
      return settings
        ? JSON.parse(settings)
        : {
            weight: 70,
            age: 30,
            enableCalorieCalculation: true,
          };
    } catch (error) {
      console.error('Error fetching heart rate settings:', error);
      return {
        weight: 70,
        age: 30,
        enableCalorieCalculation: true,
      };
    }
  },

  async clearAllData() {
    try {
      await AsyncStorage.multiRemove([
        MEALS_KEY,
        IMAGES_KEY,
        WATER_LOGS_KEY,
        HEART_RATE_SESSIONS_KEY,
      ]);
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  },
};
