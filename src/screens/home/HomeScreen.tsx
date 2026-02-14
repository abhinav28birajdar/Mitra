import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '@app-types/navigation.types';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { courseService } from '@services/course/courseService';
import { careerService } from '@services/career/careerService';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@components/ScreenWrapper';

const HomeScreen: React.FC = () => {
    const { theme } = useTheme();
    const { profile } = useAuth();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
    const [recommendedCareers, setRecommendedCareers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchHomeData();
    }, [profile?.id]);

    const fetchHomeData = async () => {
        if (!profile?.id) return;
        try {
            const enrollments = await courseService.getUserEnrollments(profile.id);
            setEnrolledCourses(enrollments.slice(0, 3)); // Show top 3

            const careers = await careerService.getAllCareers();
            // Filter by interest if available
            const filteredCareers = profile.careerInterests?.length > 0
                ? careers.filter(c => profile.careerInterests.includes(c.category?.toLowerCase()) || profile.careerInterests.includes(c.id))
                : careers;

            setRecommendedCareers(filteredCareers.slice(0, 5));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchHomeData();
    };

    const renderEnrolledCourse = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={[styles.courseCard, { backgroundColor: theme.colors.background.paper }]}
            onPress={() => navigation.navigate('CourseDetail', { courseId: item.courseId, course: item.course })}
        >
            <Image source={{ uri: item.course?.thumbnailUrl }} style={styles.courseThumb} />
            <View style={styles.courseInfo}>
                <Text style={[styles.courseTitle, { color: theme.colors.text.primary }]} numberOfLines={1}>
                    {item.course?.title}
                </Text>
                <View style={styles.progressRow}>
                    <View style={[styles.progressBarBg, { backgroundColor: theme.colors.background.light }]}>
                        <View style={[styles.progressBarFill, { backgroundColor: theme.colors.primary[600], width: `${item.progress}%` }]} />
                    </View>
                    <Text style={[styles.progressText, { color: theme.colors.text.secondary }]}>{Math.round(item.progress)}%</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={[styles.center, { backgroundColor: theme.colors.background.light }]}>
                <ActivityIndicator size="large" color={theme.colors.primary[600]} />
            </View>
        );
    }

    return (
        <ScreenWrapper hideHeader={true}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.primary[600]} />
                }
            >
                {/* Header Section */}
                <View style={styles.header}>
                    <View>
                        <Text style={[styles.greeting, { color: theme.colors.text.secondary }]}>Welcome back,</Text>
                        <Text style={[styles.name, { color: theme.colors.text.primary }]}>{profile?.displayName || 'Learner'}</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.advisorButton, { backgroundColor: theme.colors.primary[600] }]}
                        onPress={() => navigation.navigate('AIAdvisor')}
                    >
                        <Icon name="sparkles" size={20} color="#FFFFFF" />
                        <Text style={styles.advisorText}>Ask AI</Text>
                    </TouchableOpacity>
                </View>

                {/* Stats Section */}
                <View style={[styles.statsRow, { backgroundColor: theme.colors.background.paper }]}>
                    <View style={styles.statItem}>
                        <Icon name="flame" size={24} color="#F59E0B" />
                        <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>{profile?.stats?.currentStreak || 0}</Text>
                        <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>Streak</Text>
                    </View>
                    <View style={[styles.divider, { backgroundColor: theme.colors.border.light }]} />
                    <View style={styles.statItem}>
                        <Icon name="star" size={24} color="#FBBF24" />
                        <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>{profile?.stats?.points || 0}</Text>
                        <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>Points</Text>
                    </View>
                    <View style={[styles.divider, { backgroundColor: theme.colors.border.light }]} />
                    <View style={styles.statItem}>
                        <Icon name="trophy" size={24} color="#10B981" />
                        <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>{profile?.stats?.level || 1}</Text>
                        <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>Level</Text>
                    </View>
                </View>

                {/* Continue Learning */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Continue Learning</Text>
                        {enrolledCourses.length > 0 && (
                            <TouchableOpacity onPress={() => navigation.navigate('LearningTabs' as any)}>
                                <Text style={{ color: theme.colors.primary[600], fontWeight: '600' }}>View All</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {enrolledCourses.length > 0 ? (
                        <FlatList
                            data={enrolledCourses}
                            renderItem={renderEnrolledCourse}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.horizontalList}
                        />
                    ) : (
                        <View style={[styles.emptyCard, { backgroundColor: theme.colors.background.paper }]}>
                            <Icon name="book-outline" size={40} color={theme.colors.text.disabled} />
                            <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>Start your learning journey today!</Text>
                            <TouchableOpacity
                                style={[styles.browseButton, { backgroundColor: theme.colors.primary[600] }]}
                                onPress={() => navigation.navigate('MainTabs', { screen: 'Explore' } as any)}
                            >
                                <Text style={styles.browseButtonText}>Browse Courses</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Recommended Careers */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Recommended Careers</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('CareerList', {})}>
                            <Text style={{ color: theme.colors.primary[600], fontWeight: '600' }}>Explore</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.careerGrid}>
                        {recommendedCareers.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[styles.careerItem, { backgroundColor: theme.colors.background.paper }]}
                                onPress={() => navigation.navigate('CareerDetail', { careerId: item.id, career: item })}
                            >
                                <View style={[styles.careerIconBox, { backgroundColor: theme.colors.primary[50] }]}>
                                    <Icon name="briefcase-outline" size={20} color={theme.colors.primary[600]} />
                                </View>
                                <View style={styles.careerContent}>
                                    <Text style={[styles.careerTitle, { color: theme.colors.text.primary }]}>{item.title}</Text>
                                    <Text style={[styles.careerMeta, { color: theme.colors.text.secondary }]}>{item.category} • {item.demandLevel || 'High'} Demand</Text>
                                </View>
                                <Icon name="chevron-forward" size={18} color={theme.colors.text.disabled} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Community Highlights */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Community Activity</Text>
                    <TouchableOpacity
                        style={[styles.communityCTA, { backgroundColor: theme.colors.secondary[500] || '#4F46E5' }]}
                        onPress={() => navigation.navigate('MainTabs', { screen: 'Community' } as any)}
                    >
                        <View style={styles.ctaContent}>
                            <Text style={styles.ctaTitle}>Connect with Peers</Text>
                            <Text style={styles.ctaDesc}>Share your progress and learn with 5,000+ students.</Text>
                        </View>
                        <View style={styles.ctaIcon}>
                            <Icon name="people" size={24} color="#FFFFFF" />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
        marginBottom: 24,
    },
    greeting: {
        fontSize: 16,
        fontWeight: '500',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    advisorButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
    },
    advisorText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    statsRow: {
        flexDirection: 'row',
        marginHorizontal: 24,
        padding: 16,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 4,
    },
    statLabel: {
        fontSize: 12,
    },
    divider: {
        width: 1,
        height: 30,
    },
    section: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    horizontalList: {
        paddingRight: 24,
    },
    courseCard: {
        width: 260,
        borderRadius: 20,
        overflow: 'hidden',
        marginRight: 16,
        padding: 12,
    },
    courseThumb: {
        width: '100%',
        height: 140,
        borderRadius: 14,
        marginBottom: 12,
    },
    courseInfo: {
        paddingHorizontal: 4,
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    progressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    progressBarBg: {
        flex: 1,
        height: 6,
        borderRadius: 3,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    progressText: {
        fontSize: 12,
        fontWeight: 'bold',
        width: 35,
    },
    emptyCard: {
        padding: 32,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 20,
    },
    browseButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
    },
    browseButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    careerGrid: {
        gap: 12,
    },
    careerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 16,
    },
    careerIconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    careerContent: {
        flex: 1,
    },
    careerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    careerMeta: {
        fontSize: 12,
        marginTop: 2,
    },
    communityCTA: {
        flexDirection: 'row',
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
    },
    ctaContent: {
        flex: 1,
    },
    ctaTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    ctaDesc: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
    },
    ctaIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
    }
});

export default HomeScreen;
