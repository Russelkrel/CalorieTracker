CalorieTracker - React Native Expo App

A sleek, minimalist calorie tracking app powered by OpenAI Vision API for intelligent food recognition and nutritional analysis.

 Features

- AI-Powered Food Recognition - Snap photos of your meals and get instant nutritional analysis
- Daily Progress Tracking - Visual dashboard with daily calorie goal and remaining calories
- Local Data Storage** - All meal data stored locally on your device
- Minimalist Design- Black & electric blue modern UI
- Customizable Settings- Set your daily calorie goal and preferences
- Secure API Key Storage - OpenAI API key stored securely

Quick Start

Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- OpenAI API key (get free $5 credits at https://platform.openai.com)

Setup
```bash
# Install dependencies
npm install

# Create .env file with your OpenAI API key
echo 'OPENAI_API_KEY=your_api_key_here' > .env

# Start development server
npm start

# Choose your platform:
# Press 'i' for iOS Simulator
# Press 'a' for Android Emulator
# Press 'w' for Web
```

**For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)**

 How to Use

 1. Logging a Meal
- Tap the Camera tab
- Take a photo of your food
- Select meal type (Breakfast, Lunch, Dinner, Snack)
- Tap Analyze to get nutritional info
- Meal is automatically saved

 2. Tracking Progress
- View Dashboard to see:
  - Total calories consumed today
  - Remaining calories to goal
  - Daily progress percentage
  - All logged meals with details

 3. Customizing Settings
- Tap Settings to:
  - Set your daily calorie goal
  - Choose measurement units
  - View app information

 Design

Color Scheme:
- Primary:Electric Blue (#00D9FF)
- Secondary: Dark Blue (#0099CC)  
- Background: Pure Black (#000000)
- Surface: Dark Gray (#1A1A1A)
- Text: White (#FFFFFF)

Minimalist, modern design optimized for dark mode.

Project Structure

```
CalorieTracker/
├── src/
│   ├── screens/           # Main app screens
│   ├── components/        # Reusable UI components
│   ├── services/          # API & storage services
│   ├── store/             # Zustand state management
│   ├── styles/            # Theme & styling
│   └── utils/             # Helper functions
├── .env                   # API keys (NOT in git)
├── app.json               # Expo configuration
├── package.json           # Dependencies
└── README.md              # This file
```

OpenAI API Setup

 Get Your API Key
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (format: `sk-...`)
5. Add to `.env` file: `OPENAI_API_KEY=sk-your-key`

 Free Trial Benefits
-  in free credits for new accounts
- Expires after 3 months
- Enough for ~500 food image analyses
- See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions

 Documentation

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed setup & troubleshooting
- [prd.md](./prd.md)** - Product requirements & specifications

 Development

 Available Commands
```bash
npm start           # Start development server
npm run ios         # Run on iOS Simulator
npm run android     # Run on Android Emulator
npm run web         # Run in web browser
npm run build:ios   # Build for iOS
npm run build:android # Build for Android
```

 Project Technology Stack
- Framework: React Native with Expo
- State Management:Zustand
- Navigation: React Navigation
- API:OpenAI Vision API
- Storage: AsyncStorage + Secure Storage
- UI Components: React Native Paper
- Charts:React Native Chart Kit

 Dependencies

```json
{
  "@react-navigation/native": "^6+",
  "@react-navigation/bottom-tabs": "^6+",
  "@react-navigation/stack": "^6+",
  "zustand": "^4+",
  "axios": "^1+",
  "expo-camera": "^latest",
  "@react-native-async-storage/async-storage": "^1+",
  "expo-secure-store": "^latest"
}
```

Limitations (v1)

- No offline analysis (requires internet)
- Local storage only (no cloud backup yet)
- No barcode scanning
- English language only
- AI accuracy depends on image quality

 Troubleshooting

"API key not configured"
- Verify `.env` file exists with valid key
- Restart app with `npm start`

"Camera not working"
- Grant camera permissions in Settings
- Restart the app

"Module not found"
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

See [SETUP_GUIDE.md](./SETUP_GUIDE.md#-common-issues--solutions) for more troubleshooting.

 Security

- API keys stored securely (never hardcoded)
- All data kept local on device
- HTTPS only for API calls
- No cloud storage of images

Roadmap

Phase 2: Charts, cloud sync, quick-add history
Phase 3: Barcode scanning, Apple Health integration, social features

 License

MIT License

 Support

- Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed help
- See [Expo Docs](https://docs.expo.dev)
- Review [OpenAI Docs](https://platform.openai.com/docs)

---


