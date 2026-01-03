# DEVELOPER_NOTES.md

## 📋 Project Overview

**CalorieTracker** is a React Native Expo application that uses OpenAI Vision API to analyze food images and track daily calorie intake.

**Created:** January 1, 2026  
**Version:** 1.0.0 (MVP)  
**Target:** iOS, Android, Web

---

## 🏗️ Architecture

### Tech Stack
- **Frontend:** React Native (Expo)
- **State:** Zustand (lightweight state management)
- **Navigation:** React Navigation (bottom tabs + stack)
- **API:** OpenAI Vision API (gpt-4-vision-preview)
- **Storage:** AsyncStorage (local) + SecureStore (API key)
- **UI:** React Native Paper + custom styling

### File Structure
```
src/
├── App.js                  # Navigation setup
├── screens/                # Full-screen components
│   ├── CameraScreen.js    # Photo capture & analysis
│   ├── DashboardScreen.js # Daily tracking
│   └── SettingsScreen.js  # User preferences
├── components/             # Reusable UI parts
│   ├── CalorieProgress.js # Daily progress card
│   ├── MealCard.js        # Individual meal display
│   └── NutritionBadge.js  # Nutrition stats
├── services/               # Business logic
│   ├── visionApi.js       # OpenAI integration
│   └── storageService.js  # AsyncStorage CRUD
├── store/                  # State management
│   └── mealStore.js       # Zustand store
├── styles/                 # Theme & constants
│   └── theme.js           # Colors, spacing, fonts
└── utils/                  # Helpers
    ├── helpers.js         # Date, calc functions
    └── secureStorage.js   # Secure key storage
```

---

## 🔄 Data Flow

### Meal Logging Flow
```
User takes photo
    ↓
CameraScreen captures image (base64)
    ↓
visionApi.analyzeFoodImage() sends to OpenAI
    ↓
OpenAI returns parsed food data (JSON)
    ↓
mealStore.addMeal() saves to AsyncStorage
    ↓
storageService.saveMeal() persists locally
    ↓
DashboardScreen updates via useMealStore hook
```

### State Management Flow
```
useMealStore (Zustand)
    ├── meals: MealEntry[]
    ├── todayMeals: MealEntry[]
    ├── settings: UserSettings
    └── Actions:
        ├── addMeal()
        ├── deleteMeal()
        ├── getTodayMeals()
        └── updateSettings()
```

---

## 💾 Data Models

### MealEntry
```typescript
{
  id: string;                    // timestamp.toString()
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: Food[];                 // Array of food items
  totalCalories: number;         // Sum of all food calories
  imageUri: string;              // Local image path
  notes: string;                 // AI analysis notes
  createdAt: ISO8601;            // new Date().toISOString()
}
```

### Food
```typescript
{
  name: string;
  portionSize: string;           // e.g., "1 cup", "2 slices"
  calories: number;
  macronutrients: {
    protein: number;             // grams
    carbs: number;               // grams
    fat: number;                 // grams
  };
  confidence: number;            // 0-1 score
}
```

### UserSettings
```typescript
{
  dailyCalorieGoal: number;      // default: 2000
  darkMode: boolean;             // default: true
  preferredUnits: 'metric' | 'imperial';
}
```

---

## 🔑 Key Features & Implementation

### 1. Camera Integration
**File:** `src/screens/CameraScreen.js`

- Uses `expo-camera` for photo capture
- Compresses images (0.8 quality) before API
- Allows meal type selection
- Preview before analysis
- Error handling with user feedback

### 2. OpenAI Vision API
**File:** `src/services/visionApi.js`

- Model: `gpt-4-vision-preview`
- Prompt engineering for consistent JSON output
- Base64 image encoding
- Response parsing and validation
- Error messages for API failures

**Prompt Example:**
```
"Analyze this food image and provide:
1. Food name
2. Estimated portion size
3. Approximate calories
4. Macronutrients (protein, carbs, fat in grams)
5. Confidence level (0-1)"
```

### 3. Local Storage
**File:** `src/services/storageService.js`

- AsyncStorage for meal history
- Simple key-value storage
- CRUD operations for meals
- Settings persistence
- Image URI tracking

### 4. State Management
**File:** `src/store/mealStore.js`

- Zustand for lightweight state
- Async actions with loading states
- Error handling
- Computed properties (getTodayCalories)
- Persistent initialization

### 5. Navigation
**File:** `src/App.js`

