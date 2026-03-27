import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const CATEGORIES = ['All', 'Technology', 'Healthcare', 'Business', 'Design'];

const CAREERS = [
  {
    id: '1',
    title: 'Frontend Developer',
    category: 'TECHNOLOGY',
    growth: '+15%',
    salary: '$70k - $120k',
    match: '85%',
  },
  {
    id: '2',
    title: 'AI Engineer',
    category: 'TECHNOLOGY',
    growth: '+25%',
    salary: '$100k - $180k',
    match: '92%',
  },
  {
    id: '3',
    title: 'Product Manager',
    category: 'BUSINESS',
    growth: '+10%',
    salary: '$90k - $150k',
    match: '60%',
  }
];

export default function ExploreScreen() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discovery</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="sliders" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Search */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color={colors.textTertiary} style={styles.searchIcon} />
          <TextInput 
            placeholder="Search careers or skills..."
            placeholderTextColor={colors.textTertiary}
            style={styles.searchInput}
          />
        </View>

        {/* Categories Pill Scroll */}
        <View style={styles.categoriesWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesList}>
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <TouchableOpacity 
                  key={cat} 
                  style={[styles.categoryPill, isActive && styles.categoryPillActive]}
                  onPress={() => setActiveTab(cat)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>

        {/* Results Header */}
        <Text style={styles.resultsText}>FOUND {CAREERS.length} CAREERS FOR YOU</Text>

        {/* Cards */}
        {CAREERS.map((job) => (
          <TouchableOpacity key={job.id} style={styles.card} activeOpacity={0.9}>
            
            <View style={styles.cardTop}>
              <View style={styles.iconBox}>
                <Feather name="briefcase" size={24} color={colors.primary} />
              </View>
              <TouchableOpacity style={styles.bookmarkButton}>
                <Feather name="bookmark" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.jobCategory}>{job.category}</Text>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Feather name="bar-chart-2" size={16} color={colors.primary} />
                <Text style={styles.statTextHighlight}>{job.growth} Growth</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="cash" size={18} color={colors.success} />
                <Text style={styles.statText}>{job.salary}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.matchRow}>
              <View style={styles.matchBadge}>
                <MaterialCommunityIcons name="creation" size={16} color={colors.primary} />
                <Text style={styles.matchText}>{job.match} AI Match</Text>
              </View>
              <Feather name="chevron-right" size={20} color={colors.textTertiary} />
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
    paddingBottom: spacing.md,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.lg,
    height: 56,
    marginBottom: spacing.lg,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    height: '100%',
  },
  categoriesWrapper: {
    marginBottom: spacing.xl,
  },
  categoriesList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  categoryTextActive: {
    color: colors.white,
  },
  resultsText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 1,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkButton: {
    padding: 8,
    marginRight: -8,
    marginTop: -8,
  },
  jobTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  jobCategory: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primaryDark,
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.xl,
  },
  statTextHighlight: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 6,
  },
  statText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: -spacing.xl,
    marginBottom: spacing.lg,
  },
  matchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  matchText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaryDark,
    marginLeft: 4,
  },
});
