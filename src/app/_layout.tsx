import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useAuthStore } from '../store/useAuthStore';
import { auth, onAuthStateChanged } from '../services/firebase';
import { syncUserProfile } from '../services/userService';
import { Loader } from '../components/Loader';

export default function RootLayout() {
  const { user, setUser, isLoading, setLoading, loadPersistedUser } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // 1. Initially load from SecureStore for instant UI response (no flickering)
    loadPersistedUser();

    // 2. Listen for Firebase Auth changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: any) => {
      if (firebaseUser) {
        // Sync with Firestore profile
        const profile = await syncUserProfile(firebaseUser.uid, {
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || '',
        });
        
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: profile.name,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [loadPersistedUser, setUser, setLoading]);

  useEffect(() => {
    if (isLoading) return;

    const segs = segments as string[];
    const inAuthGroup = segs[0] === 'auth' || segs[0] === 'onboarding';

    if (!user && !inAuthGroup) {
      // Redirect to onboarding/auth if not logged in
      router.replace('/onboarding' as any);
    } else if (user && inAuthGroup) {
      // Redirect to dashboard if logged in
      router.replace('/(tabs)/home' as any);
    }
  }, [user, segments, isLoading, router]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
