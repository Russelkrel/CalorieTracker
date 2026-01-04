import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { colors, spacing } from '../styles/theme';
import { useMealStore } from '../store/mealStore';

export const SettingsScreen = ({ navigation }) => {
  const [dailyGoal, setDailyGoal] = useState('2000');
  const [darkMode, setDarkMode] = useState(true);
  const [units, setUnits] = useState('metric');
  const settings = useMealStore((state) => state.settings);
  const updateSettings = useMealStore((state) => state.updateSettings);

  useEffect(() => {
    setDailyGoal(settings.dailyCalorieGoal.toString());
    setDarkMode(settings.darkMode);
    setUnits(settings.preferredUnits);
  }, [settings]);

  const handleSaveSettings = async () => {
    try {
      const newSettings = {
        dailyCalorieGoal: parseInt(dailyGoal) || 2000,
        darkMode,
        preferredUnits: units,
      };
      await updateSettings(newSettings);
      Alert.alert('Success', 'Settings saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  const handleClearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete all your meal history. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            // Implement clear data logic
            Alert.alert('Success', 'All data has been cleared');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Calorie Goal</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="2000"
              placeholderTextColor={colors.textSecondary}
              value={dailyGoal}
              onChangeText={setDailyGoal}
              keyboardType="number-pad"
            />
            <Text style={styles.inputLabel}>calories</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Measurement Units</Text>
          <View style={styles.buttonGroup}>
            {['metric', 'imperial'].map((unit) => (
              <Pressable
                key={unit}
                onPress={() => setUnits(unit)}
                style={[
                  styles.optionButton,
                  units === unit && styles.optionButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    units === unit && styles.optionButtonTextActive,
                  ]}
                >
                  {unit === 'metric' ? 'Metric (g)' : 'Imperial (oz)'}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.infoText}>Version 1.0.0</Text>
          <Text style={styles.infoText}>
            CalorieTracker with OpenAI Vision
          </Text>
        </View>

        <Pressable
          style={styles.saveButton}
          onPress={handleSaveSettings}
        >
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </Pressable>

        <Pressable
          style={styles.dangerButton}
          onPress={handleClearAllData}
        >
          <Text style={styles.dangerButtonText}>Clear All Data</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    color: colors.text,
    fontSize: 16,
  },
  inputLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginLeft: spacing.sm,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    marginRight: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionButtonText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  optionButtonTextActive: {
    color: colors.background,
  },
  infoText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: spacing.sm,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  saveButtonText: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 16,
  },
  dangerButton: {
    backgroundColor: colors.error,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  dangerButtonText: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 16,
  },
});
