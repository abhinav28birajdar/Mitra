import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  name?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  persistUser: (user: User) => Promise<void>;
  loadPersistedUser: () => Promise<void>;
}

const USER_STORAGE_KEY = 'aakar_lite_user';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: async () => {
    await SecureStore.deleteItemAsync(USER_STORAGE_KEY);
    set({ user: null, isLoading: false });
  },
  persistUser: async (user) => {
    await SecureStore.setItemAsync(USER_STORAGE_KEY, JSON.stringify(user));
    set({ user });
  },
  loadPersistedUser: async () => {
    try {
      const persistedUser = await SecureStore.getItemAsync(USER_STORAGE_KEY);
      if (persistedUser) {
        set({ user: JSON.parse(persistedUser), isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (e) {
      console.error('Failed to load persisted user', e);
      set({ isLoading: false });
    }
  },
}));
