// =====================================================
// SUPABASE CLIENT CONFIGURATION
// =====================================================

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Database } from './types';

// Replace with your Supabase project credentials
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Create Supabase client with React Native AsyncStorage
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
    realtime: {
        params: {
            eventsPerSecond: 10,
        },
    },
});

// Export configuration for other modules
export const supabaseConfig = {
    url: SUPABASE_URL,
    anonKey: SUPABASE_ANON_KEY,
};

export default supabase;
