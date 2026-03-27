import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

const NOTIFICATIONS = [
  { 
    id: '1', 
    title: 'New Achievement!', 
    time: '2h ago', 
    desc: 'You earned the "Fast Learner" badge for completing 3 lessons...', 
    icon: 'trophy', 
    iconColor: '#F59E0B', 
    bgColor: '#FFFBEB',
    unread: true 
  },
  { 
    id: '2', 
    title: 'AI Recommendation', 
    time: '5h ago', 
    desc: 'Based on your recent progress, we suggest checking out "Adva...', 
    icon: 'creation', 
    library: 'MaterialCommunityIcons',
    iconColor: colors.primary, 
    bgColor: colors.primaryLight,
    unread: true 
  },
  { 
    id: '3', 
    title: 'New Connection', 
    time: 'Yesterday', 
    desc: 'Sarah Miller started following your learning journey.', 
    icon: 'account-plus-outline', 
    library: 'MaterialCommunityIcons',
    iconColor: colors.success, 
    bgColor: '#ECFDF5',
    unread: false 
  },
  { 
    id: '4', 
    title: 'Course Updated', 
    time: '2 days ago', 
    desc: 'The "React Native Masterclass" has new content available.', 
    icon: 'refresh-cw', 
    iconColor: '#F59E0B', 
    bgColor: '#FFFBEB',
    unread: false 
  },
];

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Feather name="chevron-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="check-all" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        {NOTIFICATIONS.map((notif) => (
          <TouchableOpacity 
            key={notif.id} 
            style={[styles.card, notif.unread && styles.cardUnread]}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: notif.bgColor }]}>
              {notif.library === 'MaterialCommunityIcons' ? (
                <MaterialCommunityIcons name={notif.icon as any} size={24} color={notif.iconColor} />
              ) : (
                <Feather name={notif.icon as any} size={20} color={notif.iconColor} />
              )}
            </View>

            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.notifTitle}>{notif.title}</Text>
                <Text style={styles.timeText}>{notif.time}</Text>
              </View>
              <Text style={styles.descText} numberOfLines={2}>{notif.desc}</Text>
            </View>

            {/* Unread Indicator */}
            <View style={styles.indicatorContainer}>
              {notif.unread && <View style={styles.unreadDot} />}
            </View>
          </TouchableOpacity>
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
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  cardUnread: {
    borderColor: colors.primaryLight,
    borderWidth: 1.5,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  notifTitle: {
    ...typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  timeText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  descText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
    paddingRight: 10,
  },
  indicatorContainer: {
    width: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});
