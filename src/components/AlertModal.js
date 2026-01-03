import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { colors, spacing } from '../styles/theme';

const AlertModal = ({ visible, title, message, buttons, onDismiss }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={styles.backdrop}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>{title}</Text>
          {message && <Text style={styles.message}>{message}</Text>}

          <View style={styles.buttonContainer}>
            {buttons &&
              buttons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.button,
                    button.style === 'destructive' && styles.buttonDestructive,
                    button.style === 'cancel' && styles.buttonCancel,
                  ]}
                  onPress={() => {
                    if (button.onPress) button.onPress();
                    setTimeout(() => onDismiss(), 100);
                  }}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      button.style === 'destructive' &&
                        styles.buttonTextDestructive,
                    ]}
                  >
                    {button.text}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  alertBox: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    minWidth: '70%',
    maxWidth: '90%',
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.md,
  },
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
    backgroundColor: '#FF9500',
  },
  buttonCancel: {
    backgroundColor: colors.border,
  },
  buttonDestructive: {
    backgroundColor: '#FF6347',
  },
  buttonText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 14,
  },
  buttonTextDestructive: {
    color: colors.text,
  },
});

export default AlertModal;
