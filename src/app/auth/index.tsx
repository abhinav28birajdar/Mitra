import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export default function AuthIndexScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* Icon Area */}
      <View style={styles.iconContainer}>
        {/* Decorative Floating Dots */}
        <View style={[styles.floatingDot, { backgroundColor: '#3B82F6', top: 0, right: -10, width: 14, height: 14 }]} />
        <View style={[styles.floatingDot, { backgroundColor: '#10B981', bottom: 20, left: -20, width: 12, height: 12 }]} />
        <View style={[styles.floatingDot, { backgroundColor: '#F59E0B', bottom: -10, right: 10, width: 16, height: 16 }]} />
        
        {/* User Request: Use Icon.png in place of 'M' */}
        <Image 
          source={require('../../../assets/images/icon.png')} 
          style={styles.logoImage} 
          resizeMode="contain" 
        />
      </View>

      {/* Typography Content */}
      <View style={styles.textContent}>
        <Text style={styles.title}>Welcome to Mitra</Text>
        <Text style={styles.subtitle}>Unlock your potential with Gemini AI</Text>
        <Text style={styles.bodyText}>
          Start your journey towards your dream career with personalized learning paths and expert AI guidance.
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          activeOpacity={0.8}
          onPress={() => router.push('/auth/login')}
        >
          <Text style={styles.primaryButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          activeOpacity={0.8}
          onPress={() => router.push('/auth/signup')}
        >
          <Text style={styles.secondaryButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      {/* Social Logins */}
      <View style={styles.socialContainer}>
        <Text style={styles.socialText}>OR CONTINUE WITH</Text>
        <View style={styles.socialButtonsRow}>
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
            <MaterialCommunityIcons name="google" size={24} color="#EA4335" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
            <MaterialCommunityIcons name="apple" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our <Text style={styles.footerLink}>Terms</Text> and <Text style={styles.footerLink}>Privacy Policy</Text>.
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFF', // Align with new aesthetic UI
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: 100,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: spacing.xxl,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 24, // Optional depending on how the icon looks
  },
  floatingDot: {
    position: 'absolute',
    borderRadius: 50,
  },
  textContent: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    fontSize: 32,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  bodyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
    lineHeight: 24,
  },
  actionContainer: {
    width: '100%',
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonText: {
    ...typography.body,
    fontWeight: '700',
    color: colors.white,
  },
  secondaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...typography.body,
    fontWeight: '700',
    color: colors.primary,
  },
  socialContainer: {
    width: '100%',
    alignItems: 'center',
  },
  socialText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textTertiary,
    letterSpacing: 1,
    marginBottom: spacing.lg,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    paddingHorizontal: spacing.xl,
  },
  footerText: {
    fontSize: 12,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 18,
  },
  footerLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});
