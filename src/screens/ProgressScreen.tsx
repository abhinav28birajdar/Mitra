import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const ProgressScreen = () => {
    const [period, setPeriod] = useState('Week');

    const chartConfig = {
        backgroundGradientFrom: Theme.colors.surface,
        backgroundGradientTo: Theme.colors.surface,
        color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
        strokeWidth: 3,
        barPercentage: 0.5,
        decimalPlaces: 0,
        labelColor: (opacity = 1) => Theme.colors.textSecondary,
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: Theme.colors.white
        },
        propsForBackgroundLines: {
            strokeDasharray: "", // solid background lines
            stroke: Theme.colors.border,
            strokeWidth: 1
        }
    };

    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                data: [1.5, 3.2, 2.5, 4.8, 3.5, 5.2, 4.0],
                color: (opacity = 1) => Theme.colors.primary,
                strokeWidth: 3
            }
        ]
    };

    const renderStatCard = (title: string, value: string, icon: any, color: string, trend?: string) => (
        <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: color + '15' }]}>
                <Ionicons name={icon} size={24} color={color} />
            </View>
            <View style={styles.statInfo}>
                <Text style={styles.statValue}>{value}</Text>
                <Text style={styles.statLabel}>{title}</Text>
            </View>
            {trend && (
                <View style={styles.trendBadge}>
                    <Ionicons name="trending-up" size={12} color={Theme.colors.success} />
                    <Text style={styles.trendText}>{trend}</Text>
                </View>
            )}
        </View>
    );

    return (
        <ScreenWrapper useGradient>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Analytics</Text>
                    <View style={styles.periodSwitcher}>
                        {['Week', 'Month', 'Year'].map((p) => (
                            <TouchableOpacity
                                key={p}
                                style={[styles.periodButton, period === p && styles.activePeriodButton]}
                                onPress={() => setPeriod(p)}
                            >
                                <Text style={[styles.periodText, period === p && styles.activePeriodText]}>{p}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.statsGrid}>
                    {renderStatCard('Study Hours', '24.5', 'time-outline', Theme.colors.primary, '12%')}
                    {renderStatCard('Completed', '18', 'checkmark-done-outline', Theme.colors.secondary, '5%')}
                    {renderStatCard('Quiz Avg', '88%', 'school-outline', Theme.colors.accent)}
                    {renderStatCard('Streak', '12', 'flame-outline', '#F97316', 'new')}
                </View>

                <View style={styles.chartSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Learning Activity</Text>
                        <Text style={styles.sectionSubtitle}>Hours spent per day</Text>
                    </View>
                    <View style={styles.chartContainer}>
                        <LineChart
                            data={data}
                            width={width - 48}
                            height={220}
                            chartConfig={chartConfig}
                            bezier
                            style={styles.chart}
                            withDots={true}
                            withInnerLines={true}
                            withOuterLines={false}
                            withVerticalLines={false}
                            formatYLabel={(val) => `${val}h`}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Skills Proficiency</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.skillsList}>
                        {[
                            { name: 'UI/UX Design', level: 85, color: '#6366F1' },
                            { name: 'React Native', level: 70, color: '#10B981' },
                            { name: 'Product Growth', level: 45, color: '#F59E0B' },
                            { name: 'AI Engineering', level: 30, color: '#EC4899' },
                        ].map((skill, index) => (
                            <View key={index} style={styles.skillItem}>
                                <View style={styles.skillHeader}>
                                    <Text style={styles.skillName}>{skill.name}</Text>
                                    <Text style={styles.skillPercent}>{skill.level}%</Text>
                                </View>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: `${skill.level}%`, backgroundColor: skill.color }]} />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <TouchableOpacity style={styles.reportButton} activeOpacity={0.8}>
                    <LinearGradient
                        colors={[Theme.colors.primary, Theme.colors.primaryDark]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.reportGradient}
                    >
                        <View>
                            <Text style={styles.reportTitle}>Weekly Insights Report</Text>
                            <Text style={styles.reportDesc}>AI-generated analysis of your performance</Text>
                        </View>
                        <Ionicons name="document-text" size={32} color="rgba(255,255,255,0.3)" />
                    </LinearGradient>
                </TouchableOpacity>

                <View style={{ height: 100 }} />
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        padding: Theme.spacing.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Theme.spacing.xl,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
    },
    periodSwitcher: {
        flexDirection: 'row',
        backgroundColor: Theme.colors.surface,
        borderRadius: 12,
        padding: 4,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    periodButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    activePeriodButton: {
        backgroundColor: Theme.colors.primary,
    },
    periodText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Theme.colors.textSecondary,
    },
    activePeriodText: {
        color: Theme.colors.white,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Theme.spacing.md,
        marginBottom: Theme.spacing.xl,
    },
    statCard: {
        width: (width - 48 - 16) / 2,
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.borderRadius['2xl'],
        padding: Theme.spacing.md,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        position: 'relative',
    },
    statIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Theme.spacing.sm,
    },
    statInfo: {
        gap: 2,
    },
    statValue: {
        fontSize: 22,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
    },
    statLabel: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
    },
    trendBadge: {
        position: 'absolute',
        top: Theme.spacing.md,
        right: Theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECFDF5',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
        gap: 2,
    },
    trendText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Theme.colors.success,
    },
    chartSection: {
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.borderRadius['2xl'],
        padding: Theme.spacing.lg,
        marginBottom: Theme.spacing.xl,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: Theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: Theme.typography.fontSize.lg,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
    },
    sectionSubtitle: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
    },
    chartContainer: {
        alignItems: 'center',
        marginLeft: -Theme.spacing.md, // Correct for chart padding
    },
    chart: {
        borderRadius: 16,
    },
    section: {
        marginBottom: Theme.spacing.xl,
    },
    seeAll: {
        fontSize: 14,
        color: Theme.colors.primary,
        fontWeight: 'bold',
    },
    skillsList: {
        gap: Theme.spacing.md,
    },
    skillItem: {
        gap: 8,
    },
    skillHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    skillName: {
        fontSize: 14,
        fontWeight: Theme.typography.fontWeight.semibold as any,
        color: Theme.colors.text,
    },
    skillPercent: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Theme.colors.text,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#F1F5F9',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    reportButton: {
        borderRadius: Theme.borderRadius['2xl'],
        overflow: 'hidden',
        marginTop: Theme.spacing.md,
    },
    reportGradient: {
        padding: Theme.spacing.xl,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reportTitle: {
        fontSize: 18,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.white,
        marginBottom: 4,
    },
    reportDesc: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
    },
});

export default ProgressScreen;
