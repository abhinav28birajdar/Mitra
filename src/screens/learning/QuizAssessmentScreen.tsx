import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Platform, ActivityIndicator } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '@app-types/navigation.types';
import { useTheme } from '@context/ThemeContext';
import { courseService } from '@services/course/courseService';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@components/ScreenWrapper';

const { width } = Dimensions.get('window');

const QuizAssessmentScreen: React.FC = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const route = useRoute<RouteProp<MainStackParamList, 'QuizAssessment'>>();
    const { quizId, lessonId, courseId } = route.params;

    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);

    // Mock Questions - In a real app, fetch from Firestore
    const QUESTIONS = [
        {
            id: "q1",
            question: "What is the primary benefit of using React Native?",
            options: [
                "Better performance than native",
                "Single codebase for multiple platforms",
                "Easier to learn than HTML/CSS",
                "It's owned by Google"
            ],
            correctIndex: 1
        },
        {
            id: "q2",
            question: "Which component is used to render a list efficiently?",
            options: [
                "ScrollView",
                "ListView",
                "FlatList",
                "Map"
            ],
            correctIndex: 2
        }
    ];

    const question = QUESTIONS[currentQuestionIdx];

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
    };

    const handleConfirm = () => {
        setIsAnswered(true);
        if (selectedOption === question.correctIndex) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIdx < QUESTIONS.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            // Finish Quiz
            const finalScore = (score + (selectedOption === question.correctIndex ? 1 : 0)) / QUESTIONS.length * 100;
            Alert.alert('Quiz Completed!', `Your score: ${finalScore}%`, [
                { text: 'Finish', onPress: () => navigation.goBack() }
            ]);
        }
    };

    return (
        <ScreenWrapper title="Quiz" showBackButton={true}>
            <View style={styles.container}>
                <View style={[styles.progressHeader, { backgroundColor: theme.colors.background.paper }]}>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    width: `${((currentQuestionIdx + 1) / QUESTIONS.length) * 100}%`,
                                    backgroundColor: theme.colors.primary[600]
                                }
                            ]}
                        />
                    </View>
                    <Text style={[styles.progressText, { color: theme.colors.text.secondary }]}>
                        Question {currentQuestionIdx + 1} of {QUESTIONS.length}
                    </Text>
                </View>

                <View style={styles.content}>
                    <Text style={[styles.questionText, { color: theme.colors.text.primary }]}>{question.question}</Text>

                    <View style={styles.optionsContainer}>
                        {question.options.map((option, index) => {
                            const isSelected = selectedOption === index;
                            const isCorrect = isAnswered && index === question.correctIndex;
                            const isWrong = isAnswered && isSelected && index !== question.correctIndex;

                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.optionCard,
                                        {
                                            backgroundColor: theme.colors.background.paper,
                                            borderColor: isSelected ? theme.colors.primary[600] : theme.colors.border.light
                                        },
                                        isCorrect && { borderColor: theme.colors.success.main, backgroundColor: theme.colors.success.main + '10' },
                                        isWrong && { borderColor: theme.colors.error.main, backgroundColor: theme.colors.error.main + '10' }
                                    ]}
                                    onPress={() => handleOptionSelect(index)}
                                >
                                    <View style={[
                                        styles.optionIndex,
                                        { backgroundColor: theme.colors.background.light },
                                        isSelected && { backgroundColor: theme.colors.primary[600] },
                                        isCorrect && { backgroundColor: theme.colors.success.main },
                                        isWrong && { backgroundColor: theme.colors.error.main }
                                    ]}>
                                        <Text style={[
                                            styles.optionIndexText,
                                            { color: theme.colors.text.secondary },
                                            isSelected && { color: '#FFFFFF' }
                                        ]}>{String.fromCharCode(65 + index)}</Text>
                                    </View>
                                    <Text style={[styles.optionText, { color: theme.colors.text.primary }]}>{option}</Text>

                                    {isCorrect && <Icon name="checkmark-circle" size={24} color={theme.colors.success.main} />}
                                    {isWrong && <Icon name="close-circle" size={24} color={theme.colors.error.main} />}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View style={[styles.footer, { backgroundColor: theme.colors.background.paper, borderTopColor: theme.colors.border.light }]}>
                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            { backgroundColor: theme.colors.primary[600] },
                            selectedOption === null && { opacity: 0.5 }
                        ]}
                        onPress={isAnswered ? handleNext : handleConfirm}
                        disabled={selectedOption === null}
                    >
                        <Text style={styles.actionButtonText}>
                            {isAnswered ? (currentQuestionIdx === QUESTIONS.length - 1 ? "Finish" : "Next Question") : "Confirm Answer"}
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
    },
    progressHeader: {
        padding: 16,
        alignItems: 'center',
    },
    progressBar: {
        width: '100%',
        height: 6,
        backgroundColor: '#F3F4F6',
        borderRadius: 3,
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
    },
    progressText: {
        fontSize: 12,
        fontWeight: '600',
    },
    content: {
        padding: 24,
        flex: 1,
    },
    questionText: {
        fontSize: 22,
        fontWeight: 'bold',
        lineHeight: 30,
        marginBottom: 32,
    },
    optionsContainer: {
        gap: 16,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1.5,
        gap: 12,
    },
    optionIndex: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionIndexText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        lineHeight: 22,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
    },
    actionButton: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default QuizAssessmentScreen;
