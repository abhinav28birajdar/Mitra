import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Dimensions,
    Alert
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '@app-types/navigation.types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { courseService } from '@services/course/courseService';
import { Course, Lesson } from '@app-types/firebase.types';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@components/ScreenWrapper';

type CourseDetailRouteProp = RouteProp<MainStackParamList, 'CourseDetail'>;
const { width } = Dimensions.get('window');

const CourseDetailScreen: React.FC = () => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const route = useRoute<CourseDetailRouteProp>();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const { courseId } = route.params;

    const [course, setCourse] = useState<Course | null>(null);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        fetchData();
    }, [courseId]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const courseData = await courseService.getCourseById(courseId);
            const lessonsData = await courseService.getLessonsByCourseId(courseId);
            setCourse(courseData as Course);
            setLessons(lessonsData as Lesson[]);

            if (user) {
                const enrollments = await courseService.getUserEnrollments(user.uid);
                setIsEnrolled(enrollments.some(e => e.courseId === courseId));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        if (!user) {
            (navigation as any).navigate('Auth', { screen: 'Login' });
            return;
        }

        setEnrolling(true);
        try {
            if (course?.price === 0) {
                await courseService.enrollInCourse(user.uid, courseId);
                setIsEnrolled(true);
                Alert.alert('Success', 'Successfully enrolled in course!', [
                    { text: 'Start Learning', onPress: () => navigation.navigate('LessonViewer', { courseId, lessonId: lessons[0].id }) }
                ]);
            } else {
                // Stripe integration logic would go here
                Alert.alert('Paid Course', 'Checkout functionality coming soon.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to enroll.');
        } finally {
            setEnrolling(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.center, { backgroundColor: theme.colors.background.light }]}>
                <ActivityIndicator size="large" color={theme.colors.primary[600]} />
            </View>
        );
    }

    if (!course) return null;

    return (
        <ScreenWrapper title="Course Details" showBackButton={true}>
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={{ uri: course.thumbnailUrl }} style={styles.thumbnail} />

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={[styles.category, { color: theme.colors.primary[600] }]}>{course.category}</Text>
                        <Text style={[styles.title, { color: theme.colors.text.primary }]}>{course.title}</Text>
                        <View style={styles.metaRow}>
                            <View style={styles.metaItem}>
                                <Icon name="star" size={16} color="#FBBF24" />
                                <Text style={[styles.metaText, { color: theme.colors.text.primary }]}>{course.rating.toFixed(1)}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Icon name="people-outline" size={16} color={theme.colors.text.secondary} />
                                <Text style={[styles.metaText, { color: theme.colors.text.secondary }]}>{course.studentCount} students</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Icon name="time-outline" size={16} color={theme.colors.text.secondary} />
                                <Text style={[styles.metaText, { color: theme.colors.text.secondary }]}>{course.duration}m</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.instructorCard, { backgroundColor: theme.colors.background.paper }]}>
                        <View style={[styles.avatar, { backgroundColor: theme.colors.primary[100] }]}>
                            <Icon name="person" size={24} color={theme.colors.primary[600]} />
                        </View>
                        <View>
                            <Text style={[styles.instructorName, { color: theme.colors.text.primary }]}>{course.instructorName}</Text>
                            <Text style={[styles.instructorBio, { color: theme.colors.text.secondary }]}>Course Expert</Text>
                        </View>
                    </View>

                    <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Description</Text>
                    <Text style={[styles.description, { color: theme.colors.text.secondary }]}>{course.description}</Text>

                    <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Curriculum ({lessons.length} lessons)</Text>
                    {lessons.map((lesson, index) => (
                        <TouchableOpacity
                            key={lesson.id}
                            style={[styles.lessonItem, { borderBottomColor: theme.colors.border.light }]}
                            disabled={!isEnrolled}
                            onPress={() => navigation.navigate('LessonViewer', { courseId, lessonId: lesson.id })}
                        >
                            <View style={styles.lessonOrder}>
                                <Text style={[styles.lessonOrderText, { color: theme.colors.text.disabled }]}>{(index + 1).toString().padStart(2, '0')}</Text>
                            </View>
                            <View style={styles.lessonInfo}>
                                <Text style={[styles.lessonTitle, { color: isEnrolled ? theme.colors.text.primary : theme.colors.text.disabled }]}>{lesson.title}</Text>
                                <Text style={[styles.lessonMeta, { color: theme.colors.text.disabled }]}>{lesson.duration}m • {lesson.type}</Text>
                            </View>
                            <Icon
                                name={isEnrolled ? "play-circle-outline" : "lock-closed-outline"}
                                size={24}
                                color={isEnrolled ? theme.colors.primary[600] : theme.colors.text.disabled}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <View style={[styles.footer, { backgroundColor: theme.colors.background.paper, borderTopColor: theme.colors.border.light }]}>
                <View>
                    <Text style={[styles.priceLabel, { color: theme.colors.text.secondary }]}>Total Price</Text>
                    <Text style={[styles.priceValue, { color: theme.colors.text.primary }]}>
                        {course.price === 0 ? 'Free' : `$${course.price}`}
                    </Text>
                </View>
                <TouchableOpacity
                    style={[
                        styles.enrollButton,
                        { backgroundColor: isEnrolled ? theme.colors.success.main : theme.colors.primary[600] }
                    ]}
                    onPress={isEnrolled ? () => navigation.navigate('LessonViewer', { courseId, lessonId: lessons[0]?.id }) : handleEnroll}
                    disabled={enrolling}
                >
                    {enrolling ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.enrollButtonText}>{isEnrolled ? 'Continue' : 'Enroll Now'}</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 100,
    },
    thumbnail: {
        width: width,
        height: 240,
    },
    content: {
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    category: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: 14,
        fontWeight: '600',
    },
    instructorCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    instructorName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    instructorBio: {
        fontSize: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        marginTop: 8,
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 24,
    },
    lessonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    lessonOrder: {
        width: 30,
    },
    lessonOrderText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lessonInfo: {
        flex: 1,
        paddingRight: 12,
    },
    lessonTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    lessonMeta: {
        fontSize: 12,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderTopWidth: 1,
    },
    priceLabel: {
        fontSize: 12,
    },
    priceValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    enrollButton: {
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
    },
    enrollButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CourseDetailScreen;
