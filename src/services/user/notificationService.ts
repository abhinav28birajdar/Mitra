import { db, Collections } from '../../lib/firebase';
import * as Notifications from 'expo-notifications';
import {
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy as firestoreOrderBy,
  limit as firestoreLimit,
  writeBatch,
  onSnapshot,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { Platform } from 'react-native';

// =============================================
// NOTIFICATION INTERFACES
// =============================================

export interface AppNotification {
  id: string;
  user_id: string;
  type: string;
  category?: string;
  title: string;
  body?: string;
  image_url?: string;
  action_url?: string;
  action_data?: Record<string, any>;
  is_read: boolean;
  read_at?: any;
  is_pushed: boolean;
  pushed_at?: any;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  expires_at?: any;
  created_at: any;
}

// =============================================
// IN-APP NOTIFICATIONS
// =============================================

export const fetchNotifications = async (
  userId: string,
  options?: { limit?: number; unreadOnly?: boolean; category?: string }
): Promise<AppNotification[]> => {
  let q = query(
    collection(db, Collections.NOTIFICATIONS),
    where('user_id', '==', userId)
  );

  if (options?.unreadOnly) {
    q = query(q, where('is_read', '==', false));
  }

  if (options?.category) {
    q = query(q, where('category', '==', options.category));
  }

  q = query(q, firestoreOrderBy('created_at', 'desc'), firestoreLimit(options?.limit || 50));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as AppNotification));
};

export const markNotificationRead = async (notificationId: string): Promise<void> => {
  await updateDoc(doc(db, Collections.NOTIFICATIONS, notificationId), {
    is_read: true,
    read_at: serverTimestamp(),
  });
};

export const createNotification = async (notification: {
  user_id: string; type: string; category?: string; title: string;
  body?: string; image_url?: string; action_url?: string;
  action_data?: Record<string, any>; priority?: 'low' | 'normal' | 'high' | 'urgent';
  expires_at?: any;
}): Promise<AppNotification> => {
  const data = {
    ...notification,
    priority: notification.priority || 'normal',
    is_read: false,
    is_pushed: false,
    created_at: serverTimestamp(),
  };
  const ref = await addDoc(collection(db, Collections.NOTIFICATIONS), data);
  return { id: ref.id, ...data } as any;
};

// =============================================
// PUSH NOTIFICATIONS (Expo Implementation)
// =============================================

export const configurePushNotifications = async (): Promise<void> => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
};

export const requestPushPermissions = async (): Promise<boolean> => {
  if (Platform.OS === 'web') return false;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  return finalStatus === 'granted';
};

export const getPushToken = async (): Promise<string | null> => {
  try {
    const hasPermission = await requestPushPermissions();
    if (!hasPermission) return null;
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  } catch (error) {
    console.error('Error getting push token:', error);
    return null;
  }
};

export const registerPushToken = async (userId: string): Promise<void> => {
  const token = await getPushToken();
  if (!token) return;

  await setDoc(doc(db, Collections.FCM_TOKENS, token), {
    user_id: userId,
    token,
    platform: Platform.OS,
    is_active: true,
    updated_at: serverTimestamp(),
  }, { merge: true });
};

export const sendLocalNotification = async (
  title: string, body: string, data?: Record<string, any>
): Promise<void> => {
  await Notifications.scheduleNotificationAsync({
    content: { title, body, data },
    trigger: null,
  });
};

export const subscribeToNotifications = (userId: string, onNotification: (notification: AppNotification) => void) => {
  const q = query(
    collection(db, Collections.NOTIFICATIONS),
    where('user_id', '==', userId),
    firestoreOrderBy('created_at', 'desc'),
    firestoreLimit(1)
  );

  return onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === 'added') {
        const notification = { id: change.doc.id, ...change.doc.data() } as AppNotification;
        onNotification(notification);
      }
    });
  });
};
