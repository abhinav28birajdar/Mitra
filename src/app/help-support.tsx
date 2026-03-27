import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

const FAQ_DATA = [
  {
    question: 'How does the AI personalization work?',
    answer: 'Our AI analyzes your goals, interests, and current skill level to curate a unique learning path with relevant modules.',
    open: true,
  },
  {
    question: 'Can I change my career goal later?',
    answer: 'Yes! You can update your career goal in the Profile section, and your AI coach will adapt the recommendations accordingly.',
    open: false,
  },
  {
    question: 'Is the certification industry-recognized?',
    answer: 'Yes, our certificates are verified and can be shared on platforms like LinkedIn to showcase your skills.',
    open: false,
  },
];

export default function HelpSupportScreen() {
  const router = useRouter();
  const [faqs, setFaqs] = useState(FAQ_DATA);

  const toggleFaq = (index: number) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index].open = !updatedFaqs[index].open;
    setFaqs(updatedFaqs);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />

      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 24 }} /> {/* Balancing spacer */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color={colors.textTertiary} style={styles.searchIcon} />
          <TextInput 
            placeholder="Search for help..."
            placeholderTextColor={colors.textTertiary}
            style={styles.searchInput}
          />
        </View>

        {/* Contact Us */}
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactRow}>
          <TouchableOpacity style={styles.contactCard}>
            <View style={[styles.iconWrapper, { backgroundColor: '#F3E8FF' }]}>
              <MaterialCommunityIcons name="message-text-outline" size={24} color={colors.primary} />
            </View>
            <Text style={styles.contactLabel}>Live Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard}>
            <View style={[styles.iconWrapper, { backgroundColor: '#ECFDF5' }]}>
              <MaterialCommunityIcons name="email-outline" size={24} color={colors.success} />
            </View>
            <Text style={styles.contactLabel}>Email Support</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.faqCard} 
              activeOpacity={0.7}
              onPress={() => toggleFaq(index)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Feather 
                  name={faq.open ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={colors.textSecondary} 
                />
              </View>
              {faq.open && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.joinButton}>
          <Feather name="users" size={24} color={colors.white} style={styles.joinIcon} />
          <View style={styles.joinTextContainer}>
            <Text style={styles.joinButtonText}>Join Community</Text>
            <Text style={styles.joinSubText}>Discuss with 10k+ learners</Text>
          </View>
          <Feather name="arrow-right" size={20} color={colors.white} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: 60, // approx safe area
    paddingBottom: spacing.lg,
    backgroundColor: colors.background,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 130, // For the bottom bar
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 56,
    marginBottom: spacing.xl,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    height: '100%',
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  contactRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  contactCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingVertical: spacing.xl,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  contactLabel: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  faqContainer: {
    marginTop: spacing.sm,
  },
  faqCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  faqQuestion: {
    ...typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  faqAnswer: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 30, 
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: spacing.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  joinIcon: {
    marginRight: spacing.md,
  },
  joinTextContainer: {
    flex: 1,
  },
  joinButtonText: {
    fontWeight: '700',
    color: colors.white,
    fontSize: 16,
    marginBottom: 2,
  },
  joinSubText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
});
