# SETUP_GUIDE.md - Complete Setup Instructions

## ⚡ Quick Start (5 minutes)

### 1. Prerequisites Check
```bash
# Verify Node.js version (need 16+)
node --version

# Install Expo CLI globally
npm install -g expo-cli

# Verify expo installation
expo --version
```

### 2. Get OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy and save the key securely
5. Note: You get $5 free credits with new account (expires in 3 months)

### 3. Setup Environment
```bash
# Navigate to project
cd /path/to/CalorieTracker

# Create .env file (if not exists)
cat > .env << EOF
OPENAI_API_KEY=sk-your-actual-key-here
DAILY_CALORIE_GOAL=2000
EOF

# Install dependencies
npm install
```

### 4. Start Development Server
```bash
npm start
```

This opens Expo CLI menu. Choose:
- **`i`** - iOS Simulator (Mac only)
- **`a`** - Android Emulator
- **`w`** - Web browser (limited features)
- **Scan QR** - Use Expo Go app on physical device

---

## 📱 Platform-Specific Setup

### iOS Setup

**Requirements:**
- macOS with Xcode installed
- iOS Simulator

**Installation:**
```bash
# Install Xcode command line tools (if needed)
xcode-select --install

# Run on iOS Simulator
npm run ios
```

**Manual Testing on Device:**
1. Download "Expo Go" from App Store
2. Run `npm start`
3. Scan QR code with iPhone camera or Expo Go app
4. Allow camera permission when prompted

### Android Setup

**Requirements:**
- Android Studio installed
- Android Emulator configured

**Installation:**
```bash
# Run on Android Emulator
npm run android
```

**Manual Testing on Device:**
1. Download "Expo Go" from Google Play
2. Run `npm start`
3. Scan QR code with Android device
4. Allow camera permission when prompted

### Web Setup (Limited)

```bash
npm run web
```

**Note:** Web version has limited functionality (camera may not work depending on browser support).

---

## 🔧 Detailed Configuration

### Environment Variables

Create `.env` file in project root:

```env
# Required: Your OpenAI API Key
OPENAI_API_KEY=sk-your-actual-key-here

# Optional: Daily calorie goal (default: 2000)
DAILY_CALORIE_GOAL=2000
```

**Never commit `.env` to version control!**

Add to `.gitignore`:
```
.env
.env.local
node_modules/
```

### OpenAI API Configuration

**Step 1: Create Account**
- Visit https://platform.openai.com
- Sign up with email
- Verify email address

**Step 2: Set up Billing (Optional for free trial)**
- Go to https://platform.openai.com/account/billing/overview
- View free credits ($5 for first 3 months)
- Optionally add payment method for continued access

**Step 3: Create API Key**
- Navigate to https://platform.openai.com/api-keys
- Click "Create new secret key"
- Copy the key (you won't see it again)
- Paste into `.env` file

**Step 4: Test the Key**
```bash
# Test API key connectivity
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer sk-your-key-here"
```

Should return a list of available models.

---

## 📦 Dependency Installation Troubleshooting

### If Dependencies Fail to Install

```bash
# Clear cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Specific Package Issues

**expo-camera:**
```bash
npm install expo-camera@latest
```

**AsyncStorage:**
```bash
npm install @react-native-async-storage/async-storage
```

**Navigation:**
```bash
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
```

---

## 🎮 Running the App

### Development Mode
```bash
# Start Expo development server
npm start

# Press 'i' for iOS
# Press 'a' for Android
# Press 'w' for Web
```

### Production Build

**For iOS:**
```bash
expo build:ios
# Follow prompts, returns .ipa file
```

**For Android:**
```bash
expo build:android
# Generates APK or AAB file
```

### Simulator Commands

**iOS Simulator:**
```bash
# Open simulator
open -a Simulator

# Run app
npm run ios
```

**Android Emulator:**
```bash
# List available emulators
emulator -list-avds

# Start specific emulator
emulator -avd Pixel_4_API_30

# Run app
npm run android
```

---

## 🐛 Debugging

### View Console Logs
```bash
npm start
# Logs appear in terminal and Expo CLI

# On device: Shake phone to open Expo menu
# Tap "View logs"
```

### Enable Debug Mode
In `App.js`, add:
```javascript
import { LogBox } from 'react-native';

// Suppress specific warnings
LogBox.ignoreLogs(['Non-serializable values']);

// Enable all logs
if (__DEV__) {
  console.log('App in development mode');
}
```

### Hot Reload
- **Save file** → Auto reload (fast refresh)
- **Shake device** → Open Expo menu
- **Select "Reload"** for full reload

### Network Debugging
Use Expo DevTools:
```bash
npm start
# Press 'd' for DevTools
# Inspect network requests
```

---

## 📊 Project Structure Explained

```
CalorieTracker/
├── App.js                    # Root component with navigation
├── app.json                  # Expo configuration
├── .env                      # API keys & config (NOT in git)
├── package.json              # Dependencies
├── src/
│   ├── screens/              # Screen components
│   │   ├── CameraScreen.js   # Photo capture
│   │   ├── DashboardScreen.js # Home/stats
│   │   └── SettingsScreen.js # Settings
│   ├── components/           # Reusable UI components
│   ├── services/             # API & storage logic
│   ├── store/                # Zustand state
│   ├── styles/               # Theme & styling
│   └── utils/                # Helper functions
└── assets/                   # Images, fonts, etc.
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Node.js installed (`node --version`)
- [ ] Expo CLI installed (`expo --version`)
- [ ] `.env` file created with API key
- [ ] `npm install` completed without errors
- [ ] `npm start` runs successfully
- [ ] Simulator/Emulator starts
- [ ] App loads in simulator
- [ ] Camera permission request appears
- [ ] Settings screen loads
- [ ] You can take a photo without errors

---

## 🆘 Common Issues & Solutions

### Issue: "OPENAI_API_KEY is undefined"
**Solution:**
1. Check `.env` file exists in project root
2. Verify key starts with `sk-`
3. Restart `npm start`
4. Clear app cache: `npm cache clean --force`

### Issue: "Cannot find module '@react-native-async-storage/async-storage'"
**Solution:**
```bash
npm install @react-native-async-storage/async-storage
npm start
```

### Issue: "Camera permission denied"
**Solution:**
1. Open Settings on device
2. Find CalorieTracker app
3. Grant Camera permission
4. Restart app

### Issue: "Module not found: expo-camera"
**Solution:**
```bash
npm install expo-camera
expo prebuild --clean
```

### Issue: "Port 19000 already in use"
**Solution:**
```bash
# Kill process using port 19000
# Mac/Linux:
lsof -ti:19000 | xargs kill -9

# Or choose different port:
npm start -- --port 19001
```

---

## 📚 Additional Resources

- **Expo Documentation:** https://docs.expo.dev
- **React Native Docs:** https://reactnative.dev
- **OpenAI API Docs:** https://platform.openai.com/docs
- **React Navigation:** https://reactnavigation.org
- **Zustand Docs:** https://github.com/pmndrs/zustand

---

## 🚀 Next Steps

1. ✅ Complete initial setup
2. Run app and test basic functionality
3. Customize daily calorie goal in Settings
4. Log some test meals with camera
5. Review data in Dashboard
6. Explore code and customize styling

---

**Need help?** Check the README.md for feature documentation and troubleshooting!
