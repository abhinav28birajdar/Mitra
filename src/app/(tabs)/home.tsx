import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/useAuthStore';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const QUICK_ACTIONS = [
  { id: '1', name: 'Explore', icon: 'compass', library: 'Feather', bgColor: '#F4F4FF', iconColor: colors.primary, link: '/(tabs)/explore' },
  { id: '2', name: 'AI Chat', icon: 'message-circle', library: 'Feather', bgColor: '#ECFDF5', iconColor: colors.success, link: '/(tabs)/ai-chat' },
  { id: '3', name: 'Goals', icon: 'flag', library: 'Feather', bgColor: '#FFFBEB', iconColor: '#F59E0B', link: '/(tabs)/progress' },
  { id: '4', name: 'Schedule', icon: 'calendar', library: 'Feather', bgColor: '#FDF2F8', iconColor: '#EC4899', link: '/(tabs)/home' },
];

export default function HomeScreen() {
  const { user } = useAuthStore();
  const router = useRouter();
  
  const firstName = user?.name ? user.name.split(' ')[0] : 'Abhinav';

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerProfileRow}>
            {/* Small avatar or simple placeholder if no image */}
            <View style={styles.avatarMini}>
              <Text style={styles.avatarMiniText}>{firstName.charAt(0)}</Text>
            </View>
            <View>
              <Text style={styles.greetingText}>Hey, {firstName} 👋</Text>
              <Text style={styles.subGreetingText}>Let&apos;s master a new skill today!</Text>
            </View>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/notifications')}>
              <Feather name="bell" size={20} color={colors.textPrimary} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/settings')}>
              <Feather name="settings" size={20} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* AI Recommendation Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerBadge}>
            <MaterialCommunityIcons name="creation" size={14} color={colors.white} />
            <Text style={styles.bannerBadgeText}>AI RECOMMENDATION</Text>
          </View>
          
          <Text style={styles.bannerTitle}>Ready to level up?</Text>
          <Text style={styles.bannerDesc}>
             Gemini AI has curated a new module in &quot;UX Design Strategy&quot; just for you.
          </Text>
          
          <TouchableOpacity style={styles.bannerButton} activeOpacity={0.8}>
             <Text style={styles.bannerButtonText}>Start Exploring</Text>
             <Feather name="arrow-right" size={16} color={colors.primary} />
          </TouchableOpacity>

          {/* Faint Lightbulb Icon Overlay - Simulated via absolute positioning */}
          <MaterialCommunityIcons 
             name="lightbulb-outline" 
             size={160} 
             color="rgba(255,255,255,0.08)" 
             style={styles.bannerBgIcon} 
          />
        </View>

        {/* Quick Actions Row */}
        <View style={styles.actionsRow}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity 
              key={action.id} 
              style={styles.actionItem} 
              activeOpacity={0.7}
              onPress={() => router.push(action.link as any)}
            >
              <View style={[styles.actionIconBox, { backgroundColor: action.bgColor }]}>
                {action.library === 'Feather' ? (
                  <Feather name={action.icon as any} size={24} color={action.iconColor} />
                ) : (
                  <MaterialCommunityIcons name={action.icon as any} size={24} color={action.iconColor} />
                )}
              </View>
              <Text style={styles.actionItemText}>{action.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Learning */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <TouchableOpacity>
             <Text style={styles.sectionLink}>My Paths</Text>
          </TouchableOpacity>
        </View>

        {/* Course Card */}
        <TouchableOpacity style={styles.courseCard} activeOpacity={0.9}>
          <View style={styles.courseCardTop}>
             <View style={styles.courseIconBox}>
                <MaterialCommunityIcons name="react" size={40} color="#38BDF8" />
             </View>
             <View style={styles.courseBody}>
                <Text style={styles.courseCategory}>TECHNOLOGY</Text>
                <Text style={styles.courseTitle}>React Native Mastery</Text>
                <View style={styles.courseTimeRow}>
                   <Feather name="clock" size={14} color={colors.textTertiary} />
                   <Text style={styles.courseTimeText}>2h remaining</Text>
                </View>
             </View>
             <View style={styles.progressCircle}>
                <Text style={styles.progressCircleText}>40%</Text>
             </View>
          </View>
          <View style={styles.courseProgressBarBg}>
             <View style={styles.courseProgressBarFill} />
          </View>
        </TouchableOpacity>

        {/* Daily Streak Card */}
        <View style={styles.streakCard}>
          <View style={styles.streakHeader}>
            <View style={styles.streakFireBox}>
               <MaterialCommunityIcons name="fire" size={28} color="#EA580C" />
            </View>
            <View style={styles.streakHeaderTexts}>
               <Text style={styles.streakLabel}>Daily Streak</Text>
               <Text style={styles.streakValue}>5 Days 🔥</Text>
            </View>
          </View>
          <View style={styles.streakDaysRow}>
             {['S','M','T','W','T','F','S'].map((day, idx) => {
               const checked = idx < 3; // Mocking the first 3 days checked
               return (
                 <View key={idx} style={styles.streakDayItem}>
                    <View style={[styles.streakDayBox, checked && styles.streakDayBoxActive]}>
                       {checked && <Feather name="check" size={14} color={colors.white} />}
                    </View>
                    <Text style={styles.streakDayLabel}>{day}</Text>
                 </View>
               );
             })}
          </View>
        </View>

        {/* Featured Modules */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Modules</Text>
        </View>

        <TouchableOpacity style={styles.featuredCard} activeOpacity={0.9}>
           {/* Mock image container */}
           <View style={styles.featuredImagePlaceholder} />
           <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>Intro to Gemini AI</Text>
              <Text style={styles.featuredSubText}>⭐ 4.9 <Text style={styles.featuredSubTextDot}>•</Text> 12 Lessons</Text>
           </View>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFF', // Crisp white background
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  headerProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarMini: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9', // Very light grey back
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarMiniText: {
    ...typography.h3,
    color: colors.primary,
  },
  greetingText: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  subGreetingText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  bannerContainer: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: spacing.xl,
    paddingBottom: 28,
    marginBottom: spacing.xxl,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  bannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  bannerBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 1,
    marginLeft: 6,
  },
  bannerTitle: {
    ...typography.h2,
    color: colors.white,
    marginBottom: spacing.sm,
    fontSize: 26,
  },
  bannerDesc: {
    ...typography.body,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 22,
    marginBottom: spacing.lg,
    maxWidth: '85%',
  },
  bannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    ...typography.body,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 8,
  },
  bannerBgIcon: {
    position: 'absolute',
    right: -20,
    bottom: -30,
    transform: [{ rotate: '15deg' }]
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: spacing.xxl,
  },
  actionItem: {
    alignItems: 'center',
  },
  actionIconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  actionItemText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 20,
  },
  sectionLink: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  courseCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    paddingBottom: spacing.lg,
    marginBottom: spacing.xxl,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },
  courseCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  courseIconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#0F172A', // Dark box holding the logo matching react master box
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  courseBody: {
    flex: 1,
  },
  courseCategory: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  courseTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseTimeText: {
    fontSize: 13,
    color: colors.textTertiary,
    marginLeft: 6,
  },
  progressCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  courseProgressBarBg: {
    height: 8,
    backgroundColor: '#F1F5F9', // ultra light back
    borderRadius: 4,
  },
  courseProgressBarFill: {
    width: '40%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  streakCard: {
    backgroundColor: '#FFF7ED', // Soft warm orange background
    borderRadius: 24,
    padding: spacing.xl,
    marginBottom: spacing.xxl,
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  streakFireBox: {
    width: 52,
    height: 52,
    backgroundColor: colors.white,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  streakHeaderTexts: {
    flex: 1,
  },
  streakLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9A3412', // Dark orange text
    marginBottom: 4,
  },
  streakValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#EA580C',
  },
  streakDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  streakDayItem: {
    alignItems: 'center',
    gap: 8,
  },
  streakDayBox: {
    width: 38,
    height: 38,
    backgroundColor: colors.white,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakDayBoxActive: {
    backgroundColor: '#EA580C',
  },
  streakDayLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9A3412',
  },
  featuredCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  featuredImagePlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#F1F5F9', // Blank placeholder space mimicking screenshot
  },
  featuredContent: {
    padding: spacing.xl,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  featuredSubText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  featuredSubTextDot: {
    color: colors.textTertiary,
  },
});
