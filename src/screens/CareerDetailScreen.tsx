import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomButton from '../components/CustomButton';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { CAREERS } from '../constants/mocks';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CareerDetailScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { careerId } = route.params || {};

    const career = CAREERS.find(c => c.id === careerId) || CAREERS[0];

    return (
        <ScreenWrapper useGradient>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <LinearGradient
                        colors={[Theme.colors.primary, Theme.colors.primaryDark]}
                        style={styles.headerGradient}
                    >
                        <View style={styles.topBar}>
                            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                                <Ionicons name="chevron-back" size={24} color={Theme.colors.white} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.backBtn}>
                                <Ionicons name="bookmark-outline" size={22} color={Theme.colors.white} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.headerContent}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="briefcase" size={36} color={Theme.colors.primary} />
                            </View>
                            <Text style={styles.careerTitle}>{career.title}</Text>
                            <Text style={styles.industryText}>{career.industry}</Text>
                            <View style={styles.matchBadge}>
                                <Ionicons name="sparkles" size={14} color={Theme.colors.white} />
                                <Text style={styles.matchText}>{career.match}% AI Compatibility</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </View>

                <View style={styles.content}>
                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>{career.salary}</Text>
                            <Text style={styles.statLabel}>Avg Salary</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={[styles.statValue, { color: Theme.colors.success }]}>{career.growth}</Text>
                            <Text style={styles.statLabel}>Growth</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>High</Text>
                            <Text style={styles.statLabel}>Demand</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Role Overview</Text>
                        <Text style={styles.description}>{career.description}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Key Skills Required</Text>
                        <View style={styles.skillsGrid}>
                            {career.skills.map((skill, index) => (
                                <View key={index} style={styles.skillChip}>
                                    <View style={styles.dot} />
                                    <Text style={styles.skillText}>{skill}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Career Roadmap</Text>
                        <View style={styles.roadmap}>
                            {[
                                { title: 'Entry Level', role: `Junior ${career.title}`, exp: '0-2 yrs', status: 'completed' },
                                { title: 'Mid Level', role: `Senior ${career.title}`, exp: '2-5 yrs', status: 'active' },
                                { title: 'Leadership', role: `${career.title} Manager`, exp: '5-8 yrs', status: 'pending' },
                            ].map((step, i, arr) => (
                                <View key={i} style={styles.roadmapStep}>
                                    <View style={styles.roadmapIndicator}>
                                        <View style={[styles.roadmapDot, step.status === 'completed' && { backgroundColor: Theme.colors.success }, step.status === 'active' && { backgroundColor: Theme.colors.primary }]} />
                                        {i !== arr.length - 1 && <View style={styles.roadmapLine} />}
                                    </View>
                                    <View style={styles.roadmapContent}>
                                        <Text style={styles.stepTitle}>{step.title}</Text>
                                        <Text style={styles.stepRole}>{step.role}</Text>
                                        <Text style={styles.stepExp}>{step.exp}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={{ height: 120 }} />
            </ScrollView>

            <View style={styles.footer}>
                <CustomButton
                    title="Generate Learning Roadmap"
                    onPress={() => navigation.navigate('LearningPathDetail', { pathId: '1' })}
                    style={styles.ctaButton}
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    header: {
        overflow: 'hidden',
    },
    headerGradient: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 60,
        paddingHorizontal: Theme.spacing.lg,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Theme.spacing.xl,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContent: {
        alignItems: 'center',
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 24,
        backgroundColor: Theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Theme.spacing.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 8,
    },
    careerTitle: {
        fontSize: 28,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.white,
        textAlign: 'center',
        marginBottom: 4,
    },
    industryText: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: Theme.spacing.md,
    },
    matchBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    matchText: {
        color: Theme.colors.white,
        fontWeight: 'bold',
        fontSize: 14,
    },
    content: {
        paddingHorizontal: Theme.spacing.lg,
    },
    statsRow: {
        flexDirection: 'row',
        gap: Theme.spacing.md,
        marginTop: -30,
        marginBottom: Theme.spacing.xl,
    },
    statCard: {
        flex: 1,
        backgroundColor: Theme.colors.surface,
        borderRadius: 20,
        padding: Theme.spacing.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    statValue: {
        fontSize: 18,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 10,
        color: Theme.colors.textSecondary,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    section: {
        marginBottom: Theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: Theme.spacing.md,
    },
    description: {
        fontSize: 15,
        color: Theme.colors.textSecondary,
        lineHeight: 24,
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Theme.spacing.sm,
    },
    skillChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Theme.colors.primary,
    },
    skillText: {
        fontSize: 13,
        fontWeight: '600',
        color: Theme.colors.text,
    },
    roadmap: {
        paddingLeft: 10,
    },
    roadmapStep: {
        flexDirection: 'row',
        gap: Theme.spacing.lg,
    },
    roadmapIndicator: {
        alignItems: 'center',
    },
    roadmapDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Theme.colors.border,
        zIndex: 1,
    },
    roadmapLine: {
        width: 2,
        height: 60,
        backgroundColor: Theme.colors.border,
    },
    roadmapContent: {
        flex: 1,
        paddingBottom: 20,
    },
    stepTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Theme.colors.primary,
        marginBottom: 2,
    },
    stepRole: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Theme.colors.text,
    },
    stepExp: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Theme.colors.surface,
        paddingHorizontal: Theme.spacing.lg,
        paddingTop: Theme.spacing.md,
        paddingBottom: Platform.OS === 'ios' ? 34 : Theme.spacing.lg,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.border,
    },
    ctaButton: {
        height: 56,
        borderRadius: 16,
    },
});

export default CareerDetailScreen;
