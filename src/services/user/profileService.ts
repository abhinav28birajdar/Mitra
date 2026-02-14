import { db, Collections } from '../../lib/firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
  limit as firestoreLimit,
  serverTimestamp
} from 'firebase/firestore';
import { Profile } from '@app-types/firebase.types';

// =============================================
// PROFILE INTERFACES
// =============================================

export interface UserSettings {
  user_id: string;
  push_notifications: boolean;
  email_notifications: boolean;
  sms_notifications: boolean;
  in_app_notifications: boolean;
  notify_new_message: boolean;
  notify_course_updates: boolean;
  notify_achievements: boolean;
  notify_reminders: boolean;
  notify_promotions: boolean;
  notify_social: boolean;
  profile_visibility: 'public' | 'friends' | 'private';
  show_progress: boolean;
  show_achievements: boolean;
  show_activity: boolean;
  allow_friend_requests: boolean;
  allow_messages_from: 'everyone' | 'friends' | 'none';
  theme: 'light' | 'dark' | 'system';
  auto_play_videos: boolean;
  download_on_wifi_only: boolean;
  data_saver_mode: boolean;
  biometric_enabled: boolean;
  two_factor_enabled: boolean;
  remember_me: boolean;
  session_timeout_minutes: number;
}

export interface OnboardingData {
  current_step: number;
  goal_selection: string[];
  interest_selection: string[];
  skills_assessment: any[];
  learning_style?: string;
  career_aspirations: string[];
  time_commitment?: string;
  user_current_role?: string;
  experience_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  referral_source?: string;
  completed_at?: string;
}

// =============================================
// PROFILE CRUD
// =============================================

export const fetchProfile = async (userId: string): Promise<Profile> => {
  const profileDoc = await getDoc(doc(db, Collections.PROFILES, userId));
  if (!profileDoc.exists()) throw new Error('Profile not found');
  return { id: profileDoc.id, ...profileDoc.data() } as Profile;
};

export const updateProfile = async (userId: string, updates: Partial<Profile>): Promise<Profile> => {
  const profileRef = doc(db, Collections.PROFILES, userId);
  const completionScore = calculateProfileCompletion({ ...updates, id: userId } as any);
  await updateDoc(profileRef, {
    ...updates,
    profileCompletion: completionScore,
    updatedAt: serverTimestamp(),
  });
  return await fetchProfile(userId);
};

export const getPublicProfile = async (userId: string): Promise<Profile | null> => {
  const profileDoc = await getDoc(doc(db, Collections.PROFILES, userId));
  if (!profileDoc.exists()) return null;
  const data = profileDoc.data() as any;
  return {
    id: profileDoc.id,
    displayName: data.displayName || data.full_name,
    avatar: data.avatar || data.avatar_url,
    bio: data.bio,
    location: data.location,
  } as any;
};

export const searchProfiles = async (searchQuery: string, searchLimit: number = 20): Promise<Profile[]> => {
  const q = query(
    collection(db, Collections.PROFILES),
    where('displayName', '>=', searchQuery),
    where('displayName', '<=', searchQuery + '\uf8ff'),
    firestoreLimit(searchLimit)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
};

export const getMentors = async (mentorLimit: number = 20): Promise<Profile[]> => {
  const q = query(
    collection(db, Collections.PROFILES),
    where('role', '==', 'mentor'),
    firestoreLimit(mentorLimit)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
};

// =============================================
// PROFILE COMPLETION
// =============================================

export const calculateProfileCompletion = (profile: Partial<Profile>): number => {
  const fields = [
    { field: 'full_name', weight: 15 }, { field: 'avatar_url', weight: 15 },
    { field: 'bio', weight: 10 }, { field: 'location', weight: 5 },
    { field: 'date_of_birth', weight: 5 }, { field: 'occupation', weight: 10 },
    { field: 'company', weight: 5 }, { field: 'website', weight: 5 },
    { field: 'linkedin_url', weight: 10 }, { field: 'twitter_url', weight: 5 },
    { field: 'github_url', weight: 5 }, { field: 'phone', weight: 10 },
  ];
  let total = 0;
  for (const { field, weight } of fields) {
    if (profile[field as keyof Profile]) total += weight;
  }
  return total;
};

// =============================================
// USER SETTINGS
// =============================================

export const fetchUserSettings = async (userId: string): Promise<UserSettings> => {
  const settingsDoc = await getDoc(doc(db, Collections.USER_SETTINGS, userId));
  if (!settingsDoc.exists()) return await createDefaultSettings(userId);
  return settingsDoc.data() as UserSettings;
};

export const updateUserSettings = async (userId: string, updates: Partial<UserSettings>): Promise<UserSettings> => {
  await setDoc(doc(db, Collections.USER_SETTINGS, userId),
    { user_id: userId, ...updates },
    { merge: true }
  );
  return await fetchUserSettings(userId);
};

const createDefaultSettings = async (userId: string): Promise<UserSettings> => {
  const defaultSettings: UserSettings = {
    user_id: userId,
    push_notifications: true, email_notifications: true, sms_notifications: false,
    in_app_notifications: true, notify_new_message: true, notify_course_updates: true,
    notify_achievements: true, notify_reminders: true, notify_promotions: false,
    notify_social: true, profile_visibility: 'public', show_progress: true,
    show_achievements: true, show_activity: true, allow_friend_requests: true,
    allow_messages_from: 'everyone', theme: 'system', auto_play_videos: true,
    download_on_wifi_only: true, data_saver_mode: false, biometric_enabled: false,
    two_factor_enabled: false, remember_me: true, session_timeout_minutes: 60,
  };
  await setDoc(doc(db, Collections.USER_SETTINGS, userId), defaultSettings);
  return defaultSettings;
};

// =============================================
// ONBOARDING
// =============================================

export const fetchOnboardingData = async (userId: string): Promise<OnboardingData | null> => {
  const onboardingDoc = await getDoc(doc(db, Collections.USER_ONBOARDING, userId));
  if (!onboardingDoc.exists()) return null;
  return onboardingDoc.data() as OnboardingData;
};

export const updateOnboardingData = async (userId: string, updates: Partial<OnboardingData>): Promise<OnboardingData> => {
  await setDoc(doc(db, Collections.USER_ONBOARDING, userId),
    { user_id: userId, ...updates },
    { merge: true }
  );
  return await fetchOnboardingData(userId) as OnboardingData;
};

export const completeOnboarding = async (userId: string): Promise<void> => {
  await updateDoc(doc(db, Collections.USER_ONBOARDING, userId), {
    completed_at: new Date().toISOString()
  });
  await updateDoc(doc(db, Collections.PROFILES, userId), {
    onboarding_completed: true,
    updated_at: serverTimestamp()
  });
};
