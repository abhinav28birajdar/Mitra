import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const SUGGESTIONS = ['Explain Roadmap', 'Latest Tech Jobs', 'Review Profile', 'Interview Prep'];

export default function AiChatScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="creation" size={24} color={colors.white} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Mitra AI</Text>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Always active</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.historyButton}>
          <Feather name="clock" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Chat Area */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.chatContent}>
        
        {/* Helper Bot Message */}
        <View style={styles.msgWrapper}>
          <View style={styles.msgBubble}>
            <Text style={styles.msgText}>
              Hello! I'm Mitra, your AI career coach. How can I assist your professional growth today?
            </Text>
            <Text style={styles.timeText}>12:00 PM</Text>
          </View>
        </View>
        
      </ScrollView>

      {/* Bottom Suggestions */}
      <View style={styles.bottomArea}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsScroll}>
          {SUGGESTIONS.map((sug, index) => (
            <TouchableOpacity key={index} style={styles.suggestionPill} activeOpacity={0.7}>
              <Text style={styles.suggestionText}>{sug}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Match overall app minimal background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: 60,
    paddingBottom: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  historyButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContent: {
    padding: spacing.lg,
    paddingBottom: 40,
  },
  msgWrapper: {
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  msgBubble: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    borderTopLeftRadius: 4,
    padding: spacing.lg,
    maxWidth: '85%',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  msgText: {
    ...typography.body,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  timeText: {
    fontSize: 10,
    color: colors.textTertiary,
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  bottomArea: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  suggestionsScroll: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  suggestionPill: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  suggestionText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
