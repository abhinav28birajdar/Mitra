import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

const LOGIN_SECURITY = [
  { id: 'password', icon: 'key-outline', library: 'MaterialCommunityIcons', color: colors.primary, bgColor: colors.primaryLight, title: 'Change Password', subtitle: 'Update your login credentials' },
  { id: '2fa', icon: 'lock-outline', library: 'MaterialCommunityIcons', color: colors.success, bgColor: '#ECFDF5', title: 'Two-Factor Auth', subtitle: 'Highly recommended for safety' },
  { id: 'faceId', icon: 'fingerprint', library: 'MaterialCommunityIcons', color: colors.primary, bgColor: colors.primaryLight, title: 'Face ID / Bio', subtitle: 'Enable quick secure login' },
];

const DEVICE_MANAGEMENT = [
  { id: 'sessions', icon: 'tablet-cellphone', library: 'MaterialCommunityIcons', color: colors.primary, bgColor: colors.primaryLight, title: 'Active Sessions', subtitle: 'Manage logged in devices' },
  { id: 'activity', icon: 'clock-outline', library: 'MaterialCommunityIcons', color: colors.primary, bgColor: colors.primaryLight, title: 'Login Activity', subtitle: 'Review recent login history' },
];

export default function SecurityScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusInfo}>
            <Text style={styles.statusLabel}>SECURITY STATUS</Text>
            <Text style={styles.statusTitle}>Excellent</Text>
            <Text style={styles.statusDesc}>Your account is well-protected.</Text>
          </View>
          <View style={styles.shieldIcon}>
            <MaterialCommunityIcons name="shield-check" size={56} color={colors.success} />
          </View>
        </View>

        {/* Login Security */}
        <Text style={styles.sectionTitle}>LOGIN SECURITY</Text>
        <View style={styles.card}>
          {LOGIN_SECURITY.map((item, index) => {
            const isLast = index === LOGIN_SECURITY.length - 1;
            return (
              <React.Fragment key={item.id}>
                <TouchableOpacity style={styles.itemRow} activeOpacity={0.7}>
                  <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
                    <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
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

        {/* Device Management */}
        <Text style={styles.sectionTitle}>DEVICE MANAGEMENT</Text>
        <View style={styles.card}>
          {DEVICE_MANAGEMENT.map((item, index) => {
            const isLast = index === DEVICE_MANAGEMENT.length - 1;
            return (
              <React.Fragment key={item.id}>
                <TouchableOpacity style={styles.itemRow} activeOpacity={0.7}>
                  <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
                    <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
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
  statusCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xxl,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  statusInfo: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  statusTitle: {
    ...typography.h2,
    color: colors.success,
    marginBottom: 6,
  },
  statusDesc: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  shieldIcon: {
    marginLeft: spacing.lg,
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
    marginBottom: spacing.xl,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
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
    marginLeft: 80,
  },
});
