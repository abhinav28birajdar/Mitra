import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

const SETTINGS_SECTIONS = [
  {
    title: 'ACCOUNT',
    items: [
      { id: 'privacy', icon: 'lock', library: 'Feather', title: 'Privacy', subtitle: 'Manage your data and visibility', path: '/privacy' },
      { id: 'security', icon: 'shield-check-outline', library: 'MaterialCommunityIcons', title: 'Security', subtitle: 'Password and account safety', path: '/security' },
      { id: 'notifications', icon: 'bell', library: 'Feather', title: 'Notifications', subtitle: 'Customize your alerts', path: '/notifications' },
    ]
  },
  {
    title: 'PREFERENCES',
    items: [
      { id: 'theme', icon: 'palette-outline', library: 'MaterialCommunityIcons', title: 'Theme', subtitle: 'Light, dark, or system mode', path: '/theme' },
      { id: 'language', icon: 'translate', library: 'MaterialCommunityIcons', title: 'Language', subtitle: 'Choose your preferred language', path: '/language' },
    ]
  },
  {
    title: 'SUPPORT',
    items: [
      { id: 'help', icon: 'help-circle', library: 'Feather', title: 'Help & Support', subtitle: 'FAQs and contact us', path: '/help-support' },
      { id: 'about', icon: 'info', library: 'Feather', title: 'About', subtitle: 'Version and legal info', path: '/about' },
    ]
  }
];

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {SETTINGS_SECTIONS.map((section, sectionIndex) => (
          <View key={section.title} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            <View style={styles.card}>
              {section.items.map((item, index) => {
                const isLast = index === section.items.length - 1;
                return (
                  <React.Fragment key={item.id}>
                    <TouchableOpacity 
                      style={styles.itemRow} 
                      activeOpacity={0.7}
                      onPress={() => router.push(item.path as any)}
                    >
                      <View style={styles.iconContainer}>
                        {item.library === 'Feather' ? (
                          <Feather name={item.icon as any} size={20} color={colors.primary} />
                        ) : (
                          <MaterialCommunityIcons name={item.icon as any} size={22} color={colors.primary} />
                        )}
                      </View>
                      
                      <View style={styles.itemTextContainer}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                      </View>
                      
                      <Feather name="chevron-right" size={20} color={colors.textTertiary} />
                    </TouchableOpacity>
                    
                    {!isLast && <View style={styles.divider} />}
                  </React.Fragment>
                );
              })}
            </View>
          </View>
        ))}
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
  backButton: {
    padding: 8,
    marginLeft: -8,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 40,
  },
  sectionContainer: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginLeft: 4,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 76,
  },
});
