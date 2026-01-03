import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import { colors, spacing } from '../styles/theme';
import { useWaterStore } from '../store/waterStore';
import WaterProgressChart from '../components/WaterProgressChart';
import WaterIntakeLog from '../components/WaterIntakeLog';
import WaterSettingsModal from '../components/WaterSettingsModal';
import AlertModal from '../components/AlertModal';

export const WaterTrackerScreen = () => {
  const {
    todayWater,
    settings,
    getTodayWater,
    addWaterIntake,
    removeWaterIntake,
    updateSettings,
    initializeStore,
  } = useWaterStore();

  const [refreshing, setRefreshing] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [alertState, setAlertState] = useState({
    visible: false,
    title: '',
    message: '',
    buttons: [],
  });

  useEffect(() => {
    const initializeAndLoad = async () => {
      await initializeStore();
      await getTodayWater();
    };
    initializeAndLoad();
  }, []);

  const handleAddWater = async (amount) => {
    await addWaterIntake(amount);
    await getTodayWater();
  };

  const handleRemoveWater = (id) => {
    setAlertState({
      visible: true,
      title: 'Remove Water Log',
      message: 'Are you sure you want to remove this entry?',
      buttons: [
        { 
          text: 'Cancel', 
          style: 'cancel',
          onPress: () => {}
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await removeWaterIntake(id);
            await getTodayWater();
          },
        },
      ],
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getTodayWater();
    setRefreshing(false);
  };

  const todayTotal = todayWater.reduce((sum, log) => sum + log.amount, 0);
  const percentage = Math.min(
    (todayTotal / settings.dailyGoal) * 100,
    100
  );

  const presets = [
    { amount: 250, label: '250ml' },
    { amount: 500, label: '500ml' },
    { amount: 750, label: '750ml' },
    { amount: 1000, label: '1L' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>💧 Water Tracker</Text>
            <Text style={styles.headerSubtitle}>
              Daily Goal: {settings.dailyGoal}ml
            </Text>
          </View>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setSettingsVisible(true)}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Chart */}
        <WaterProgressChart
          current={todayTotal}
          goal={settings.dailyGoal}
          percentage={percentage}
        />

        {/* Quick Add Buttons */}
        <View style={styles.presetsContainer}>
          <Text style={styles.sectionTitle}>Quick Add</Text>
          <View style={styles.presetGrid}>
            {presets.map((preset, index) => (
              <TouchableOpacity
                key={index}
                style={styles.presetButton}
                onPress={() => handleAddWater(preset.amount)}
              >
                <Text style={styles.presetLabel}>{preset.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Today's Logs */}
        <View style={styles.logsContainer}>
          <Text style={styles.sectionTitle}>Today's Logs</Text>
          {todayWater.length > 0 ? (
            <FlatList
              data={todayWater}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <WaterIntakeLog
                  log={item}
                  onRemove={() => handleRemoveWater(item.id)}
                />
              )}
            />
          ) : (
            <Text style={styles.emptyText}>
              No water logged yet today. Start hydrating!
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Settings Modal */}
      <WaterSettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        onSave={() => getTodayWater()}
      />

      {/* Alert Modal */}
      <AlertModal
        visible={alertState.visible}
        title={alertState.title}
        message={alertState.message}
        buttons={alertState.buttons}
        onDismiss={() => setAlertState({ ...alertState, visible: false })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: spacing.lg,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  settingsButton: {
    padding: spacing.md,
  },
  settingsIcon: {
    fontSize: 24,
  },
  presetsContainer: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  presetButton: {
    width: '48%',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    backgroundColor: '#0099FF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  logsContainer: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
});
