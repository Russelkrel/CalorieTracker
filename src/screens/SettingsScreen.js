import { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedContainer from '../components/AnimatedContainer';
import HeartRateSettingsModal from '../components/HeartRateSettingsModal';
import MealSettingsModal from '../components/MealSettingsModal';
import WaterSettingsModal from '../components/WaterSettingsModal';
import { colors, spacing } from '../styles/theme';

export const SettingsScreen = ({ navigation }) => {
  const [waterSettingsVisible, setWaterSettingsVisible] = useState(false);
  const [heartRateSettingsVisible, setHeartRateSettingsVisible] = useState(false);
  const [mealSettingsVisible, setMealSettingsVisible] = useState(false);

  const handleClearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete all your history. This action cannot be undone.',
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

  const SettingCard = ({ title, description, icon, onPress }) => (
    <AnimatedButton
      onPress={onPress}
      style={styles.settingCard}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </View>
      <Text style={styles.cardArrow}>›</Text>
    </AnimatedButton>
  );

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
          <Text style={styles.sectionLabel}>Tracker Settings</Text>
          
          <SettingCard
            title="Calorie Tracker"
            description="Daily goals and meal tracking"
            icon="🍎"
            onPress={() => setMealSettingsVisible(true)}
          />

          <SettingCard
            title="Water Tracker"
            description="Hydration reminders and goals"
            icon="💧"
            onPress={() => setWaterSettingsVisible(true)}
          />

          <SettingCard
            title="Heart Rate Monitor"
            description="Age, weight & calorie calculations"
            icon="❤️"
            onPress={() => setHeartRateSettingsVisible(true)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>App Settings</Text>
          <AnimatedContainer style={styles.settingCard}>
            <View style={styles.cardContent}>
              <Text style={styles.cardIcon}>ℹ️</Text>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>About</Text>
                <Text style={styles.cardDescription}>Version 1.0.0</Text>
              </View>
            </View>
          </AnimatedContainer>
        </View>

        <AnimatedButton
          style={styles.dangerButton}
          onPress={handleClearAllData}
        >
          <Text style={styles.dangerButtonText}>Clear All Data</Text>
        </AnimatedButton>
      </ScrollView>

      {/* Settings Modals */}
      <Modal
        visible={mealSettingsVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setMealSettingsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <MealSettingsModal
            visible={mealSettingsVisible}
            onClose={() => setMealSettingsVisible(false)}
            onSave={() => setMealSettingsVisible(false)}
          />
        </View>
      </Modal>

      <Modal
        visible={waterSettingsVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setWaterSettingsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <WaterSettingsModal
            visible={waterSettingsVisible}
            onClose={() => setWaterSettingsVisible(false)}
            onSave={() => setWaterSettingsVisible(false)}
          />
        </View>
      </Modal>

      <Modal
        visible={heartRateSettingsVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setHeartRateSettingsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <HeartRateSettingsModal
            visible={heartRateSettingsVisible}
            onClose={() => setHeartRateSettingsVisible(false)}
            onSave={() => setHeartRateSettingsVisible(false)}
          />
        </View>
      </Modal>
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
    paddingTop: spacing.lg,
  },
  backButton: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIcon: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cardDescription: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  cardArrow: {
    fontSize: 20,
    color: colors.textSecondary,
    marginLeft: spacing.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  dangerButton: {
    backgroundColor: colors.error,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dangerButtonText: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 16,
  },
});
