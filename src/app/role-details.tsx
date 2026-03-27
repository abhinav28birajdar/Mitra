import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

export default function RoleDetailsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Top Header Background */}
        <View style={styles.headerBackground}>
          {/* Header Nav */}
          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <Feather name="chevron-left" size={24} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="bookmark" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>

          {/* Role Info */}
          <View style={styles.roleHeaderContent}>
            <View style={styles.iconContainer}>
              <Feather name="briefcase" size={32} color={colors.primary} />
            </View>
            <Text style={styles.roleTitle}>Product Manager</Text>
            <Text style={styles.roleCategory}>Business</Text>

            <View style={styles.compatibilityBadge}>
              <MaterialCommunityIcons name="creation" size={16} color={colors.white} />
              <Text style={styles.compatibilityText}>60% AI Compatibility</Text>
            </View>
          </View>
        </View>

        {/* Floating Stat Cards row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statMainValue}>$90k - $150k</Text>
            <Text style={styles.statSubText}>AVG SALARY</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statMainValue, { color: colors.success }]}>+10%</Text>
            <Text style={styles.statSubText}>GROWTH</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statMainValue}>High</Text>
            <Text style={styles.statSubText}>DEMAND</Text>
          </View>
        </View>

        {/* Content Body */}
        <View style={styles.bodySection}>
          <Text style={styles.sectionTitle}>Role Overview</Text>
          <Text style={styles.bodyText}>Lead product development and strategy.</Text>

          <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>Key Skills Required</Text>
          <View style={styles.skillsRow}>
            {['Communication', 'Strategy', 'Agile'].map((skill) => (
              <View key={skill} style={styles.skillPill}>
                <View style={styles.skillDot} />
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>

          <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>Career Roadmap</Text>
          <View style={styles.roadmapContainer}>
            {/* Entry Level */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[styles.timelineNode, { backgroundColor: colors.success }]} />
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.levelLabel}>Entry Level</Text>
                <Text style={styles.jobTitle}>Junior Product Manager</Text>
                <Text style={styles.experienceText}>0-2 yrs</Text>
              </View>
            </View>

            {/* Mid Level */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[styles.timelineNode, { backgroundColor: colors.primary }]} />
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.levelLabel}>Mid Level</Text>
                <Text style={styles.jobTitle}>Senior Product Manager</Text>
                <Text style={styles.experienceText}>2-5 yrs</Text>
              </View>
            </View>

            {/* Leadership */}
            <View style={[styles.timelineItem, { marginBottom: 0 }]}>
              <View style={styles.timelineLeft}>
                <View style={[styles.timelineNode, { backgroundColor: '#E2E8F0' }]} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.levelLabel}>Leadership</Text>
                <Text style={styles.jobTitle}>Product Manager Manager</Text>
                <Text style={styles.experienceText}>5-8 yrs</Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Persistent Bottom Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.generateButton}>
          <Text style={styles.generateButtonText}>Generate Learning Roadmap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 120, // space for fixed bottom button
  },
  headerBackground: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingTop: 60,
    paddingBottom: 80,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleHeaderContent: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  roleTitle: {
    ...typography.h2,
    color: colors.white,
    marginBottom: 4,
  },
  roleCategory: {
    ...typography.body,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing.lg,
  },
  compatibilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 24,
  },
  compatibilityText: {
    color: colors.white,
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginTop: -50, // Float over the header curve
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
    marginHorizontal: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  statMainValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  statSubText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
    textAlign: 'center',
  },
  bodySection: {
    paddingHorizontal: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  bodyText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  skillPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  skillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 6,
  },
  skillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  roadmapContainer: {
    marginTop: spacing.md,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: spacing.md,
    width: 24,
  },
  timelineNode: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginTop: 4,
    marginBottom: -20, // connect to next node
  },
  timelineContent: {
    flex: 1,
  },
  levelLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaryDark,
    marginBottom: 4,
  },
  jobTitle: {
    ...typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  experienceText: {
    fontSize: 13,
    color: colors.textTertiary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: 30, // SafeArea roughly
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  generateButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
});
