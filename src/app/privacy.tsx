import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

const PRIVACY_TOGGLES = [
  { id: 'publicProfile', title: 'Public Profile', desc: 'Allow others to see your badges and rank.', default: true },
  { id: 'showProgress', title: 'Show Progress', desc: 'Display your current courses on your profile.', default: true },
  { id: 'activityStatus', title: 'Activity Status', desc: 'Show when you are active to your connections.', default: false },
  { id: 'usageAnalytics', title: 'Usage Analytics', desc: 'Help us improve Mitra by sharing anonymous data.', default: true },
];

export default function PrivacyScreen() {
  const router = useRouter();
  
  // Custom hook or state can be used here. For UI accuracy, local state is used:
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    publicProfile: true,
    showProgress: true,
    activityStatus: false,
    usageAnalytics: true,
  });

  const handleToggle = (id: string, value: boolean) => {
    setToggles(prev => ({ ...prev, [id]: value }));
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        <Text style={styles.description}>
          Manage how your data is shared and who can see your activity on Mitra.
        </Text>

        <View style={styles.card}>
          {PRIVACY_TOGGLES.map((item, index) => {
            const isLast = index === PRIVACY_TOGGLES.length - 1;
            const isEnabled = toggles[item.id];
            
            return (
              <React.Fragment key={item.id}>
                <View style={styles.toggleRow}>
                  <View style={styles.toggleTextContainer}>
                    <Text style={styles.toggleTitle}>{item.title}</Text>
                    <Text style={styles.toggleDesc}>{item.desc}</Text>
                  </View>
                  <Switch
                    trackColor={{ false: '#E2E8F0', true: colors.primary }}
                    thumbColor={isEnabled ? '#4ADE80' : '#F8FAFC'}
                    ios_backgroundColor="#E2E8F0"
                    onValueChange={(val) => handleToggle(item.id, val)}
                    value={isEnabled}
                  />
                </View>
                {!isLast && <View style={styles.divider} />}
              </React.Fragment>
            );
          })}
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <Text style={styles.actionButtonTextPrimary}>Request My Data</Text>
            <Feather name="download" size={20} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <Text style={styles.actionButtonTextDanger}>Delete Account</Text>
            <Feather name="trash-2" size={20} color={colors.error} />
          </TouchableOpacity>
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
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
    lineHeight: 24,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    marginBottom: spacing.xxl,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },
  toggleTextContainer: {
    flex: 1,
    paddingRight: spacing.xl,
  },
  toggleTitle: {
    ...typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  toggleDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  actionsContainer: {
    gap: spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  actionButtonTextPrimary: {
    ...typography.body,
    fontWeight: '700',
    color: colors.primary,
  },
  actionButtonTextDanger: {
    ...typography.body,
    fontWeight: '700',
    color: colors.error,
  },
});
