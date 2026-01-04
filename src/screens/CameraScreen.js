import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { colors, spacing } from '../styles/theme';
import { visionApi } from '../services/visionApi';
import { useMealStore } from '../store/mealStore';

export const CameraScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [mealType, setMealType] = useState('lunch');
  const addMeal = useMealStore((state) => state.addMeal);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: true,
      });
      setPreviewImage(photo.uri);
      analyzeImage(photo.base64);
    } catch (error) {
      Alert.alert('Error', 'Failed to capture image');
      setIsCapturing(false);
    }
  };

  const analyzeImage = async (base64) => {
    setAnalyzing(true);
    try {
      const analysis = await visionApi.analyzeFoodImage(base64);

      if (analysis.foods && analysis.foods.length > 0) {
        const totalCalories = analysis.foods.reduce(
          (sum, food) => sum + food.calories,
          0
        );

        const meal = {
          mealType,
          foods: analysis.foods,
          totalCalories,
          imageUri: previewImage,
          notes: analysis.analysisNotes || '',
          createdAt: new Date().toISOString(),
        };

        await addMeal(meal);
        Alert.alert('Success', 'Meal logged successfully!', [
          {
            text: 'View Dashboard',
            onPress: () => {
              navigation.navigate('Dashboard');
              setPreviewImage(null);
              setAnalyzing(false);
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'No food detected. Please try another image.');
        setPreviewImage(null);
        setAnalyzing(false);
      }
    } catch (error) {
      Alert.alert('Analysis Error', error.message || 'Failed to analyze food');
      setPreviewImage(null);
      setAnalyzing(false);
    }
  };

  const retakePhoto = () => {
    setPreviewImage(null);
    setAnalyzing(false);
  };

  if (!permission) {
    return <Text>Loading...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Camera permission required</Text>
        <Pressable
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  if (previewImage) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: previewImage }} style={styles.previewImage} />

        {!analyzing && (
          <View style={styles.mealTypeSelector}>
            <Text style={styles.mealTypeLabel}>Meal Type:</Text>
            <View style={styles.mealTypeButtons}>
              {['breakfast', 'lunch', 'dinner', 'snack'].map((type) => (
                <Pressable
                  key={type}
                  onPress={() => setMealType(type)}
                  style={[
                    styles.mealTypeButton,
                    mealType === type && styles.mealTypeButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.mealTypeButtonText,
                      mealType === type && styles.mealTypeButtonTextActive,
                    ]}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {analyzing && (
          <View style={styles.analyzingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.analyzingText}>Analyzing food...</Text>
          </View>
        )}

        {!analyzing && (
          <View style={styles.previewActions}>
            <Pressable style={styles.retakeButton} onPress={retakePhoto}>
              <Text style={styles.retakeButtonText}>Retake</Text>
            </Pressable>
            <Pressable style={styles.analyzeButton} onPress={() => analyzeImage(previewImage)}>
              <Text style={styles.analyzeButtonText}>Analyze</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
      />
      <View style={styles.controls}>
        <Pressable
          style={[styles.captureButton, isCapturing && styles.captureButtonActive]}
          onPress={takePicture}
          disabled={isCapturing}
        >
          <View style={styles.captureButtonInner} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  camera: {
    flex: 1,
  },
  controls: {
    backgroundColor: colors.background,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonActive: {
    backgroundColor: colors.secondary,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.background,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  previewImage: {
    flex: 1,
    width: '100%',
  },
  mealTypeSelector: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  mealTypeLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  mealTypeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mealTypeButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mealTypeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  mealTypeButtonText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  mealTypeButtonTextActive: {
    color: colors.background,
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
  },
  retakeButton: {
    flex: 1,
    marginRight: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.border,
    borderRadius: 8,
    alignItems: 'center',
  },
  retakeButtonText: {
    color: colors.text,
    fontWeight: '600',
  },
  analyzeButton: {
    flex: 1,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  analyzeButtonText: {
    color: colors.background,
    fontWeight: '600',
  },
  analyzingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  analyzingText: {
    color: colors.primary,
    fontSize: 16,
    marginTop: spacing.md,
  },
  permissionText: {
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  permissionButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  permissionButtonText: {
    color: colors.background,
    fontWeight: '600',
  },
});
