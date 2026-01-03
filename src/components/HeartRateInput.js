import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import { colors, spacing } from '../styles/theme';

const HeartRateInput = ({ onAddReading }) => {
  const [bpm, setBpm] = useState('');

  const handleAddReading = () => {
    const heartRate = parseInt(bpm);
    if (!bpm || isNaN(heartRate) || heartRate < 40 || heartRate > 220) {
      Alert.alert(
        'Invalid Input',
        'Please enter a heart rate between 40 and 220 BPM'
      );
      return;
    }
    onAddReading(heartRate);
    setBpm('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Log Heart Rate (BPM)</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter BPM"
          placeholderTextColor={colors.textSecondary}
          keyboardType="number-pad"
          value={bpm}
          onChangeText={setBpm}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddReading}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 12,
    marginTop: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: '#FF9500',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  input: {
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
  addButton: {
    backgroundColor: '#FF9500',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  addButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HeartRateInput;
