import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomButton from '../components/CustomButton';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { LEARNING_PATHS } from '../constants/mocks';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const LearningPathDetailScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { pathId } = route.params || {};

    const path = LEARNING_PATHS.find(p => p.id === pathId) || LEARNING_PATHS[0];

    const modules = [
        { id: 1, title: 'Introduction to Core Concepts', duration: '20m', status: 'completed' },
        { id: 2, title: 'Deep Dive: Advanced Principles', duration: '45m', status: 'current' },
        { id: 3, title: 'Practical Hands-on Workshop', duration: '1h 20m', status: 'locked' },
        { id: 4, title: 'Industry Case Studies', duration: '55m', status: 'locked' },
        { id: 5, title: 'Final Capstone Project', duration: '2h 10m', status: 'locked' },
    ];

    return (
        <ScreenWrapper useGradient>
            <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
                {/* Custom Header */}
                <View style={styles.topHeader}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color={Theme.colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle} numberOfLines={1}>{path.title}</Text>
                    <TouchableOpacity style={styles.optionBtn}>
                        <Ionicons name="share-outline" size={22} color={Theme.colors.text} />
                    </TouchableOpacity>
                </View>

                <View style={styles.bannerContainer}>
                    <Image source={{ uri: path.image }} style={styles.bannerImage} />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.6)']}
                        style={styles.bannerOverlay}
                    >
                        <View style={styles.bannerContent}>
                            <View style={styles.categoryBadge}>
                                <Text style={styles.categoryText}>{path.difficulty.toUpperCase()}</Text>
                            </View>
                            <Text style={styles.pathTitle}>{path.title}</Text>
                        </View>
                    </LinearGradient>
                </View>

                <View style={styles.mainContent}>
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Ionicons name="time-outline" size={20} color={Theme.colors.primary} />
                            <Text style={styles.statLabel}>{path.duration}</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Ionicons name="book-outline" size={20} color={Theme.colors.secondary} />
                            <Text style={styles.statLabel}>24 Lessons</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Ionicons name="people-outline" size={20} color={Theme.colors.accent} />
                            <Text style={styles.statLabel}>1.2k Learners</Text>
                        </View>
                    </View>

                    <View style={styles.progressCard}>
                        <View style={styles.progressHeader}>
                            <Text style={styles.progressLabel}>Course Progress</Text>
                            <Text style={styles.progressValue}>{Math.round(path.progress * 100)}%</Text>
                        </View>
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: `${path.progress * 100}%` }]} />
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>Syllabus</Text>
                    <View style={styles.moduleList}>
                        {modules.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[styles.moduleItem, item.status === 'locked' && styles.lockedModule]}
                                disabled={item.status === 'locked'}
                                onPress={() => navigation.navigate('ModuleLesson', { moduleId: item.id })}
                            >
                                <View style={styles.moduleNumber}>
                                    <Text style={[styles.numberText, item.status === 'locked' && styles.lockedText]}>0{index + 1}</Text>
                                </View>
                                <View style={styles.moduleInfo}>
                                    <Text style={[styles.moduleTitle, item.status === 'locked' && styles.lockedText]}>{item.title}</Text>
                                    <View style={styles.moduleMeta}>
                                        <Ionicons name="play-circle-outline" size={14} color={Theme.colors.textSecondary} />
                                        <Text style={styles.moduleDuration}>{item.duration}</Text>
                                    </View>
                                </View>
                                <View style={styles.moduleAction}>
                                    {item.status === 'completed' ? (
                                        <View style={styles.checkCircle}>
                                            <Ionicons name="checkmark" size={16} color={Theme.colors.white} />
                                        </View>
                                    ) : item.status === 'current' ? (
                                        <Ionicons name="play" size={24} color={Theme.colors.primary} />
                                    ) : (
                                        <Ionicons name="lock-closed-outline" size={20} color={Theme.colors.gray} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.sectionTitle}>About this Path</Text>
                    <Text style={styles.description}>
                        This learning path is specifically generated by Mitra AI based on your career goal in Product Design.
                        It covers essential theoretical foundations mixed with practical projects that simulate real-world scenarios.
                        By the end, you'll have a portfolio-ready project.
                    </Text>
                </View>
                <View style={{ height: 120 }} />
            </ScrollView>

            <View style={styles.footer}>
                <CustomButton
                    title="Continue Module 2"
                    onPress={() => navigation.navigate('ModuleLesson', { moduleId: 2 })}
                    style={styles.ctaButton}
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    topHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Theme.spacing.lg,
        paddingVertical: Theme.spacing.md,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        textAlign: 'center',
        marginHorizontal: Theme.spacing.md,
    },
    optionBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerContainer: {
        width: width,
        height: 250,
        position: 'relative',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
    bannerOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60%',
        justifyContent: 'flex-end',
        padding: Theme.spacing.lg,
    },
    bannerContent: {
        gap: 8,
    },
    categoryBadge: {
        backgroundColor: Theme.colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    categoryText: {
        color: Theme.colors.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
    pathTitle: {
        fontSize: 28,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.white,
    },
    mainContent: {
        padding: Theme.spacing.lg,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
        borderRadius: 16,
        padding: Theme.spacing.md,
        marginBottom: Theme.spacing.xl,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Theme.colors.text,
    },
    statDivider: {
        width: 1,
        height: 20,
        backgroundColor: Theme.colors.border,
    },
    progressCard: {
        marginBottom: Theme.spacing.xl,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Theme.colors.text,
    },
    progressValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Theme.colors.primary,
    },
    progressBarBg: {
        height: 8,
        backgroundColor: '#F1F5F9',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Theme.colors.primary,
        borderRadius: 4,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: Theme.spacing.md,
    },
    moduleList: {
        gap: Theme.spacing.md,
        marginBottom: Theme.spacing.xl,
    },
    moduleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
        borderRadius: 16,
        padding: Theme.spacing.md,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    lockedModule: {
        opacity: 0.6,
        backgroundColor: '#F8FAFC',
    },
    moduleNumber: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Theme.spacing.md,
    },
    numberText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Theme.colors.primary,
    },
    lockedText: {
        color: Theme.colors.gray,
    },
    moduleInfo: {
        flex: 1,
    },
    moduleTitle: {
        fontSize: 15,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: 4,
    },
    moduleMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    moduleDuration: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
    },
    moduleAction: {
        paddingLeft: Theme.spacing.sm,
    },
    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Theme.colors.success,
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        fontSize: 15,
        color: Theme.colors.textSecondary,
        lineHeight: 24,
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

export default LearningPathDetailScreen;
