import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_USER, LEARNING_PATHS } from '../constants/mocks';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
    const navigation = useNavigation<any>();

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.userInfo}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
                </TouchableOpacity>
                <View style={styles.userText}>
                    <Text style={styles.greeting}>Hey, {MOCK_USER.name.split(' ')[0]} 👋</Text>
                    <Text style={styles.subGreeting}>Let's master a new skill today!</Text>
                </View>
            </View>
            <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Notifications')}>
                    <Ionicons name="notifications-outline" size={24} color={Theme.colors.text} />
                    <View style={styles.badge} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
                    <Ionicons name="settings-outline" size={24} color={Theme.colors.text} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderAICard = () => (
        <TouchableOpacity style={styles.aiCardContainer} activeOpacity={0.9}>
            <LinearGradient
                colors={['#6366F1', '#818CF8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.aiCard}
            >
                <View style={styles.aiCardContent}>
                    <View style={styles.aiBadge}>
                        <Ionicons name="sparkles" size={14} color={Theme.colors.white} />
                        <Text style={styles.aiBadgeText}>AI Recommendation</Text>
                    </View>
                    <Text style={styles.aiTitle}>Ready to level up?</Text>
                    <Text style={styles.aiDesc}>
                        Gemini AI has curated a new module in "UX Design Strategy" just for you.
                    </Text>
                    <TouchableOpacity style={styles.aiButton}>
                        <Text style={styles.aiButtonText}>Start Exploring</Text>
                        <Ionicons name="arrow-forward" size={16} color={Theme.colors.primary} />
                    </TouchableOpacity>
                </View>
                <Ionicons name="bulb" size={120} color="rgba(255,255,255,0.15)" style={styles.aiIcon} />
            </LinearGradient>
        </TouchableOpacity>
    );

    const renderQuickActions = () => (
        <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('Explore')}>
                <View style={[styles.actionIcon, { backgroundColor: '#EEF2FF' }]}>
                    <Ionicons name="compass" size={24} color={Theme.colors.primary} />
                </View>
                <Text style={styles.actionLabel}>Explore</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('AI Chat')}>
                <View style={[styles.actionIcon, { backgroundColor: '#ECFDF5' }]}>
                    <Ionicons name="chatbubbles" size={24} color={Theme.colors.secondary} />
                </View>
                <Text style={styles.actionLabel}>AI Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
                <View style={[styles.actionIcon, { backgroundColor: '#FFFBEB' }]}>
                    <Ionicons name="flag" size={24} color={Theme.colors.accent} />
                </View>
                <Text style={styles.actionLabel}>Goals</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
                <View style={[styles.actionIcon, { backgroundColor: '#FDF2F8' }]}>
                    <Ionicons name="calendar" size={24} color="#EC4899" />
                </View>
                <Text style={styles.actionLabel}>Schedule</Text>
            </TouchableOpacity>
        </View>
    );

    const renderLearningPath = () => {
        const path = LEARNING_PATHS[0];
        return (
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Continue Learning</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
                        <Text style={styles.seeAll}>My Paths</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.pathCard}
                    onPress={() => navigation.navigate('LearningPathDetail', { pathId: path.id })}
                >
                    <View style={styles.pathRow}>
                        <Image source={{ uri: path.image }} style={styles.pathImage} />
                        <View style={styles.pathContent}>
                            <Text style={styles.pathCategory}>TECHNOLOGY</Text>
                            <Text style={styles.pathTitle} numberOfLines={1}>{path.title}</Text>
                            <View style={styles.progressCounter}>
                                <Ionicons name="time-outline" size={14} color={Theme.colors.textSecondary} />
                                <Text style={styles.progressText}>2h remaining</Text>
                            </View>
                        </View>
                        <View style={styles.percentageCircle}>
                            <Text style={styles.percentageText}>{Math.round(path.progress * 100)}%</Text>
                        </View>
                    </View>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${path.progress * 100}%` }]} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const renderFeatured = () => (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Featured Modules</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredContent}>
                {LEARNING_PATHS.slice(1).map((item) => (
                    <TouchableOpacity key={item.id} style={styles.featuredCard}>
                        <Image source={{ uri: item.image }} style={styles.featuredImage} />
                        <View style={styles.featuredInfo}>
                            <Text style={styles.featuredTitle}>{item.title}</Text>
                            <View style={styles.featuredMeta}>
                                <Ionicons name="star" size={12} color={Theme.colors.accent} />
                                <Text style={styles.rating}>4.9</Text>
                                <Text style={styles.metaDot}>•</Text>
                                <Text style={styles.duration}>12 Lessons</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderStreak = () => (
        <View style={styles.streakSection}>
            <LinearGradient
                colors={['#FFF7ED', '#FFEDD5']}
                style={styles.streakCard}
            >
                <View style={styles.streakHeader}>
                    <View style={styles.streakIconContainer}>
                        <Ionicons name="flame" size={24} color="#F97316" />
                    </View>
                    <View>
                        <Text style={styles.streakTitle}>Daily Streak</Text>
                        <Text style={styles.streakCount}>{MOCK_USER.streak} Days 🔥</Text>
                    </View>
                </View>
                <View style={styles.streakWeek}>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <View key={i} style={styles.dayCol}>
                            <View style={[
                                styles.dayDot,
                                i < 3 && { backgroundColor: '#F97316' },
                                i === 2 && { borderWidth: 2, borderColor: '#FED7AA' }
                            ]}>
                                {i < 3 && <Ionicons name="checkmark" size={12} color={Theme.colors.white} />}
                            </View>
                            <Text style={styles.dayText}>{day}</Text>
                        </View>
                    ))}
                </View>
            </LinearGradient>
        </View>
    );

    return (
        <ScreenWrapper useGradient>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {renderHeader()}
                {renderAICard()}
                {renderQuickActions()}
                {renderLearningPath()}
                {renderStreak()}
                {renderFeatured()}
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
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 27,
        marginRight: Theme.spacing.md,
        borderWidth: 2,
        borderColor: Theme.colors.white,
    },
    userText: {
        justifyContent: 'center',
    },
    greeting: {
        fontSize: Theme.typography.fontSize.lg,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
    },
    subGreeting: {
        fontSize: Theme.typography.fontSize.xs,
        color: Theme.colors.textSecondary,
        marginTop: 2,
    },
    headerIcons: {
        flexDirection: 'row',
        gap: Theme.spacing.sm,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: Theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    badge: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Theme.colors.error,
        borderWidth: 2,
        borderColor: Theme.colors.white,
    },
    aiCardContainer: {
        marginBottom: Theme.spacing.xl,
        borderRadius: Theme.borderRadius['2xl'],
        overflow: 'hidden',
        elevation: 10,
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
    },
    aiCard: {
        padding: Theme.spacing.xl,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
    },
    aiCardContent: {
        flex: 1,
        zIndex: 1,
    },
    aiBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    aiBadgeText: {
        color: Theme.colors.white,
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 4,
        textTransform: 'uppercase',
    },
    aiTitle: {
        fontSize: 24,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.white,
        marginBottom: 8,
    },
    aiDesc: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        lineHeight: 20,
        marginBottom: 16,
    },
    aiButton: {
        backgroundColor: Theme.colors.white,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 6,
    },
    aiButtonText: {
        color: Theme.colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
    },
    aiIcon: {
        position: 'absolute',
        right: -20,
        bottom: -20,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Theme.spacing['2xl'],
    },
    actionItem: {
        width: (width - 40 - 48) / 4,
        alignItems: 'center',
    },
    actionIcon: {
        width: 56,
        height: 56,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    actionLabel: {
        fontSize: 12,
        fontWeight: Theme.typography.fontWeight.medium as any,
        color: Theme.colors.text,
    },
    section: {
        marginBottom: Theme.spacing.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Theme.spacing.md,
    },
    sectionTitle: {
        fontSize: Theme.typography.fontSize.lg,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
    },
    seeAll: {
        fontSize: Theme.typography.fontSize.sm,
        color: Theme.colors.primary,
        fontWeight: Theme.typography.fontWeight.semibold as any,
    },
    pathCard: {
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.borderRadius.xl,
        padding: Theme.spacing.md,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    pathRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Theme.spacing.md,
    },
    pathImage: {
        width: 60,
        height: 60,
        borderRadius: Theme.borderRadius.lg,
        marginRight: Theme.spacing.md,
    },
    pathContent: {
        flex: 1,
    },
    pathCategory: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Theme.colors.primary,
        letterSpacing: 1,
        marginBottom: 2,
    },
    pathTitle: {
        fontSize: 16,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: 4,
    },
    progressCounter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    progressText: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
    },
    percentageCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 3,
        borderColor: Theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEF2FF',
    },
    percentageText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Theme.colors.primary,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: Theme.colors.background,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Theme.colors.primary,
    },
    featuredContent: {
        gap: Theme.spacing.md,
        paddingBottom: 4,
    },
    featuredCard: {
        width: 220,
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.borderRadius.xl,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    featuredImage: {
        width: '100%',
        height: 120,
    },
    featuredInfo: {
        padding: Theme.spacing.md,
    },
    featuredTitle: {
        fontSize: 14,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: 6,
    },
    featuredMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Theme.colors.text,
        marginLeft: 4,
    },
    metaDot: {
        fontSize: 12,
        color: Theme.colors.gray,
        marginHorizontal: 6,
    },
    duration: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
    },
    streakSection: {
        marginBottom: Theme.spacing.xl,
    },
    streakCard: {
        padding: Theme.spacing.lg,
        borderRadius: Theme.borderRadius.xl,
    },
    streakHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Theme.spacing.md,
        marginBottom: Theme.spacing.lg,
    },
    streakIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: Theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#F97316',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    streakTitle: {
        fontSize: 14,
        fontWeight: Theme.typography.fontWeight.semibold as any,
        color: '#9A3412',
    },
    streakCount: {
        fontSize: 18,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: '#F97316',
    },
    streakWeek: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayCol: {
        alignItems: 'center',
        gap: 6,
    },
    dayDot: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: Theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#9A3412',
    },
});

export default HomeScreen;
