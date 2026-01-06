import { create } from 'zustand';
import { storageService } from '../services/storageService';
import { getTodayDate } from '../utils/helpers';

export const useHeartRateStore = create((set) => ({
  sessions: [],
  todaySessions: [],
  currentSession: null,
  settings: {
    weight: 70, // kg
    age: 30,
    enableCalorieCalculation: true,
  },
  loading: false,
  error: null,

  // Initialize store
  initializeStore: async () => {
    set({ loading: true });
    try {
      const sessions = await storageService.getHeartRateSessions();
      const settings = await storageService.getHeartRateSettings();
      set({
        sessions: sessions || [],
        settings: settings || {
          weight: 70,
          age: 30,
          enableCalorieCalculation: true,
        },
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Get today's sessions
  getTodaySessions: async () => {
    try {
      const today = getTodayDate();
      const todaySessions = await storageService.getHeartRateSessionsByDate(today);
      set({ todaySessions: todaySessions || [] });
      return todaySessions;
    } catch (err) {
      set({ error: err.message });
    }
  },

  // Start a new session
  startSession: () => {
    const newSession = {
      id: Date.now().toString(),
      date: getTodayDate(),
      startTime: new Date().toISOString(),
      endTime: null,
      heartRateReadings: [],
      duration: 0,
      caloriesBurned: 0,
    };
    console.log('Store: Creating new session:', newSession);
    set({ currentSession: newSession });
  },

  // Add heart rate reading to current session
  addHeartRateReading: (bpm) => {
    useHeartRateStore.setState((state) => {
      if (!state.currentSession) return state;
      return {
        currentSession: {
          ...state.currentSession,
          heartRateReadings: [
            ...state.currentSession.heartRateReadings,
            {
              bpm,
              timestamp: new Date().toISOString(),
            },
          ],
        },
      };
    });
  },

  // End current session and save
  endSession: async () => {
    const state = useHeartRateStore.getState();
    if (!state.currentSession) return;

    const endTime = new Date();
    const startTime = new Date(state.currentSession.startTime);
    const durationMinutes = (endTime - startTime) / (1000 * 60);

    // Calculate average heart rate
    const avgHeartRate =
      state.currentSession.heartRateReadings.length > 0
        ? Math.round(
            state.currentSession.heartRateReadings.reduce((sum, r) => sum + r.bpm, 0) /
              state.currentSession.heartRateReadings.length
          )
        : 0;

    // Calculate calories burned (Karvonen formula approximation)
    let caloriesBurned = 0;
    if (state.settings.enableCalorieCalculation && avgHeartRate > 0) {
      const maxHeartRate = 220 - state.settings.age;
      const heartRateReserve = maxHeartRate - 60; // Resting HR assumed ~60
      const intensity = (avgHeartRate - 60) / heartRateReserve;
      caloriesBurned = Math.round(
        ((0.6 * intensity + 0.4) * 5 * state.settings.weight * durationMinutes) / 60
      );
    }

    const completedSession = {
      ...state.currentSession,
      endTime: endTime.toISOString(),
      duration: Math.round(durationMinutes),
      avgHeartRate,
      maxHeartRate:
        state.currentSession.heartRateReadings.length > 0
          ? Math.max(...state.currentSession.heartRateReadings.map((r) => r.bpm))
          : 0,
      minHeartRate:
        state.currentSession.heartRateReadings.length > 0
          ? Math.min(...state.currentSession.heartRateReadings.map((r) => r.bpm))
          : 0,
      caloriesBurned,
    };

    // Update state first
    useHeartRateStore.setState({
      currentSession: null,
      sessions: [...state.sessions, completedSession],
    });

    // Then save to storage
    try {
      await storageService.saveHeartRateSession(completedSession);
    } catch (error) {
      console.error('Error saving session to storage:', error);
    }
  },

  // Cancel current session
  cancelSession: () => {
    set({ currentSession: null });
  },

  // Delete session
  deleteSession: async (sessionId) => {
    try {
      await storageService.deleteHeartRateSession(sessionId);
      set((state) => ({
        sessions: state.sessions.filter((s) => s.id !== sessionId),
        todaySessions: state.todaySessions.filter((s) => s.id !== sessionId),
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },

  // Delete all today's sessions
  deleteAllTodaySessions: async () => {
    try {
      const state = useHeartRateStore.getState();
      for (const session of state.todaySessions) {
        await storageService.deleteHeartRateSession(session.id);
      }
      set({
        sessions: [],
        todaySessions: [],
      });
    } catch (err) {
      set({ error: err.message });
    }
  },

  // Update settings
  updateSettings: async (newSettings) => {
    set({ loading: true });
    try {
      const updatedSettings = { ...newSettings };
      await storageService.saveHeartRateSettings(updatedSettings);
      set({ settings: updatedSettings, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Get session stats
  getSessionStats: (state) => {
    if (state.todaySessions.length === 0) {
      return {
        totalSessions: 0,
        totalDuration: 0,
        totalCalories: 0,
        avgHeartRate: 0,
      };
    }

    return {
      totalSessions: state.todaySessions.length,
      totalDuration: state.todaySessions.reduce((sum, s) => sum + s.duration, 0),
      totalCalories: state.todaySessions.reduce((sum, s) => sum + s.caloriesBurned, 0),
      avgHeartRate: Math.round(
        state.todaySessions.reduce((sum, s) => sum + s.avgHeartRate, 0) /
          state.todaySessions.length
      ),
    };
  },
}));
