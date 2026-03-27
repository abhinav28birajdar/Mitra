import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

export default function ThemeScreen() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState('System');

  const THEMES = [
    { id: 'Light', icon: 'sun', desc: 'Clean and crisp appearance' },
    { id: 'Dark', icon: 'moon', desc: 'Easy on the eyes in low light' },
    { id: 'System', icon: 'settings', desc: 'Sync with device settings' }
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Feather name="chevron-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Theme</Text>
        <View style={{ width: 44 }} /> {/* Spacer */}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.description}>
          Choose how Mitra looks on your device. &quot;System&quot; will automatically match your phone&apos;s settings.
        </Text>

        <View style={styles.themeList}>
          {THEMES.map((theme) => {
            const isSelected = selectedTheme === theme.id;
            return (
              <TouchableOpacity
                key={theme.id}
                style={[styles.themeCard, isSelected && styles.themeCardSelected]}
                onPress={() => setSelectedTheme(theme.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.iconContainer, 
                  isSelected ? styles.iconContainerSelected : 
                  theme.id === 'Light' ? { backgroundColor: '#FFF7ED' } : 
                  { backgroundColor: '#F3E8FF' }
                ]}>
                  <Feather 
                    name={theme.icon as any} 
                    size={22} 
                    color={
                      isSelected ? colors.primary : 
                      theme.id === 'Light' ? '#F59E0B' : 
                      '#7E22CE'
                    } 
                  />
                </View>

                <View style={styles.themeInfo}>
                  <Text style={styles.themeName}>{theme.id}</Text>
                  <Text style={styles.themeDesc}>{theme.desc}</Text>
                </View>

                {/* Radio Button */}
                <View style={[styles.radioOutline, isSelected && styles.radioOutlineSelected]}>
                  {isSelected && <View style={styles.radioFilled} />}
                </View>
              </TouchableOpacity>
            )
          })}
        </View>

        <Text style={styles.previewTitle}>Preview</Text>
        <View style={styles.previewContainer}>
          <View style={styles.previewHeader} />
          <View style={styles.previewSkeleton1} />
          <View style={styles.previewSkeleton2} />
          <View style={styles.previewCard} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: 60,
    paddingBottom: spacing.lg,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
    lineHeight: 24,
  },
  themeList: {
    marginBottom: spacing.xxl,
  },
  themeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  themeCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight, // soft background
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  iconContainerSelected: {
    backgroundColor: colors.white,
  },
  themeInfo: {
    flex: 1,
  },
  themeName: {
    ...typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  themeDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  radioOutline: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  radioOutlineSelected: {
    borderColor: colors.primary,
  },
  radioFilled: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  previewTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  previewContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    width: '100%',
    height: 200,
    padding: spacing.xl,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  previewHeader: {
    width: '100%',
    height: 60,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  previewSkeleton1: {
    width: '60%',
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    marginTop: spacing.xl,
    marginBottom: 10,
  },
  previewSkeleton2: {
    width: '80%',
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    marginBottom: spacing.xl,
  },
  previewCard: {
    width: '100%',
    height: 80,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
  },
});
