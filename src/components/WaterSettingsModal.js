import { useState } from 'react';
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
import { notificationService } from '../services/notificationService';
import { useWaterStore } from '../store/waterStore';
import { colors, spacing } from '../styles/theme';
import AnimatedButton from './AnimatedButton';

const WaterSettingsModal = ({ visible, onClose, onSave }) => {
  const { settings, updateSettings } = useWaterStore();
  const [dailyGoal, setDailyGoal] = useState(settings.dailyGoal.toString());
  const [enableHourly, setEnableHourly] = useState(
    settings.enableHourlyReminders
  );
  const [enableCustom, setEnableCustom] = useState(
    settings.enableCustomReminders
  );
  const [customTimes, setCustomTimes] = useState(settings.customReminderTimes);

  const handleSaveSettings = async () => {
    const goal = parseInt(dailyGoal) || 3000;
    const newSettings = {
      dailyGoal: goal,
      enableHourlyReminders: enableHourly,
      enableCustomReminders: enableCustom,
      customReminderTimes: customTimes,
    };

    await updateSettings(newSettings);

    // Request permissions and schedule reminders
    await notificationService.requestPermissions();
    if (enableHourly) {
      await notificationService.scheduleHourlyReminders();
    }
    if (enableCustom) {
      await notificationService.scheduleCustomReminders(customTimes);
    }

    Alert.alert('Success', 'Water settings updated!');
    onClose();
  };

  const handleUpdateCustomTime = (index, time) => {
    const updated = [...customTimes];
    updated[index] = time;
    setCustomTimes(updated);
  };

  const handleAddCustomTime = () => {
    if (customTimes.length < 6) {
      setCustomTimes([...customTimes, '12:00']);
    }
  };

  const handleRemoveCustomTime = (index) => {
    setCustomTimes(customTimes.filter((_, i) => i !== index));
  };

  if (!visible) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Water Settings</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeBtn}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Daily Goal */}
      <View style={styles.section}>
        <Text style={styles.label}>Daily Goal (ml)</Text>
        <TextInput
          style={styles.input}
          value={dailyGoal}
          onChangeText={setDailyGoal}
          keyboardType="number-pad"
          placeholder="3000"
        />
      </View>

      {/* Hourly Reminders */}
      <View style={styles.section}>
        <View style={styles.switchRow}>
          <Text style={styles.label}>Hourly Reminders</Text>
          <Switch
            value={enableHourly}
            onValueChange={setEnableHourly}
            trackColor={{ false: colors.border, true: '#00D9FF' }}
            thumbColor={enableHourly ? '#0099CC' : colors.textSecondary}
          />
        </View>
        <Text style={styles.description}>
          6 AM - 10 PM, every hour
        </Text>
      </View>

      {/* Custom Time Reminders */}
      <View style={styles.section}>
        <View style={styles.switchRow}>
          <Text style={styles.label}>Custom Reminders</Text>
          <Switch
            value={enableCustom}
            onValueChange={setEnableCustom}
            trackColor={{ false: colors.border, true: '#00D9FF' }}
            thumbColor={enableCustom ? '#0099CC' : colors.textSecondary}
          />
        </View>

        {enableCustom && (
          <View>
            {customTimes.map((time, index) => (
              <View key={index} style={styles.timeInputRow}>
                <TextInput
                  style={styles.timeInput}
                  value={time}
                  onChangeText={(text) =>
                    handleUpdateCustomTime(index, text)
                  }
                  placeholder="HH:mm"
                />
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => handleRemoveCustomTime(index)}
                >
                  <Text style={styles.removeBtnText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}

            {customTimes.length < 6 && (
              <AnimatedButton
                style={styles.addButton}
                onPress={handleAddCustomTime}
              >
                <Text style={styles.addButtonText}>+ Add Time</Text>
              </AnimatedButton>
            )}
          </View>
        )}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
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
    borderLeftColor: '#00D9FF',
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
  timeInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    gap: spacing.md,
  },
  timeInput: {
    flex: 1,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
    fontSize: 14,
  },
  removeBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.error,
    borderRadius: 8,
  },
  removeBtnText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: '#0099FF',
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#00D9FF',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  saveButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WaterSettingsModal;
