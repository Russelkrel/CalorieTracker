import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useHeartRateStore } from '../store/heartRateStore';
import { colors, spacing } from '../styles/theme';
import AnimatedButton from './AnimatedButton';

const HeartRateSettingsModal = ({ visible, onClose, onSave }) => {
  const settings = useHeartRateStore((state) => state.settings);
  const updateSettings = useHeartRateStore((state) => state.updateSettings);
  
  const [weight, setWeight] = useState(settings.weight.toString());
  const [age, setAge] = useState(settings.age.toString());
  const [enableCalories, setEnableCalories] = useState(
    settings.enableCalorieCalculation
  );

  const handleSaveSettings = async () => {
    const w = parseInt(weight) || 70;
    const a = parseInt(age) || 30;

    if (w < 20 || w > 300) {
      Alert.alert('Invalid Weight', 'Please enter a weight between 20 and 300 kg');
      return;
    }

    if (a < 10 || a > 120) {
      Alert.alert('Invalid Age', 'Please enter an age between 10 and 120');
      return;
    }

    const newSettings = {
      weight: w,
      age: a,
      enableCalorieCalculation: enableCalories,
    };

    try {
      await updateSettings(newSettings);
      Alert.alert('Success', 'Settings updated!');
      if (onSave) onSave();
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Heart Rate Settings</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeBtn}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Weight */}
        <View style={styles.section}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            keyboardType="number-pad"
            placeholder="70"
          />
        </View>

        {/* Age */}
        <View style={styles.section}>
          <Text style={styles.label}>Age (years)</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
            placeholder="30"
          />
        </View>

        {/* Calorie Calculation */}
        <View style={styles.section}>
          <View style={styles.switchRow}>
            <Text style={styles.label}>Calculate Calories Burned</Text>
            <Switch
              value={enableCalories}
              onValueChange={setEnableCalories}
              trackColor={{ false: colors.border, true: '#FF9500' }}
              thumbColor={enableCalories ? '#FF6347' : colors.textSecondary}
            />
          </View>
          <Text style={styles.description}>
            Uses Karvonen formula based on your weight and age
          </Text>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>📊 How Calories are Calculated</Text>
          <Text style={styles.infoText}>
            • Based on your weight, age, and average heart rate{'\n'}
            • Uses Karvonen formula for intensity{'\n'}
            • More accurate with consistent readings during sessions
          </Text>
        </View>

        {/* Save Button */}
        <AnimatedButton
          style={styles.saveButton}
          onPress={handleSaveSettings}
        >
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </AnimatedButton>

        <View style={{ height: spacing.lg }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  closeBtn: {
    fontSize: 24,
    color: colors.text,
  },
  section: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#FF9500',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
    fontSize: 14,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoBox: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#FF9500',
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF9500',
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  saveButton: {
    marginHorizontal: spacing.md,
    backgroundColor: '#FF9500',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default React.memo(HeartRateSettingsModal);
