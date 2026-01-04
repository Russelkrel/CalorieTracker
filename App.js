import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { colors } from './src/styles/theme';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { CameraScreen } from './src/screens/CameraScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { WaterTrackerScreen } from './src/screens/WaterTrackerScreen';
import { HeartRateTrackerScreen } from './src/screens/HeartRateTrackerScreen';
import { useMealStore } from './src/store/mealStore';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="DashboardHome"
        component={DashboardScreen}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          cardStyle: { backgroundColor: colors.background },
        }}
      />
    </Stack.Navigator>
  );
};

const CameraStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="CameraHome"
        component={CameraScreen}
      />
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ cardStyle: { backgroundColor: colors.background } }}
      />
    </Stack.Navigator>
  );
};

const WaterStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="WaterHome"
        component={WaterTrackerScreen}
      />
    </Stack.Navigator>
  );
};

const HeartRateStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="HeartRateHome"
        component={HeartRateTrackerScreen}
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardStack}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24 }}>📊</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Water"
        component={WaterStack}
        options={{
          tabBarLabel: 'Water',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24 }}>💧</Text>
          ),
        }}
      />
      <Tab.Screen
        name="HeartRate"
        component={HeartRateStack}
        options={{
          tabBarLabel: 'Heart Rate',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24 }}>❤️</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraStack}
        options={{
          tabBarLabel: 'Capture',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24 }}>📷</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function AppContent() {
  const initializeStore = useMealStore((state) => state.initializeStore);

  useEffect(() => {
    initializeStore();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
      />
    </Stack.Navigator>
  );
}

export default AppContent;
