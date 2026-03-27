import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/useAuthStore';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { signOut } from '../../services/firebase';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
            logout();
          } catch (e) {
            console.error('Logout error', e);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editButton}>
          <Feather name="edit" size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarPlaceholder}>
            {/* Using first letter or placeholder */}
            <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'A'}</Text>
            
            {/* Verify Badge */}
            <View style={styles.verifyBadge}>
              <MaterialCommunityIcons name="shield-check" size={12} color={colors.white} />
            </View>
          </View>
          
          <Text style={styles.userName}>{user?.name || 'Abhinav Birajdar'}</Text>
          <Text style={styles.userRole}>Learning Career Strategy & Product Design</Text>
        </View>

        {/* Level Card */}
        <View style={styles.levelCard}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>Lvl 7</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <View style={styles.progressBarFill} />
            </View>
            <Text style={styles.xpText}>1,450 / 2,000 XP</Text>
          </View>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>1250</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Certificates</Text>
          </View>
        </View>

        {/* Account Settings */}
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={[styles.menuIconBox, { backgroundColor: colors.primaryLight }]}>
              <Feather name="user" size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuItemText}>Personal Information</Text>
            <Feather name="chevron-right" size={20} color={colors.textTertiary} />
          </TouchableOpacity>
          <View style={styles.horizontalDivider} />
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={[styles.menuIconBox, { backgroundColor: '#ECFDF5' }]}>
              <Feather name="bell" size={20} color={colors.success} />
            </View>
            <Text style={styles.menuItemText}>Notification Preferences</Text>
            <Feather name="chevron-right" size={20} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* App Preferences */}
        <Text style={styles.sectionTitle}>App Preferences</Text>
        <View style={styles.menuCard}>
          <TouchableOpacity 
            style={styles.menuItem} 
            activeOpacity={0.7}
            onPress={() => router.push('/settings')}
          >
            <View style={[styles.menuIconBox, { backgroundColor: '#F8FAFC' }]}>
              <Feather name="settings" size={20} color={colors.textSecondary} />
            </View>
            <Text style={styles.menuItemText}>General Settings</Text>
            <Feather name="chevron-right" size={20} color={colors.textTertiary} />
          </TouchableOpacity>
          <View style={styles.horizontalDivider} />
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={[styles.menuIconBox, { backgroundColor: '#F1F5F9' }]}>
              <MaterialCommunityIcons name="translate" size={20} color={colors.textSecondary} />
            </View>
            <Text style={styles.menuItemText}>App Language</Text>
            <Feather name="chevron-right" size={20} color={colors.textTertiary} />
          </TouchableOpacity>
          <View style={styles.horizontalDivider} />
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={[styles.menuIconBox, { backgroundColor: '#F1F5F9' }]}>
              <Feather name="cloud" size={20} color={colors.textSecondary} />
            </View>
            <Text style={styles.menuItemText}>Data Sync</Text>
            <Feather name="chevron-right" size={20} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Support & More */}
        <Text style={styles.sectionTitle}>Support & More</Text>
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.push('/settings')}>
            <View style={[styles.menuIconBox, { backgroundColor: '#F8FAFC' }]}>
              <Feather name="settings" size={20} color={colors.textSecondary} />
            </View>
            <Text style={styles.menuItemText}>App Settings</Text>
            <Feather name="chevron-right" size={20} color={colors.textTertiary} />
          </TouchableOpacity>
          <View style={styles.horizontalDivider} />
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.push('/help-support')}>
            <View style={[styles.menuIconBox, { backgroundColor: '#ECFDF5' }]}>
              <Feather name="help-circle" size={20} color={colors.success} />
            </View>
            <Text style={styles.menuItemText}>Help Center</Text>
            <Feather name="chevron-right" size={20} color={colors.textTertiary} />
          </TouchableOpacity>
          <View style={styles.horizontalDivider} />
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={[styles.menuIconBox, { backgroundColor: '#FFFBEB' }]}>
              <Feather name="star" size={20} color="#F59E0B" />
            </View>
            <Text style={styles.menuItemText}>Rate the App</Text>
            <Feather name="chevron-right" size={20} color={colors.textTertiary} />
          </TouchableOpacity>
          <View style={styles.horizontalDivider} />
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={handleLogout}>
            <View style={[styles.menuIconBox, { backgroundColor: '#FEF2F2' }]}>
              <Feather name="log-out" size={20} color={colors.error} />
            </View>
            <Text style={[styles.menuItemText, { color: colors.textPrimary }]}>Log Out</Text>
            <Feather name="chevron-right" size={20} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Footer info */}
        <View style={styles.footerVersion}>
          <View style={styles.versionDot} />
          <Text style={styles.versionText}>Mitra v1.0.0-build.2025</Text>
        </View>
        <Text style={styles.copyrightText}>© 2025 Mitra AI Learning. All rights reserved.</Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Very soft blue/gray from screenshots
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: 60,
    paddingBottom: spacing.lg,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.white,
  },
  verifyBadge: {
    position: 'absolute',
    bottom: 0,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  userRole: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  levelBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: spacing.md,
  },
  levelBadgeText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  progressContainer: {
    flex: 1,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    marginBottom: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '72%',
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 3,
  },
  xpText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xxl,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  menuIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuItemText: {
    flex: 1,
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 76,
  },
  footerVersion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    marginBottom: 4,
  },
  versionDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
    marginRight: 8,
  },
  versionText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  copyrightText: {
    fontSize: 12,
    color: colors.textTertiary,
    textAlign: 'center',
  },
});
