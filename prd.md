CalorieTracker/
├── app.json
├── package.json
├── src/
│   ├── screens/
│   │   ├── CameraScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── HistoryScreen.js
│   │   └── SettingsScreen.js
│   ├── components/
│   │   ├── MealCard.js
│   │   ├── NutritionBadge.js
│   │   └── CalorieProgress.js
│   ├── services/
│   │   ├── visionApi.js (abstraction layer)
│   │   ├── storageService.js
│   │   └── nutritionService.js
│   ├── store/
│   │   └── mealStore.js (Zustand)
│   ├── styles/
│   │   └── theme.js
│   ├── utils/
│   │   └── helpers.js
│   └── App.js# CalorieTracker PRD - React Native Expo App

## 1. Product Overview

**Product Name:** CalorieTracker  
**Platform:** React Native (Expo)  
**Target Users:** Health-conscious individuals who want to track calorie intake without manual data entry  
**Core Value Proposition:** Snap a photo of food, get instant nutritional information via AI vision, and maintain an automated calorie log.

---

## 2. Core Features

### 2.1 Image Capture & OCR
- **Camera Integration:** Users can take photos of food items or meals
- **Image Processing:** 
  - Support for single food items
  - Support for multi-item plates
  - Support for packaged foods (read nutritional labels via OCR)
- **Image Storage:** Save images locally and optionally to cloud for history

### 2.2 OpenAI Vision Analysis
- **Food Recognition:** Identify food items in images using OpenAI's Vision API
- **Nutritional Extraction:** Extract calorie, protein, carbs, fat, and other macronutrient data
- **Portion Estimation:** Estimate portion sizes based on image analysis
- **Confidence Scoring:** Return confidence levels for identified foods

### 2.3 Calorie Tracking Dashboard
- **Daily View:** Display total calories consumed and remaining daily budget
- **Meal Logging:** Organize entries by meal type (breakfast, lunch, dinner, snacks)
- **Food History:** Quick-add frequently logged foods
- **Progress Visualization:** Daily, weekly, and monthly calorie trends (charts/graphs)

### 2.4 User Profile & Settings
- **Daily Calorie Goal:** Set personalized daily calorie targets
- **Dietary Preferences:** Options to filter/prefer certain food categories
- **Unit Preferences:** Metric or imperial measurements
- **Dark/Light Mode:** Theme preference

### 2.5 Data Management
- **Local Storage:** Persist data locally using SQLite or AsyncStorage
- **Cloud Sync:** Optional cloud backup (Firebase or similar)
- **Export:** Download meal history as CSV or PDF

---

## 3. Technical Stack

### 3.1 Frontend
- **Framework:** React Native with Expo
- **Navigation:** React Navigation
- **State Management:** Redux, Zustand, or Context API
- **UI Components:** React Native Paper or NativeBase
- **Charts:** React Native Chart Kit or Victory Native

### 3.2 Backend & APIs
- **OpenAI Vision API:** For food recognition and nutritional analysis
- **Optional Backend:** Node.js + Express for rate limiting and logging
- **Database:** SQLite (local) or Firebase Firestore (cloud)

### 3.3 Libraries
- **Camera:** expo-camera
- **Image Processing:** expo-image-manipulator
- **Local Storage:** AsyncStorage or Realm
- **HTTP Client:** Axios or Fetch API
- **OCR (optional):** react-native-ml-kit for on-device OCR

---

## 4. User Flows

### 4.1 Primary Flow: Log a Meal
1. User taps "Capture Meal" button
2. Camera screen opens
3. User takes photo of food
4. Image is sent to OpenAI Vision API
5. API returns identified foods and nutritional data
6. User confirms/edits the analysis
7. Entry is saved to local database
8. Dashboard updates with new calorie count

### 4.2 Secondary Flow: Manual Entry
1. User taps "Manual Entry"
2. Search food database (offline or online)
3. Select food and portion size
4. Save to calorie log

### 4.3 View Progress
1. User opens Dashboard
2. View today's calorie summary
3. Tap to see detailed breakdown by meal
4. Swipe to view week/month trends

---

## 5. Data Models

### 5.1 User Profile
```
{
  id: string,
  name: string,
  dailyCalorieGoal: number,
  preferredUnits: 'metric' | 'imperial',
  darkMode: boolean,
  createdAt: timestamp
}
```

### 5.2 Meal Entry
```
{
  id: string,
  userId: string,
  imageUri: string,
  foods: [
    {
      name: string,
      portionSize: number,
      unit: string,
      calories: number,
      protein: number,
      carbs: number,
      fat: number,
      confidence: number (0-1)
    }
  ],
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
  totalCalories: number,
  createdAt: timestamp,
  notes: string
}
```

### 5.3 OpenAI Vision Response
```
{
  foods: [
    {
      name: string,
      quantity: string,
      calories: number,
      macronutrients: {
        protein: number,
        carbs: number,
        fat: number
      },
      confidence: number
    }
  ],
  analysisNotes: string
}
```

---

## 6. API Integration Details

### 6.1 OpenAI Vision API
- **Endpoint:** POST `/v1/chat/completions`
- **Model:** `gpt-4-vision-preview`
- **Request:** Send base64 image + prompt asking for nutritional analysis
- **Rate Limiting:** Free tier allows limited requests; consider backend proxy
- **Error Handling:** Graceful fallback to manual entry if API fails

### 6.2 Prompt Engineering
Example prompt:
```
"Analyze this food image. For each food item visible, provide:
1. Food name
2. Estimated portion size
3. Approximate calories
4. Macronutrients (protein, carbs, fat in grams)
5. Confidence level (0-1) for accuracy
Return as JSON."
```

---

## 7. Success Metrics

- **User Retention:** 60%+ users return within 7 days
- **Daily Active Users (DAU):** Track meal logging frequency
- **API Accuracy:** <10% calorie estimation error vs. USDA database
- **Performance:** Image analysis response <5 seconds
- **User Satisfaction:** 4.5+ star rating on app stores

---

## 8. Phases

### Phase 1 (MVP)
- Basic camera capture
- OpenAI Vision integration
- Simple dashboard
- Local storage only
- Manual calorie goal setting

### Phase 2
- Weekly/monthly charts
- Food history & quick-add
- Dark mode
- Cloud sync (optional)

### Phase 3
- Advanced nutrition insights
- Barcode scanning for packaged foods
- Social features (sharing)
- Integration with fitness apps

---

## 9. Out of Scope (v1)

- Barcode scanning
- Social/community features
- Integration with Fitbit, Apple Health, etc.
- Advanced nutrition science
- Multi-language support (initial English only)
- Offline image analysis

---

## 10. Security & Privacy

- **API Keys:** Store OpenAI key securely (no hardcoding)
- **Image Data:** Do not store images on personal cloud; clarify data retention
- **User Data:** Encrypt sensitive user data at rest
- **Compliance:** Ensure GDPR/CCPA compliance if processing user data

---

## 11. Timeline Estimate

- **Design & Setup:** 1 week
- **Core Implementation:** 3-4 weeks
- **Testing & Refinement:** 1-2 weeks
- **Deployment:** 1 week
- **Total:** ~6-8 weeks for MVP
