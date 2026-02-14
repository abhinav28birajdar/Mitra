import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '@app-types/navigation.types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@components/ScreenWrapper';
import CustomButton from '@components/CustomButton';

type QuizResultsRouteProp = RouteProp<MainStackParamList, 'QuizResults'>;
const { width } = Dimensions.get('window');

const QuizResultsScreen: React.FC = () => {
    const { theme } = useTheme();
    const route = useRoute<QuizResultsRouteProp>();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const { score, totalQuestions, courseId } = route.params;

    const percentage = Math.round((score / totalQuestions) * 100);
    const isSuccess = percentage >= 70;

    return (
        <ScreenWrapper hideHeader={true}>
            <View style={styles.container}>
                <View style={[styles.card, { backgroundColor: theme.colors.background.paper }]}>
                    <View style={[
                        styles.iconCircle,
                        { backgroundColor: isSuccess ? theme.colors.success.main + '20' : theme.colors.error.main + '20' }
                    ]}>
                        <Icon
                            name={isSuccess ? "trophy" : "alert-circle"}
                            size={64}
                            color={isSuccess ? theme.colors.success.main : theme.colors.error.main}
                        />
                    </View>

                    <Text style={[styles.statusTitle, { color: theme.colors.text.primary }]}>
                        {isSuccess ? 'Quiz Completed!' : 'Keep Practicing!'}
                    </Text>

                    <View style={styles.scoreContainer}>
                        <Text style={[styles.scoreLabel, { color: theme.colors.text.secondary }]}>Your Score</Text>
                        <Text style={[styles.scoreValue, { color: isSuccess ? theme.colors.success.main : theme.colors.error.main }]}>
                            {score} / {totalQuestions}
                        </Text>
                        <Text style={[styles.percentage, { color: theme.colors.text.secondary }]}>
                            {percentage}%
                        </Text>
                    </View>

                    <Text style={[styles.feedback, { color: theme.colors.text.secondary }]}>
                        {isSuccess
                            ? 'Great job! You have demonstrated a strong understanding of the material.'
                            : 'Don\'t worry! Go back and review the lessons to improve your score.'}
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <CustomButton
                        title={isSuccess ? "Continue to Next Lesson" : "Retry Quiz"}
                        onPress={() => {
                            if (isSuccess) {
                                navigation.goBack(); // Or navigate to next lesson
                            } else {
                                navigation.goBack();
                            }
                        }}
                        icon={<Icon name={isSuccess ? "arrow-forward" : "refresh"} size={20} color="#FFFFFF" />}
                    />

                    <TouchableOpacity
                        style={styles.backLink}
                        onPress={() => navigation.navigate('CourseDetail', { courseId })}
                    >
                        <Text style={{ color: theme.colors.primary[600], fontWeight: 'bold' }}>
                            Back to Course Details
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
    },
    card: {
        borderRadius: 30,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    statusTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scoreContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    scoreLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    scoreValue: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    percentage: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    feedback: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 24,
    },
    buttonContainer: {
        marginTop: 40,
        gap: 16,
    },
    backLink: {
        alignItems: 'center',
        paddingVertical: 10,
    }
});

export default QuizResultsScreen;