- Bottom tab navigation (Dashboard, Camera)
- Stack navigation for Settings
- Dark mode theming
- Safe area handling

### 6. UI Components
**Colors:**
- Primary (Electric Blue): `#00D9FF`
- Background (Black): `#000000`
- Surface (Dark Gray): `#1A1A1A`
- Text (White): `#FFFFFF`

**Spacing:** 4, 8, 16, 24, 32 (xs to xl)

---

## 🔐 Security Considerations

### API Key Management
1. **Never hardcode** API keys in source
2. Use `.env` file (in `.gitignore`)
3. SecureStore for sensitive data
4. Fallback to environment variable
5. Runtime validation before API call

### Data Privacy
- Images stored locally only (not uploaded)
- Meal data stored locally on device
- No cloud sync by default (Phase 2 feature)
- No user tracking or analytics

### HTTPS
- All API calls use HTTPS
- No sensitive data in URLs
- Axios handles TLS verification

---

## 🐛 Common Development Tasks

### Adding a New Screen
1. Create `src/screens/MyScreen.js`
2. Export screen component
3. Add to navigation in `App.js`
4. Use `useMealStore` for state

### Adding a New Component
1. Create `src/components/MyComponent.js`
2. Import theme colors
3. Use consistent spacing
4. Export as named export

### Modifying State
1. Edit `src/store/mealStore.js`
2. Add action/computed property
3. Use in components: `useMealStore(state => state.property)`
4. Test with mock data

### Styling
1. Use colors from `src/styles/theme.js`
2. Follow spacing grid (4-32)
3. Use consistent font weights
4. Test on both light/dark modes

### Testing Changes
1. `npm start` to reload
2. Save file → auto hot reload
3. Shake device → Expo menu
4. Select "Reload" for full refresh

---

## ⚡ Performance Tips

### Image Handling
- Compress before API: quality: 0.8
- Convert to base64 (already done)
- Cache images locally
- Consider lazy loading in lists

### API Optimization
- Debounce rapid API calls
- Cache responses for same meal type
- Implement request timeout
- Show loading state to user

### State Updates
- Zustand is very fast
- Only re-render affected components
- Use computed selectors wisely
- Memoize heavy operations

---

## 🧪 Testing Checklist

### Before Deployment
- [ ] Camera permission request works
- [ ] Photo capture succeeds
- [ ] OpenAI API call returns data
- [ ] Meal saves to AsyncStorage
- [ ] Dashboard updates with new meal
- [ ] Settings persist on reload
- [ ] Delete meal functionality works
- [ ] Date filtering works correctly
- [ ] UI looks good in dark mode
- [ ] No console errors in dev tools
- [ ] Response time < 15 seconds
- [ ] Error states display helpful messages

---

## 🚀 Deployment

### Building APK (Android)
```bash
expo build:android
# Creates signed APK for Google Play
```

### Building IPA (iOS)
```bash
expo build:ios
# Creates IPA for App Store
```

### Environment for Production
Create `.env.production`:
```env
OPENAI_API_KEY=sk-prod-key-here
DAILY_CALORIE_GOAL=2000
```

---

## 📈 Future Enhancements (Phase 2+)

### Phase 2
- [ ] Weekly/monthly charts
- [ ] Food history quick-add
- [ ] Firebase cloud sync
- [ ] App icon design

### Phase 3
- [ ] Barcode scanning
- [ ] Apple Health integration
- [ ] Google Fit integration
- [ ] Social sharing

### Beyond
- [ ] Nutritionist recommendations
- [ ] Meal planning
- [ ] Recipe suggestions
- [ ] Multi-language support

---

## 🔗 Resources

- **Expo:** https://docs.expo.dev
- **React Native:** https://reactnative.dev
- **Zustand:** https://github.com/pmndrs/zustand
- **OpenAI:** https://platform.openai.com/docs
- **React Navigation:** https://reactnavigation.org

---

## 📞 Troubleshooting Guide

### Development Issues
See [SETUP_GUIDE.md](./SETUP_GUIDE.md#-common-issues--solutions)

### Production Issues
1. Check logs: Expo DevTools
2. Verify API key is valid
3. Check network connectivity
4. Review error messages in Alert dialogs

### Performance Issues
1. Profile with Expo DevTools
2. Check AsyncStorage size
3. Optimize image compression
4. Review API response times

---

**Last Updated:** January 1, 2026  
**Status:** Development ready for user testing
