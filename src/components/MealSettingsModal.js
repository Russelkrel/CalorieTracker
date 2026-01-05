import { useEffect, useState } from 'react';
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useMealStore } from '../store/mealStore';
import { colors, spacing } from '../styles/theme';
import AnimatedButton from './AnimatedButton';

const MealSettingsModal = ({ visible, onClose, onSave }) => {
  const [dailyGoal, setDailyGoal] = useState('2000');
  const [units, setUnits] = useState('metric');
  const settings = useMealStore((state) => state.settings);
  const updateSettings = useMealStore((state) => state.updateSettings);

  useEffect(() => {
    if (settings) {
      setDailyGoal(settings.dailyCalorieGoal.toString());
      setUnits(settings.preferredUnits);
    }
  }, [settings]);

  const handleSaveSettings = async () => {
    try {
      const newSettings = {
        dailyCalorieGoal: parseInt(dailyGoal) || 2000,
        darkMode: settings.darkMode,
        preferredUnits: units,
      };
      await updateSettings(newSettings);
      Alert.alert('Success', 'Calorie settings saved successfully');
      onSave();
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  if (!visible) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calorie Tracker Settings</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeBtn}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Daily Calorie Goal</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="2000"
            placeholderTextColor={colors.textSecondary}
            value={dailyGoal}
            onChangeText={setDailyGoal}
            keyboardType="number-pad"
          />
          <Text style={styles.inputLabel}>kcal</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Measurement Units</Text>
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
        <Text style={styles.label}>About</Text>
        <Text style={styles.infoText}>Version 1.0.0</Text>
        <Text style={styles.infoText}>CalorieTracker with OpenAI Vision</Text>
      </View>

      <AnimatedButton style={styles.saveButton} onPress={handleSaveSettings}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </AnimatedButton>

      <View style={{ height: spacing.lg }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingTop: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  closeBtn: {
    fontSize: 28,
    color: colors.text,
    padding: spacing.sm,
  },
  section: {
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
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
    backgroundColor: colors.background,
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
});

export default MealSettingsModal;
