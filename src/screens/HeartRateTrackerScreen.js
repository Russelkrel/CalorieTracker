import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  FlatList,
} from 'react-native';
import { colors, spacing } from '../styles/theme';
import { useHeartRateStore } from '../store/heartRateStore';
import SessionTimer from '../components/SessionTimer';
import HeartRateInput from '../components/HeartRateInput';
import SessionStats from '../components/SessionStats';
import SessionHistory from '../components/SessionHistory';
import HeartRateSettingsModal from '../components/HeartRateSettingsModal';
import AlertModal from '../components/AlertModal';

export const HeartRateTrackerScreen = () => {
  const currentSession = useHeartRateStore((state) => state.currentSession);
  const todaySessions = useHeartRateStore((state) => state.todaySessions);
  const settings = useHeartRateStore((state) => state.settings);
  const startSession = useHeartRateStore((state) => state.startSession);
  const endSession = useHeartRateStore((state) => state.endSession);
  const cancelSession = useHeartRateStore((state) => state.cancelSession);
  const deleteSession = useHeartRateStore((state) => state.deleteSession);
  const getTodaySessions = useHeartRateStore((state) => state.getTodaySessions);
  const initializeStore = useHeartRateStore((state) => state.initializeStore);

  const [refreshing, setRefreshing] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [initialBPM, setInitialBPM] = useState('');
  const [readyToStart, setReadyToStart] = useState(false);
  const [alertState, setAlertState] = useState({
    visible: false,
    title: '',
    message: '',
    buttons: [],
  });

  useEffect(() => {
    const initialize = async () => {
      await initializeStore();
      await getTodaySessions();
    };
    initialize();
  }, [getTodaySessions, initializeStore]);

  useEffect(() => {
    console.log('currentSession changed:', currentSession);
  }, [currentSession]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getTodaySessions();
    setRefreshing(false);
  };

  const handleStartSession = useCallback(() => {
    console.log('handleStartSession called, initialBPM:', initialBPM);
    if (!initialBPM) {
      setAlertState({
        visible: true,
        title: 'Input BPM',
        message: 'Please enter your initial BPM before starting',
        buttons: [{ text: 'OK', onPress: () => {} }],
      });
      return;
    }
    const bpmValue = parseInt(initialBPM, 10);
    if (bpmValue < 40 || bpmValue > 220) {
      setAlertState({
        visible: true,
        title: 'Invalid BPM',
        message: 'BPM must be between 40 and 220',
        buttons: [{ text: 'OK', onPress: () => {} }],
      });
      return;
    }
    console.log('Starting session with BPM:', bpmValue);
    startSession();
    // Add initial reading after session starts
    setTimeout(() => {
      useHeartRateStore.setState((prevState) => {
        if (!prevState.currentSession) return prevState;
        const updated = {
          currentSession: {
            ...prevState.currentSession,
            heartRateReadings: [
              {
                bpm: bpmValue,
                timestamp: new Date().toISOString(),
              },
            ],
          },
        };
        console.log('Added initial reading, state:', updated);
        return updated;
      });
      setInitialBPM('');
      setReadyToStart(false);
    }, 100);
  }, [initialBPM]);

  const handleEndSession = useCallback(() => {
    console.log('handleEndSession called');
    const session = useHeartRateStore.getState().currentSession;
    console.log('Current session:', session);
    
    if (!session || session.heartRateReadings.length === 0) {
      setAlertState({
        visible: true,
        title: 'No Data',
        message: 'Please add at least one BPM reading before ending',
        buttons: [{ text: 'OK', onPress: () => {} }],
      });
      return;
    }

    setAlertState({
      visible: true,
      title: 'End Session',
      message: 'Do you want to save this session?',
      buttons: [
        { 
          text: 'Cancel', 
          style: 'cancel',
          onPress: () => {}
        },
        {
          text: 'Save',
          style: 'default',
          onPress: async () => {
            try {
              await endSession();
              await getTodaySessions();
              setAlertState({
                visible: true,
                title: 'Success',
                message: 'Session saved!',
                buttons: [{ text: 'OK', onPress: () => {} }],
              });
            } catch (error) {
              setAlertState({
                visible: true,
                title: 'Error',
                message: 'Failed to save session: ' + error.message,
                buttons: [{ text: 'OK', onPress: () => {} }],
              });
            }
          },
        },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => {
            cancelSession();
            setAlertState({
              visible: true,
              title: 'Discarded',
              message: 'Session has been discarded',
              buttons: [{ text: 'OK', onPress: () => {} }],
            });
          },
        },
      ],
    });
  }, [endSession, getTodaySessions, cancelSession]);

  const handleDeleteSession = useCallback((sessionId) => {
    setAlertState({
      visible: true,
      title: 'Delete Session',
      message: 'Are you sure you want to delete this session?',
      buttons: [
        { 
          text: 'Cancel', 
          style: 'cancel',
          onPress: () => {}
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteSession(sessionId);
              await getTodaySessions();
            } catch (error) {
              setAlertState({
                visible: true,
                title: 'Error',
                message: 'Failed to delete session',
                buttons: [{ text: 'OK', onPress: () => {} }],
              });
            }
          },
        },
      ],
    });
  }, [deleteSession, getTodaySessions]);

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
            <Text style={styles.headerTitle}>❤️ Heart Rate Monitor</Text>
            <Text style={styles.headerSubtitle}>Track your jogging sessions</Text>
          </View>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setSettingsVisible(true)}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Debug Info */}
        <View style={{ paddingHorizontal: spacing.md, marginTop: spacing.md }}>
          <Text style={{ color: '#00D9FF', fontSize: 12 }}>
            currentSession: {currentSession ? 'YES' : 'NO'}
          </Text>
          <Text style={{ color: '#00D9FF', fontSize: 12 }}>
            initialBPM: {initialBPM}
          </Text>
          <Text style={{ color: '#00D9FF', fontSize: 12 }}>
            readyToStart: {readyToStart ? 'YES' : 'NO'}
          </Text>
        </View>

        {/* Active Session */}
        {currentSession ? (
          <View style={styles.activeSessionContainer}>
            <SessionTimer
              startTime={currentSession.startTime}
              onEndSession={handleEndSession}
            />
            <HeartRateInput
              onAddReading={(bpm) => {
                useHeartRateStore.setState((prevState) => {
                  if (!prevState.currentSession) return prevState;
                  return {
                    currentSession: {
                      ...prevState.currentSession,
                      heartRateReadings: [
                        ...prevState.currentSession.heartRateReadings,
                        {
                          bpm,
                          timestamp: new Date().toISOString(),
                        },
                      ],
                    },
                  };
                });
              }}
            />
            <View style={styles.readingsContainer}>
              <Text style={styles.readingsTitle}>Heart Rate Readings</Text>
              {currentSession && currentSession.heartRateReadings.length > 0 ? (
                <FlatList
                  data={currentSession.heartRateReadings}
                  keyExtractor={(_, index) => `reading-${index}`}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <View style={styles.readingItem}>
                      <Text style={styles.readingNumber}>{item.bpm} BPM</Text>
                      <Text style={styles.readingTime}>
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </Text>
                    </View>
                  )}
                />
              ) : (
                <Text style={styles.noReadings}>No readings yet</Text>
              )}
            </View>
          </View>
        ) : (
          <>
            {/* BPM Input Before Starting */}
            <View style={styles.preSessionContainer}>
              <Text style={styles.sectionTitle}>Enter Initial BPM</Text>
              <View style={styles.inputGroup}>
                <HeartRateInput
                  onAddReading={(bpm) => {
                    setInitialBPM(bpm.toString());
                    setReadyToStart(true);
                  }}
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.startButton,
                  !readyToStart && styles.startButtonDisabled,
                ]}
                onPress={handleStartSession}
                disabled={!readyToStart}
              >
                <Text style={styles.startButtonText}>Start Session</Text>
              </TouchableOpacity>
            </View>

            {/* Session Stats */}
            {todaySessions.length > 0 && (
              <SessionStats sessions={todaySessions} />
            )}

            {/* Session History */}
            {todaySessions.length > 0 && (
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Today's Sessions</Text>
                <FlatList
                  data={todaySessions}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <SessionHistory
                      session={item}
                      onDelete={() => handleDeleteSession(item.id)}
                    />
                  )}
                />
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Settings Modal */}
      <HeartRateSettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        onSave={() => getTodaySessions()}
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
  preSessionContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: 12,
    paddingVertical: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: '#FF9500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  activeSessionContainer: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  startButton: {
    marginHorizontal: spacing.md,
    backgroundColor: '#FF9500',
    paddingVertical: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonDisabled: {
    backgroundColor: '#666',
    opacity: 0.5,
  },
  startButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  readingsContainer: {
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#FF9500',
  },
  readingsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  readingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  readingNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF9500',
  },
  readingTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  noReadings: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.md,
  },
  historyContainer: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
});
