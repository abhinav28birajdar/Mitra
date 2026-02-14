import { initializeApp, FirebaseApp, getApps, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore, collection, CollectionReference } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getFunctions, Functions } from 'firebase/functions';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';
import Constants from 'expo-constants';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID
} from '@env';

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: FIREBASE_API_KEY || Constants.expoConfig?.extra?.firebaseApiKey || '',
  authDomain: FIREBASE_AUTH_DOMAIN || Constants.expoConfig?.extra?.firebaseAuthDomain || '',
  projectId: FIREBASE_PROJECT_ID || Constants.expoConfig?.extra?.firebaseProjectId || '',
  storageBucket: FIREBASE_STORAGE_BUCKET || Constants.expoConfig?.extra?.firebaseStorageBucket || '',
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID || Constants.expoConfig?.extra?.firebaseMessagingSenderId || '',
  appId: FIREBASE_APP_ID || Constants.expoConfig?.extra?.firebaseAppId || '',
  measurementId: FIREBASE_MEASUREMENT_ID || Constants.expoConfig?.extra?.firebaseMeasurementId,
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
export const functions: Functions = getFunctions(app);

// Initialize analytics only on web and when supported
let analyticsInstance: Analytics | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analyticsInstance = getAnalytics(app);
    }
  });
}

export const analytics = analyticsInstance;
export const firebaseAuth = auth;
export const firebaseDb = db;
export const firebaseStorage = storage;

// Collection Names
export const Collections = {
  PROFILES: 'profiles',
  USER_SETTINGS: 'user_settings',
  USER_ONBOARDING: 'user_onboarding',
  USER_PROGRESS: 'user_progress',
  USER_SESSIONS: 'user_sessions',
  CHATS: 'chats',
  CHAT_MEMBERS: 'chat_members',
  MESSAGES: 'messages',
  NOTIFICATIONS: 'notifications',
  FCM_TOKENS: 'fcm_tokens',
  CAREERS: 'careers',
  CLASSES: 'classes',
  CLASS_MEMBERS: 'class_members',
  STREAKS: 'streaks',
  XP_TRANSACTIONS: 'xp_transactions',
  ACHIEVEMENTS: 'achievements',
  USER_ACHIEVEMENTS: 'user_achievements',
  CHALLENGES: 'challenges',
  USER_CHALLENGES: 'user_challenges',
  GOALS: 'goals',
  LEARNING_PATHS: 'learning_paths',
  MODULES: 'modules',
  LESSONS: 'lessons',
  SKILLS: 'skills',
  USER_SKILLS: 'user_skills',
  STUDY_GROUPS: 'study_groups',
  PAYMENTS: 'payments',
  AI_RECOMMENDATIONS: 'ai_recommendations',
  ENROLLMENTS: 'enrollments',
  MODULE_PROGRESS: 'module_progress',
  AI_CHATS: 'user_ai_chats'
} as const;

// Typed Collection Helpers
export const getCollection = <T = any>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

// Export commonly used collections
export const coursesCollection = getCollection('courses');
export const enrollmentsCollection = getCollection('enrollments');
export const lessonsCollection = getCollection('lessons');
export const progressCollection = getCollection('user_progress');
export const profilesCollection = getCollection('profiles');
export const careersCollection = getCollection('careers');

export default app;
