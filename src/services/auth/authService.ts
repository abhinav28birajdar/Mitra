import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut as firebaseSignOut,
  verifyBeforeUpdateEmail,
  deleteUser
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { auth, db, Collections } from '@lib/firebase';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { Profile } from '@app-types/firebase.types';

// =============================================
// EMAIL AUTHENTICATION
// =============================================

export const signInWithEmail = async (email: string, password: string, rememberMe: boolean = true) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  if (!user) throw new Error('Sign in failed');

  if (rememberMe) {
    await AsyncStorage.setItem('rememberMe', 'true');
    await AsyncStorage.setItem('lastEmail', email);
  } else {
    await AsyncStorage.removeItem('rememberMe');
    await AsyncStorage.removeItem('lastEmail');
  }

  await updateLastLogin(user.uid);
  return { user, session: userCredential };
};

export const signUpWithEmail = async (
  email: string,
  password: string,
  fullName?: string,
  role: 'student' | 'mentor' | 'admin' = 'student',
  phone?: string
) => {
  const passwordValidation = validatePasswordStrength(password);
  if (!passwordValidation.isValid) {
    throw new Error(passwordValidation.message);
  }

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  if (!user) throw new Error('Sign up failed');

  if (fullName) {
    await updateProfile(user, { displayName: fullName });
  }

  const profileData = {
    id: user.uid,
    userId: user.uid,
    email,
    fullName: fullName || '',
    displayName: fullName || email.split('@')[0],
    role,
    phone: phone || null,
    careerInterests: [],
    skills: [],
    stats: {
      coursesEnrolled: 0,
      coursesCompleted: 0,
      totalLearningHours: 0,
      currentStreak: 0,
      longestStreak: 0,
      points: 0,
      level: 1,
    },
    preferences: {
      notifications: true,
      emailUpdates: true,
      theme: 'auto',
    },
    onboardingCompleted: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(doc(db, Collections.PROFILES, user.uid), profileData);

  return { user };
};

// =============================================
// PHONE AUTHENTICATION (Web SDK limitation in Native)
// =============================================

export const signInWithPhone = async (phone: string) => {
  // Note: Phone auth with WEB SDK in React Native is complex (needs recaptcha)
  // For now, providing a placeholder that won't crash the build
  throw new Error('Phone authentication not fully supported in this setup. Use Email/Password.');
};

export const signUpWithPhone = async (phone: string) => {
  return await signInWithPhone(phone);
};

export const verifyPhoneOTP = async (confirmation: any, code: string) => {
  throw new Error('Phone verification not supported in this setup.');
};

// =============================================
// EMAIL VERIFICATION & MAGIC LINK
// =============================================

export const sendVerificationEmail = async () => {
  if (!auth.currentUser) throw new Error('No active user');
  await sendEmailVerification(auth.currentUser);
};

export const resendVerificationEmail = async () => {
  return await sendVerificationEmail();
};

export const isEmailVerified = async (): Promise<boolean> => {
  const user = auth.currentUser;
  if (!user) return false;
  await user.reload();
  return user.emailVerified;
};

// =============================================
// OAUTH PROVIDERS
// =============================================

export const signInWithGoogle = async () => {
  throw new Error('Google Sign-In requires further configuration in web setup.');
};

// =============================================
// PASSWORD MANAGEMENT
// =============================================

export const forgotPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

export const resetPassword = async (newPassword: string) => {
  if (!auth.currentUser) throw new Error('No active user');
  const validation = validatePasswordStrength(newPassword);
  if (!validation.isValid) throw new Error(validation.message);
  await updatePassword(auth.currentUser, newPassword);
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error('No active session');

  const validation = validatePasswordStrength(newPassword);
  if (!validation.isValid) throw new Error(validation.message);

  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
  await updatePassword(user, newPassword);
};

export const updateUserEmail = async (currentPassword: string, newEmail: string) => {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error('No active session');

  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
  await verifyBeforeUpdateEmail(user, newEmail);
  
  // Also update profile record
  await updateDoc(doc(db, Collections.PROFILES, user.uid), {
    email: newEmail,
    updatedAt: serverTimestamp()
  });
};

export const validatePasswordStrength = (password: string): { isValid: boolean; message: string; strength: 'weak' | 'medium' | 'strong' } => {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) return { isValid: false, message: `Password must be at least ${minLength} characters`, strength: 'weak' };
  if (!hasUppercase || !hasLowercase) return { isValid: false, message: 'Password must contain upper and lowercase letters', strength: 'weak' };
  if (!hasNumber) return { isValid: false, message: 'Password must contain at least one number', strength: 'weak' };

  let strength: 'weak' | 'medium' | 'strong' = 'medium';
  if (hasSpecial && password.length >= 12) strength = 'strong';
  return { isValid: true, message: 'Password is valid', strength };
};

// =============================================
// BIOMETRIC AUTHENTICATION
// =============================================

export const isBiometricAvailable = async (): Promise<boolean> => {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  return compatible && enrolled;
};

export const authenticateWithBiometric = async (promptMessage?: string): Promise<boolean> => {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: promptMessage || 'Authenticate to continue',
    cancelLabel: 'Cancel',
    disableDeviceFallback: false,
    fallbackLabel: 'Use Passcode',
  });
  return result.success;
};

// =============================================
// SESSION MANAGEMENT
// =============================================

export const signOut = async () => {
  await AsyncStorage.removeItem('biometricEnabled');
  await firebaseSignOut(auth);
};

export const updateLastLogin = async (userId: string) => {
  const profileRef = doc(db, Collections.PROFILES, userId);
  await updateDoc(profileRef, {
    lastActiveAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

export const getCurrentUser = async () => auth.currentUser;

export const deleteAccount = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('No active session');

  await updateDoc(doc(db, Collections.PROFILES, user.uid), {
    is_verified: false,
    full_name: 'Deleted User',
    updated_at: serverTimestamp()
  });

  await deleteUser(user);
};

export const onAuthStateChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUserProfile = async (userId: string): Promise<Profile> => {
  const docRef = doc(db, Collections.PROFILES, userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Profile;
  }
  throw new Error('Profile not found');
};

export const updateFullProfile = async (userId: string, data: Partial<Profile>): Promise<Profile> => {
  const profileRef = doc(db, Collections.PROFILES, userId);
  await setDoc(profileRef, {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });
  return await getCurrentUserProfile(userId);
};

export const subscribeToProfile = (userId: string, callback: (profile: Profile) => void) => {
  const profileRef = doc(db, Collections.PROFILES, userId);
  return onSnapshot(profileRef, (docSnap) => {
    if (docSnap.exists()) {
      callback({ id: docSnap.id, ...docSnap.data() } as Profile);
    }
  });
};

