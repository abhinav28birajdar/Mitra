import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '@app-types/navigation.types';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { courseService } from '@services/course/courseService';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@components/ScreenWrapper';
import Badge from '@components/ui/Badge';

const MyLearningScreen: React.FC = () => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

    const [enrollments, setEnrollments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!user) return;

        setLoading(true);
        const unsubscribe = courseService.subscribeToEnrollments(user.uid, (data) => {
            setEnrollments(data);
            setLoading(false);
            setRefreshing(false);
        });

        return () => unsubscribe();
    }, [user]);

    const fetchEnrollments = async () => {
        setRefreshing(true);
        try {
            const data = await courseService.getUserEnrollments(user!.uid);
            setEnrollments(data);
        } catch (error) {
            console.error(error);
        } finally {
            setRefreshing(false);
        }
    };

    const renderEnrollment = ({ item }: { item: any }) => {
        const { course, progress, status } = item;
        if (!course) return null;

        const isCompleted = status === 'completed' || progress === 100;

        return (
            <TouchableOpacity
                style={[styles.card, { backgroundColor: theme.colors.background.paper }]}
                onPress={() => navigation.navigate('CourseDetail', { courseId: course.id, course: course })}
                activeOpacity={0.9}
            >
                <Image source={{ uri: course.thumbnailUrl }} style={styles.thumbnail} />
                <View style={styles.cardInfo}>
                    <View style={styles.cardHeader}>
                        <Badge
                            label={isCompleted ? 'Completed' : 'In Progress'}
                            variant={isCompleted ? 'success' : 'primary'}
                            size="sm"
                        />
                        <Text style={[styles.category, { color: theme.colors.primary[600] }]}>{course.category}</Text>
                    </View>

                    <Text style={[styles.title, { color: theme.colors.text.primary }]} numberOfLines={2}>
                        {course.title}
                    </Text>

                    <View style={styles.footer}>
                        <View style={styles.progressContainer}>
                            <View style={[styles.progressBarBg, { backgroundColor: theme.colors.background.light }]}>
                                <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: theme.colors.primary[600] }]} />
                            </View>
                            <Text style={[styles.progressText, { color: theme.colors.text.secondary }]}>
                                {Math.round(progress)}%
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.playButton, { backgroundColor: theme.colors.primary[600] }]}
                            onPress={() => navigation.navigate('LessonViewer', { courseId: course.id, lessonId: course.firstLessonId || '' })}
                        >
                            <Icon name={isCompleted ? "refresh" : "play"} size={16} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ScreenWrapper title="My Learning">
            {loading ? (
                <View style={styles.centerSection}>
                    <ActivityIndicator size="large" color={theme.colors.primary[600]} />
                </View>
            ) : (
                <FlatList
                    data={enrollments}
                    renderItem={renderEnrollment}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={fetchEnrollments} tintColor={theme.colors.primary[600]} />
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <View style={[styles.emptyIconBox, { backgroundColor: theme.colors.background.light }]}>
                                <Icon name="book-outline" size={48} color={theme.colors.text.disabled} />
                            </View>
                            <Text style={[styles.emptyTitle, { color: theme.colors.text.primary }]}>No courses yet</Text>
                            <Text style={[styles.emptyDesc, { color: theme.colors.text.secondary }]}>
                                Enroll in a course to start your learning journey and track your progress here.
                            </Text>
                            <TouchableOpacity
                                style={[styles.browseButton, { backgroundColor: theme.colors.primary[600] }]}
                                onPress={() => navigation.navigate('MainTabs', { screen: 'Explore' } as any)}
                            >
                                <Text style={styles.browseText}>Explore Courses</Text>
                                <Icon name="arrow-forward" size={18} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                    }
                />
            )}
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    card: {
        borderRadius: 20,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    thumbnail: {
        width: '100%',
        height: 160,
    },
    cardInfo: {
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    category: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 24,
        marginBottom: 16,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
    },
    progressContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    progressBarBg: {
        flex: 1,
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 13,
        fontWeight: 'bold',
        width: 35,
    },
    playButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 60,
        paddingHorizontal: 40,
    },
    emptyIconBox: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    emptyDesc: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    browseButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 16,
        gap: 8,
    },
    browseText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default MyLearningScreen;
