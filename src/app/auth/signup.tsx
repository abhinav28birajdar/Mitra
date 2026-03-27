import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { auth, createUserWithEmailAndPassword, updateProfile } from '../../services/firebase';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { useAuthStore } from '../../store/useAuthStore';
import { syncUserProfile } from '../../services/userService';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { persistUser } = useAuthStore();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      await updateProfile(firebaseUser, { displayName: name });
      
      // Sync user profile in Firestore
      const profile = await syncUserProfile(firebaseUser.uid, {
        name,
        email,
      });

      await persistUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: profile.name,
      });

      router.replace('/(tabs)/home' as any);
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={typography.h1}>Join Aakar Lite</Text>
          <Text style={[typography.body, styles.subtitle]}>Create an account to start your journey</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <Input
            label="Email Address"
            placeholder="example@mail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button
            title="Create Account"
            onPress={handleSignup}
            loading={loading}
            style={styles.button}
          />

          <View style={styles.footer}>
            <Text style={typography.bodySmall}>Already have an account? </Text>
            <Link href={"/auth/login" as any} asChild>
              <TouchableOpacity>
                <Text style={[typography.bodySmall, styles.link]}>Login</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  header: {
    marginBottom: spacing.xxl,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  link: {
    color: colors.primary,
    fontWeight: '700',
  },
});
