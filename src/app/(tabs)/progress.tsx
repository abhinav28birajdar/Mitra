import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const SKILLS = [
  { id: '1', name: 'UI/UX Design', score: '85%', fillStyle: { width: '85%', backgroundColor: colors.primary } },
  { id: '2', name: 'React Native', score: '70%', fillStyle: { width: '70%', backgroundColor: colors.success } },
  { id: '3', name: 'Product Growth', score: '45%', fillStyle: { width: '45%', backgroundColor: '#F59E0B' } },
  { id: '4', name: 'AI Engineering', score: '30%', fillStyle: { width: '30%', backgroundColor: '#EC4899' } },
];

export default function ProgressScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Spacer */}
        <View style={{ height: 60 }} />

        {/* Learning Activity Card */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Learning Activity</Text>
            <Text style={styles.chartSubtitle}>Hours spent per day</Text>
          </View>
          
          {/* Mock Chart Area */}
          <View style={styles.chartArea}>
            {/* Y Axis Labels */}
            <View style={styles.yAxis}>
              {['5h', '4h', '3h', '2h', '1h'].map((lb, i) => (
                <Text key={i} style={styles.axisLabel}>{lb}</Text>
              ))}
            </View>

            {/* Chart Grid Lines */}
            <View style={styles.gridContainer}>
              {/* Lines matching the Y-axis heights */}
              <View style={[styles.gridLine, { top: '0%' }]} />
              <View style={[styles.gridLine, { top: '25%' }]} />
              <View style={[styles.gridLine, { top: '50%' }]} />
              <View style={[styles.gridLine, { top: '75%' }]} />
              <View style={[styles.gridLine, { top: '100%' }]} />

              {/* Mock Graph using absolutely positioned points */}
              {/* This mimics the screenshots graph curve gracefully */}
              <View style={styles.graphContainer}>
                {/* Simulated line and shadow using a placeholder box style, given SVG constraints */}
                <View style={styles.graphMockFill} />
                
                {/* Data Dots mapping to Screenshot (approx Y coordinates) */}
                <View style={[styles.dot, { bottom: '0%', left: '0%' }]} />
                <View style={[styles.dot, { bottom: '40%', left: '16%' }]} />
                <View style={[styles.dot, { bottom: '25%', left: '33%' }]} />
                <View style={[styles.dot, { bottom: '80%', left: '50%' }]} />
                <View style={[styles.dot, { bottom: '55%', left: '66%' }]} />
                <View style={[styles.dot, { bottom: '95%', left: '83%' }]} />
                <View style={[styles.dot, { bottom: '65%', left: '100%' }]} />
              </View>
            </View>
          </View>

          {/* X Axis Labels */}
          <View style={styles.xAxis}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <Text key={i} style={styles.axisLabel}>{day}</Text>
            ))}
          </View>
        </View>

        {/* Skills Proficiency */}
        <View style={styles.skillsHeader}>
          <Text style={styles.skillsTitle}>Skills Proficiency</Text>
          <TouchableOpacity>
            <Text style={styles.skillsLink}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Skill Bars */}
        <View style={styles.skillsContainer}>
          {SKILLS.map((skill) => (
            <View key={skill.id} style={styles.skillRow}>
              <View style={styles.skillRowHeader}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <Text style={styles.skillScore}>{skill.score}</Text>
              </View>
              <View style={styles.skillBarBg}>
                <View style={[styles.skillBarFill, skill.fillStyle]} />
              </View>
            </View>
          ))}
        </View>

        {/* Weekly Insights Report Card */}
        <TouchableOpacity style={styles.insightsCard} activeOpacity={0.8}>
          <View style={styles.insightsContent}>
            <Text style={styles.insightsTitle}>Weekly Insights Report</Text>
            <Text style={styles.insightsSubtitle}>AI-generated analysis of your performance</Text>
          </View>
          <MaterialCommunityIcons name="file-document-outline" size={32} color="rgba(255,255,255,0.4)" />
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 40,
  },
  chartCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    paddingRight: spacing.lg,
    marginBottom: spacing.xxl,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  chartTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  chartSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  chartArea: {
    flexDirection: 'row',
    height: 160,
    marginBottom: spacing.md,
  },
  yAxis: {
    justifyContent: 'space-between',
    paddingRight: spacing.md,
    alignItems: 'flex-end',
  },
  axisLabel: {
    fontSize: 11,
    color: colors.textTertiary,
    fontWeight: '600',
  },
  gridContainer: {
    flex: 1,
    position: 'relative',
    marginLeft: spacing.sm,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.border,
  },
  graphContainer: {
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    bottom: 0,
  },
  graphMockFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: colors.primaryLight,
    opacity: 0.5,
    borderTopWidth: 2,
    borderTopColor: colors.primary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  dot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.white,
    marginLeft: -5,
    marginBottom: -5,
    zIndex: 10,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 40,
    paddingRight: 10,
  },
  skillsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: 4,
  },
  skillsTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  skillsLink: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  skillsContainer: {
    marginBottom: spacing.xxl,
    paddingHorizontal: 4,
  },
  skillRow: {
    marginBottom: spacing.xl,
  },
  skillRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  skillScore: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  skillBarBg: {
    height: 8,
    backgroundColor: '#E2E8F0', // Very light grey back
    borderRadius: 4,
    overflow: 'hidden',
  },
  skillBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  insightsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: spacing.xl,
    paddingVertical: 28,
  },
  insightsContent: {
    flex: 1,
    paddingRight: spacing.lg,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  insightsSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 18,
  },
});
