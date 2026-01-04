# QUICK_REFERENCE.md

## 🚀 Commands You'll Use Most

### Start Development
```bash
npm start          # Start Expo dev server
i                  # iOS Simulator
a                  # Android Emulator
w                  # Web Browser
```

### Build & Deploy
```bash
npm run ios        # Build for iOS Simulator
npm run android    # Build for Android Emulator
npm run build:ios  # Build iOS app for App Store
npm run build:android  # Build Android app for Play Store
```

### Maintenance
```bash
npm install        # Install dependencies
npm cache clean    # Clear npm cache
npm update         # Update packages
```

---

## 📱 Testing Shortcuts

| Action | Command | Result |
|--------|---------|--------|
| Start app | `npm start` | Shows menu |
| Reload app | Save file or press `r` | Hot reload |
| Dev menu | Shake device | Open Expo menu |
| Open logs | Press `d` | DevTools |
| Full reload | Expo menu → Reload | Fresh start |

---

## 🔧 Configuration Files

| File | Purpose | Edit When |
|------|---------|-----------|
| `.env` | API keys & secrets | Adding API key |
| `app.json` | Expo settings | Need to change app name/icon |
| `package.json` | Dependencies | Installing new packages |
| `src/styles/theme.js` | Design system | Changing colors/spacing |

---

## 📂 File Locations

| What | Where | Edit For |
|------|-------|----------|
| Screens | `src/screens/` | New page or feature |
| UI Components | `src/components/` | Reusable parts |
| API calls | `src/services/visionApi.js` | OpenAI settings |
| Data storage | `src/services/storageService.js` | Storage logic |
| State | `src/store/mealStore.js` | App state |
| Colors | `src/styles/theme.js` | Design changes |
| Helpers | `src/utils/` | Utility functions |

---

## 🎨 Design Quick Reference

### Colors
```javascript
colors.primary     // #00D9FF (Electric Blue)
colors.secondary   // #0099CC (Dark Blue)
colors.background  // #000000 (Black)
colors.surface     // #1A1A1A (Dark Gray)
colors.text        // #FFFFFF (White)
colors.success     // #00D97E (Green)
colors.error       // #FF4444 (Red)
```

### Spacing
```javascript
spacing.xs   // 4px
spacing.sm   // 8px
spacing.md   // 16px
spacing.lg   // 24px
spacing.xl   // 32px
```

### Usage
```javascript
import { colors, spacing } from '../styles/theme';

<View style={{
  backgroundColor: colors.surface,
  padding: spacing.lg,
  marginBottom: spacing.md,
}}>
```

---

## 🔐 API Key Setup (Do This First!)

```bash
# 1. Get key from https://platform.openai.com/api-keys
# 2. Open .env file in editor
# 3. Replace placeholder with your key
OPENAI_API_KEY=sk-your-actual-key-here
# 4. Save and restart app
npm start
```

---

## 🧠 State Management (Zustand)

### In Any Component
```javascript
import { useMealStore } from '../store/mealStore';

const MyComponent = () => {
  // Get state
  const meals = useMealStore(state => state.meals);
  const todayMeals = useMealStore(state => state.todayMeals);
  
  // Call actions
  const addMeal = useMealStore(state => state.addMeal);
  const deleteMeal = useMealStore(state => state.deleteMeal);
  
  return (...);
};
```

---

## 📸 Camera Usage

```javascript
import { CameraView } from 'expo-camera';

<CameraView
  ref={cameraRef}
  style={styles.camera}
  facing="back"
/>

// Take photo
const photo = await cameraRef.current.takePictureAsync({
  quality: 0.8,
  base64: true,
});
```

---

## 💾 Storage Usage

```javascript
import { storageService } from '../services/storageService';

// Save meal
await storageService.saveMeal(mealObject);

// Get all meals
const meals = await storageService.getAllMeals();

// Get today's meals
const today = new Date();
const todayMeals = await storageService.getMealsByDate(today);

// Delete meal
await storageService.deleteMeal(mealId);
```

---

## 🤖 OpenAI API Usage

```javascript
import { visionApi } from '../services/visionApi';

const analysis = await visionApi.analyzeFoodImage(base64Image);

// Returns:
{
  foods: [
    {
      name: "chicken",
      portionSize: "1 breast",
      calories: 165,
      macronutrients: {
        protein: 31,
        carbs: 0,
        fat: 3.6
      },
      confidence: 0.95
    }
  ],
  analysisNotes: "Grilled chicken breast, no skin"
}
```

---

## 🎯 Common Tasks

### Add a New Screen
1. Create `src/screens/NewScreen.js`
2. Add to navigation in `App.js`
3. Use existing screens as template

### Add a New Component
1. Create `src/components/NewComponent.js`
2. Import theme colors
3. Use in screens

### Add a New State Property
1. Edit `src/store/mealStore.js`
2. Add to Zustand create function
3. Import in components with `useMealStore`

### Change Colors
1. Edit `src/styles/theme.js`
2. Update `colors` object
3. Auto-reloads on save

---

## 🐛 Debugging Tips

### View Console Logs
- Dev: Terminal shows logs
- Device: Shake → Expo menu → View logs

### Hot Reload
- Edit & save file
- App reloads automatically
- Preserves app state

### Hard Reload
- Shake device
- Expo menu → Reload
- Clears everything & restarts

### Check API Calls
- Press `d` in Expo CLI
- Open DevTools
- Check Network tab

---

## 📋 Checklist: Before First Run

- [ ] `.env` file has your API key
- [ ] All dependencies installed (`npm install`)
- [ ] Simulator/Emulator running
- [ ] Camera permission setup
- [ ] Internet connection active

---

## ✅ Checklist: Before Production

- [ ] API key from environment variable
- [ ] All screens tested
- [ ] Camera working on real device
- [ ] Meal logging works end-to-end
- [ ] Settings persist on reload
- [ ] Error messages are helpful
- [ ] No console errors
- [ ] Performance acceptable (<15s analysis)
- [ ] App icon set
- [ ] App name correct
- [ ] Privacy policy ready
- [ ] Terms of service ready

---

## 🚨 Emergency Commands

```bash
# Clear everything and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Kill stuck process
pkill -f "node"
pkill -f "expo"

# Reset Expo cache
expo prebuild --clean

# Full restart
npm start --clear
```

---

## 📞 Where to Get Help

| Issue | Resource |
|-------|----------|
| Expo | https://docs.expo.dev |
| React Native | https://reactnative.dev |
| OpenAI API | https://platform.openai.com/docs |
| Navigation | https://reactnavigation.org |
| Zustand | https://github.com/pmndrs/zustand |

---

## 🎁 Pro Tips

1. **Use Emojis in Console** - Makes logs easier to spot
   ```javascript
   console.log('🚀 App starting');
   console.log('❌ Error:', error);
   ```

2. **React DevTools** - Install for better debugging
3. **Hot Reload** - Save quickly to test changes
4. **Test on Device Early** - Simulators don't always match real behavior
5. **Use Dark Mode** - App is designed for it
6. **Commit Often** - With good commit messages

---

## 🎯 Quick Wins

Easy improvements to try:
- [ ] Change app name in `app.json`
- [ ] Adjust colors in `theme.js`
- [ ] Update daily goal default
- [ ] Add app icon in `assets/`
- [ ] Customize prompt in `visionApi.js`
- [ ] Add console logging for debugging

---

**Last Updated:** January 1, 2026  
**Status:** Ready to launch! 🚀
