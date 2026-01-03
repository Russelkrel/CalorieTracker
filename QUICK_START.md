# QUICK_START.md

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd /path/to/CalorieTracker
npm install
```
Expected time: 1-2 minutes

### Step 2: Get OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Sign up (you get $5 free credits)
3. Create API key
4. Copy the key (looks like `sk-...`)

### Step 3: Configure Environment
```bash
# Create .env file
echo "OPENAI_API_KEY=sk-your-key-here" > .env
```

Replace `sk-your-key-here` with your actual key.

### Step 4: Start the App
```bash
npm start
```

### Step 5: Choose Your Platform
When you see the Expo CLI menu:
- **`i`** = iOS Simulator (macOS only)
- **`a`** = Android Emulator
- **`w`** = Web Browser
- **Scan QR** = Use Expo Go app on phone

---

## ✅ First Test

Once app loads:

1. ✅ Tap **Dashboard** tab - should show empty state
2. ✅ Tap **Camera** tab - should request camera permission
3. ✅ Grant camera permission
4. ✅ Tap Settings ⚙️ - should load settings screen
5. ✅ Go back to Dashboard

**Congratulations! Your app is working! 🎉**

---

## 📷 First Meal Log (Optional Test)

1. Go to Camera tab
2. Take a photo (any image with food)
3. Select meal type
4. Tap Analyze
5. Wait for AI analysis (requires internet)
6. Review results
7. Check Dashboard to see logged meal

**Note:** First analysis may take 10-15 seconds (API startup time).

---

## ⚡ Common Next Steps

- **Adjust Daily Goal:** Settings → Change calorie goal
- **View Code:** Open `src/App.js` to explore
- **Customize Colors:** Edit `src/styles/theme.js`
- **Deep Dive:** Read [README.md](./README.md) and [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## 🆘 Stuck?

1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md#-common-issues--solutions)
2. Verify `.env` file has correct API key
3. Try: `npm cache clean --force && npm install`
4. Restart the app: `npm start`

---

**Happy tracking! 💪📱**
