# Mitra AI - Ed-Tech Learning Platform

<p align="center">
  <img src="/assets/images/icon.png" alt="Mitra AI Logo" width="120px">
</p>

## 🎥 Mitra AI Demo

https://github.com/user-attachments/assets/a9ae4479-e8bf-4503-9cb1-bf892c3e18fe 

---
A comprehensive educational technology platform built with React Native, Expo, and Firebase.

## 🚀 Features

### Authentication & Onboarding
- ✅ Email/Password authentication
- ✅ Google Sign-In integration
- ✅ Password reset functionality
- ✅ 5-step personalized onboarding flow
  - Personal information
  - Career interests selection
  - Skills assessment
  - Learning preferences
  - Completion celebration

### Core Features
- 🎓 Personalized learning dashboard
- 📚 Course catalog and exploration
- 📊 Progress tracking and analytics
- 🏆 Gamification (points, badges, streaks)
- 👥 Community features
- 💬 Real-time chat and messaging
- 🎯 Career discovery and guidance
- 🤖 AI-powered recommendations

## 🛠️ Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **Backend**: Firebase (Auth, Firestore, Storage, Functions, Analytics)
- **State Management**: Zustand with Immer
- **Navigation**: React Navigation v7
- **Forms**: React Hook Form + Zod validation
- **UI**: Custom components with theme system
- **API Client**: Axios + React Query

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd MitraApp
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your Firebase credentials:
```env
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
FIREBASE_MEASUREMENT_ID=your-measurement-id
```

4. **Add Firebase configuration files**
- Place `google-services.json` in the project root (Android)
- Place `GoogleService-Info.plist` in the project root (iOS)

5. **Start the development server**
```bash
npm start
```

6. **Run on device/simulator**
```bash
# iOS
npm run ios

# Android
npm run android
```

## 🏗️ Project Structure

```
MitraApp/
├── src/
│   ├── assets/          # Images, icons, fonts
│   ├── components/      # Reusable UI components
│   ├── context/         # React Context providers
│   ├── firebase/        # Firebase configuration
│   ├── hooks/           # Custom React hooks
│   ├── navigation/      # Navigation configuration
│   ├── screens/         # App screens
│   │   ├── auth/        # Authentication screens
│   │   ├── onboarding/  # Onboarding flow
│   │   ├── home/        # Home screen
│   │   ├── explore/     # Course exploration
│   │   ├── learning/    # My learning
│   │   ├── community/   # Community features
│   │   └── profile/     # User profile
│   ├── services/        # API and business logic
│   ├── store/           # Zustand state stores
│   ├── theme/           # Theme configuration
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── App.tsx              # App entry point
├── app.json             # Expo configuration
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript configuration
```

## 🔥 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Google Analytics (recommended)

### 2. Enable Authentication
1. Go to Authentication > Sign-in method
2. Enable Email/Password
3. Enable Google Sign-In

### 3. Create Firestore Database
1. Go to Firestore Database
2. Create database in production mode
3. Set up security rules (see `firebase/firestore.rules`)

### 4. Enable Storage
1. Go to Storage
2. Get started
3. Set up security rules (see `firebase/storage.rules`)

### 5. Download Configuration Files
- **Android**: Download `google-services.json`
- **iOS**: Download `GoogleService-Info.plist`

## 📱 Available Scripts

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run tests
npm test

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🎨 Theme System

The app includes a comprehensive theme system with:
- Light and dark mode support
- Customizable color palettes
- Typography scale
- Spacing system
- Shadow presets
- Border radius tokens

## 🔐 Security

- Firebase Authentication for secure user management
- Firestore security rules for data protection
- Storage rules for file access control
- Environment variables for sensitive data

## 📊 Database Schema

### Collections
- `users` - User accounts
- `profiles` - User profiles and preferences
- `careers` - Career information
- `courses` - Course catalog
- `lessons` - Course lessons
- `enrollments` - User course enrollments
- `progress` - Learning progress tracking
- `notifications` - User notifications
- `achievements` - Gamification achievements
- `streaks` - Daily learning streaks

## 🚧 Roadmap

See [implementation_plan.md](./implementation_plan.md) for the complete development roadmap covering:
- Core learning features
- AI-powered recommendations
- Live classes and webinars
- Social and community features
- Monetization and payments
- Content creation tools
- Advanced features (offline mode, multi-language, etc.)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines before getting started.

## 📞 Support

For support, email support@mitraai.com or join our community Discord.

---

**Built with ❤️ using React Native and Firebase**
