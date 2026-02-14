import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { db, Collections } from '../../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Platform } from 'react-native';

export const registerForPushNotificationsAsync = async (userId: string) => {
  if (!Device.isDevice) return null;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') return null;

  // Get Expo push token (better for managed Expo)
  // If you specifically need FCM tokens for the web SDK, use messaging() from firebase/messaging
  // but that requires more setup. For now, we'll store the Expo token.
  const token = (await Notifications.getExpoPushTokenAsync()).data;

  // Store token in Firestore
  await setDoc(doc(db, Collections.FCM_TOKENS, token), {
    user_id: userId,
    token,
    platform: Platform.OS,
    device_name: Device.deviceName ?? 'Unknown',
    is_active: true,
    updated_at: serverTimestamp(),
  }, { merge: true });

  return token;
};
