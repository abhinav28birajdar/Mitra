
# 🔐 Firebase Production Setup Guide

This document outlines the steps to set up and configure Firebase for the **Mitra AI** production environment.

## 1. Firebase Console Configuration

### Step A: Project Creation
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and name it `Mitra AI`.
3. Disable/Enable Google Analytics as per your preference.

### Step B: Enable Authentication
1. Navigate to **Authentication** > **Get Started**.
2. Enable the **Email/Password** provider.
3. (Optional) Enable **Google** provider and configure the Client IDs.
4. Set the **Password Reset** and **Email Verification** templates in the "Templates" tab.

### Step C: Firestore Setup
1. Navigate to **Firestore Database** > **Create Database**.
2. Select **Production Mode**.
3. Choose a location (e.g., `us-central1`).
4. Apply the security rules provided in `firestore.rules`.

### Step D: Storage Setup
1. Navigate to **Storage** > **Get Started**.
2. Apply the security rules provided in `storage.rules`.

## 2. Platform SDK Setup

### Android Configuration
Ensure `google-services.json` is placed in the root directory (for Expo) or `android/app/` (for bare React Native).

#### Root-level `build.gradle` (`android/build.gradle`):
```gradle
plugins {
  // ...
  id("com.google.gms.google-services") version "4.4.4" apply false
}
```

#### App-level `build.gradle` (`android/app/build.gradle`):
```gradle
plugins {
  id("com.android.application")
  id("com.google.gms.google-services")
  ...
}

dependencies {
  // Import the Firebase BoM
  implementation(platform("com.google.firebase:firebase-bom:34.9.0"))
  implementation("com.google.firebase:firebase-analytics")
  // Add other libraries if using react-native-firebase
}
```

### iOS Configuration
Ensure `GoogleService-Info.plist` is added to your Xcode project.

## 3. Environment Variables (.env)

Create a `.env` file in the root directory with the following keys from your Firebase Project Settings:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 4. Security Rules

### Firestore Rules
```javascript
// Copy contents from firestore.rules
```

### Storage Rules
```javascript
// Copy contents from storage.rules
```

## 5. Real-time Architecture
The application uses **Firestore Snapshots** for real-time updates:
- **Auth State**: Handled via `onAuthStateChanged` in `AuthContext`.
- **User Profile**: Handled via `onSnapshot` in `AuthContext` to ensure UI updates instantly when profile data changes.
- **Notifications/Chats**: Managed via real-time listeners in their respective stores/services.

## 6. Deployment
To deploy to production:
1. Run `npx expo prebuild` (if using native modules).
2. Run `eas build --platform all` to generate production binaries.
3. For web (if applicable): `npx expo export` and `firebase deploy`.
