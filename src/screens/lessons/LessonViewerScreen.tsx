import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    Alert
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '@app-types/navigation.types';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { courseService } from '@services/course/courseService';
import { Lesson, Course } from '@app-types/firebase.types';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@components/ScreenWrapper';

type LessonViewerRouteProp = RouteProp<MainStackParamList, 'LessonViewer'>;
const { width } = Dimensions.get('window');

const LessonViewerScreen: React.FC = () => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const route = useRoute<LessonViewerRouteProp>();
    const navigation = useNavigation();
    const { courseId, lessonId } = route.params;

    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [completing, setCompleting] = useState(false);

    useEffect(() => {
        fetchLessonData();
    }, [lessonId]);

    const fetchLessonData = async () => {
        setLoading(true);
        try {
            const allLessons = await courseService.getLessonsByCourseId(courseId);
            setLessons(allLessons as Lesson[]);
            const currentLesson = allLessons.find(l => l.id === lessonId);
            setLesson(currentLesson as Lesson);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async () => {
        if (!user || !lesson) return;
        setCompleting(true);
        try {
            await courseService.updateLessonProgress(user.uid, courseId, lessonId, lesson.duration);

            const currentIndex = lessons.findIndex(l => l.id === lessonId);
            if (currentIndex < lessons.length - 1) {
                const nextLesson = lessons[currentIndex + 1];
                Alert.alert('Nice work!', 'Lesson completed.', [
                    { text: 'Next Lesson', onPress: () => (navigation as any).navigate('LessonViewer', { courseId, lessonId: nextLesson.id }) }
                ]);
            } else {
                Alert.alert('Congratulations!', 'You finished the course!', [
                    { text: 'Go to My Learning', onPress: () => (navigation as any).navigate('MainTabs', { screen: 'Learning' }) }
                ]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setCompleting(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.center, { backgroundColor: theme.colors.background.light }]}>
                <ActivityIndicator size="large" color={theme.colors.primary[600]} />
            </View>
        );
    }

    if (!lesson) return null;

    return (
        <ScreenWrapper title={lesson.title} showBackButton={true}>
            <View style={styles.videoPlaceholder}>
                <View style={styles.videoInner}>
                    <Icon name="play" size={50} color="#FFFFFF" />
                    <Text style={styles.videoText}>Video Player Loading...</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.lessonType, { color: theme.colors.primary[600] }]}>{lesson.type.toUpperCase()}</Text>
                    <Text style={[styles.title, { color: theme.colors.text.primary }]}>{lesson.title}</Text>
                    <View style={styles.metaRow}>
                        <Icon name="time-outline" size={16} color={theme.colors.text.secondary} />
                        <Text style={[styles.metaText, { color: theme.colors.text.secondary }]}>{lesson.duration} minutes</Text>
                    </View>
                </View>

                <View style={styles.body}>
                    <Text style={[styles.bodyText, { color: theme.colors.text.primary }]}>
                        {lesson.content?.textContent || "No detailed content available for this lesson. Please watch the video or check the attachments."}
                    </Text>

                    {lesson.content?.videoUrl && (
                        <View style={[styles.attachmentCard, { backgroundColor: theme.colors.background.paper }]}>
                            <Icon name="link-outline" size={20} color={theme.colors.primary[600]} />
                            <Text style={[styles.attachmentText, { color: theme.colors.text.primary }]}>Resources.pdf</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <View style={[styles.footer, { backgroundColor: theme.colors.background.paper, borderTopColor: theme.colors.border.light }]}>
                <TouchableOpacity
                    style={[styles.completeButton, { backgroundColor: theme.colors.primary[600] }]}
                    onPress={handleComplete}
                    disabled={completing}
                >
                    {completing ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <>
                            <Text style={styles.completeButtonText}>Complete & Continue</Text>
                            <Icon name="checkmark-done" size={20} color="#FFFFFF" />
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    videoPlaceholder: {
        width: width,
        aspectRatio: 16 / 9,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoInner: {
        alignItems: 'center',
    },
    videoText: {
        color: '#FFFFFF',
        marginTop: 10,
        fontSize: 14,
    },
    content: {
        padding: 20,
        paddingBottom: 100,
    },
    header: {
        marginBottom: 20,
    },
    lessonType: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 14,
    },
    body: {
        marginTop: 10,
    },
    bodyText: {
        fontSize: 16,
        lineHeight: 24,
    },
    attachmentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        marginTop: 112,
        gap: 8,
    },
    attachmentText: {
        fontSize: 14,
        fontWeight: '600',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
        borderTopWidth: 1,
    },
    completeButton: {
        flexDirection: 'row',
        height: 54,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    completeButtonText: {
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

export default LessonViewerScreen;
