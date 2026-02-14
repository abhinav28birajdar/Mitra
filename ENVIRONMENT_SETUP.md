# Environment Setup Guide

## 🔒 Security Notice

**IMPORTANT**: Never commit sensitive files to version control!

The following files contain sensitive information and are excluded from Git:
- `.env` - Environment variables with API keys
- `google-services.json` - Firebase Android configuration
- `GoogleService-Info.plist` - Firebase iOS configuration (when added)

---

## 📋 Required Files Setup

### 1. Environment Variables (.env)

**Step 1**: Copy the example file
```bash
cp .env.example .env
```

**Step 2**: Get your Firebase credentials
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Go to **Project Settings** ⚙️ > **General**
4. Scroll to **Your apps** section
5. Click on your web app or create one
6. Copy the configuration values

**Step 3**: Update `.env` with your actual values
```env
FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=123456789012
FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

### 2. Firebase Android Configuration (google-services.json)

**Step 1**: Download from Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** ⚙️ > **General**
4. Scroll to **Your apps** section
5. Click on your Android app (or add one if not exists)
6. Click **Download google-services.json**

**Step 2**: Place the file in project root
```bash
# Place the downloaded file here:
MitraApp/google-services.json
```

**Important**: 
- ✅ The file should be in the root directory
- ✅ The package name should match: `com.mitra.app`
- ❌ Never commit this file to Git (already in .gitignore)

---

### 3. Firebase iOS Configuration (GoogleService-Info.plist)

**When you need iOS support:**

**Step 1**: Download from Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** ⚙️ > **General**
4. Scroll to **Your apps** section
5. Click on your iOS app (or add one if not exists)
6. Click **Download GoogleService-Info.plist**

**Step 2**: Place the file in iOS directory
```bash
# After running: npx expo prebuild
# Place the file here:
MitraApp/ios/MitraApp/GoogleService-Info.plist
```

---

## 🔐 API Keys (Optional)

### OpenAI API Key
If using AI features:
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an API key
3. Add to `.env`: `OPENAI_API_KEY=sk-...`

### Stripe Public Key
If using payments:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your publishable key
3. Add to `.env`: `STRIPE_PUBLIC_KEY=pk_...`

### Agora App ID
If using video/voice calls:
1. Go to [Agora Console](https://console.agora.io/)
2. Create a project
3. Get your App ID
4. Add to `.env`: `AGORA_APP_ID=...`

---

## ✅ Verification Checklist

Before running the app, ensure:

- [ ] `.env` file exists with all Firebase credentials
- [ ] `google-services.json` exists in root directory
- [ ] Package name in `google-services.json` matches `com.mitra.app`
- [ ] Firebase project is active and billing is enabled (if needed)
- [ ] Authentication methods are enabled in Firebase Console
- [ ] Firestore database is created
- [ ] Storage bucket is created

---

## 🚀 First Time Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy environment files
cp .env.example .env

# 3. Edit .env with your credentials
# Use your favorite editor to update .env

# 4. Download google-services.json from Firebase
# Place it in the root directory

# 5. Start the development server
npx expo start

# 6. For native builds (optional)
npx expo prebuild
npx expo run:android  # For Android
npx expo run:ios      # For iOS (Mac only)
```

---

## 🔄 Team Setup

When a new team member joins:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MitraApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get credentials from team lead**
   - Request `.env` file (via secure channel, NOT email)
   - Request `google-services.json` (via secure channel)
   - Or get Firebase Console access to download yourself

4. **Place files in correct locations**
   ```bash
   # .env in root
   # google-services.json in root
   ```

5. **Verify setup**
   ```bash
   npx expo start
   ```

---

## 🛡️ Security Best Practices

### ✅ DO:
- Keep `.env` and `google-services.json` files private
- Share credentials via secure channels (1Password, LastPass, etc.)
- Rotate API keys regularly
- Use different Firebase projects for dev/staging/production
- Enable Firebase App Check for production
- Restrict API keys in Firebase Console

### ❌ DON'T:
- Commit `.env` or `google-services.json` to Git
- Share credentials via email or Slack
- Use production credentials in development
- Hardcode API keys in source code
- Share credentials in screenshots
- Push sensitive files to public repositories

---

## 🐛 Troubleshooting

### "Firebase not initialized" error
- ✅ Check `.env` file exists
- ✅ Check all Firebase variables are set
- ✅ Restart Metro bundler: `npx expo start --clear`

### "google-services.json not found" error
- ✅ Check file is in root directory
- ✅ Check file name is exactly `google-services.json`
- ✅ Check package name matches `com.mitra.app`

### "Invalid API key" error
- ✅ Check API key in `.env` matches Firebase Console
- ✅ Check API key restrictions in Firebase Console
- ✅ Try regenerating the API key

### Environment variables not loading
- ✅ Restart Metro bundler: `npx expo start --clear`
- ✅ Check `.env` file format (no quotes around values)
- ✅ Check `babel.config.js` has `react-native-dotenv` plugin

---

## 📞 Support

If you encounter issues:
1. Check this guide
2. Review Firebase Console for errors
3. Check Metro bundler logs
4. Review `SETUP_GUIDE.md`
5. Review `FIREBASE_SETUP.md`

---

## 🔗 Useful Links

- [Firebase Console](https://console.firebase.google.com/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)

---

**Last Updated**: February 14, 2026
**Status**: ✅ Production-Ready Configuration
