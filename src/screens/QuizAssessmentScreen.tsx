import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Platform } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';

const { width } = Dimensions.get('window');

const QUESTIONS = [
    {
        id: 1,
        question: "What does Hick's Law primarily focus on in user interface design?",
        options: [
            "Visually appealing color palettes",
            "Decision making time based on choice count",
            "The loading speed of mobile applications",
            "User engagement through social proof"
        ],
        correctIndex: 1
    }
];

const QuizAssessmentScreen = ({ navigation }: any) => {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const question = QUESTIONS[currentQuestionIdx];

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
    };

    const handleConfirm = () => {
        setIsAnswered(true);
    };

    const handleNext = () => {
        navigation.navigate('QuizResults');
    };

    return (
        <ScreenWrapper useGradient>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="close" size={24} color={Theme.colors.text} />
                    </TouchableOpacity>
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: '20%' }]} />
                        </View>
                        <Text style={styles.progressText}>Question 1 of 5</Text>
                    </View>
                    <View style={styles.timer}>
                        <Ionicons name="time-outline" size={16} color={Theme.colors.primary} />
                        <Text style={styles.timerText}>04:52</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <Text style={styles.questionText}>{question.question}</Text>

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
                                        isSelected && styles.selectedOption,
                                        isCorrect && styles.correctOption,
                                        isWrong && styles.wrongOption
                                    ]}
                                    activeOpacity={0.7}
                                    onPress={() => handleOptionSelect(index)}
                                >
                                    <View style={[
                                        styles.optionIndex,
                                        isSelected && { backgroundColor: Theme.colors.primary },
                                        isCorrect && { backgroundColor: Theme.colors.success },
                                        isWrong && { backgroundColor: Theme.colors.error }
                                    ]}>
                                        <Text style={[
                                            styles.optionIndexText,
                                            (isSelected || isAnswered) && { color: Theme.colors.white }
                                        ]}>{String.fromCharCode(65 + index)}</Text>
                                    </View>
                                    <Text style={[
                                        styles.optionText,
                                        isCorrect && { color: Theme.colors.success, fontWeight: 'bold' },
                                        isWrong && { color: Theme.colors.error, fontWeight: 'bold' }
                                    ]}>{option}</Text>

                                    {isCorrect && <Ionicons name="checkmark-circle" size={20} color={Theme.colors.success} />}
                                    {isWrong && <Ionicons name="close-circle" size={20} color={Theme.colors.error} />}
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {isAnswered && (
                        <Animated.View style={styles.feedbackContainer}>
                            <View style={[styles.feedbackLabel, { backgroundColor: selectedOption === question.correctIndex ? '#ECFDF5' : '#FEF2F2' }]}>
                                <Ionicons
                                    name={selectedOption === question.correctIndex ? "happy-outline" : "sad-outline"}
                                    size={20}
                                    color={selectedOption === question.correctIndex ? Theme.colors.success : Theme.colors.error}
                                />
                                <Text style={[styles.feedbackTitle, { color: selectedOption === question.correctIndex ? Theme.colors.success : Theme.colors.error }]}>
                                    {selectedOption === question.correctIndex ? "Excellent!" : "Not quite right"}
                                </Text>
                            </View>
                            <Text style={styles.explanation}>
                                Hick's Law predicts that the time and effort it takes to make a decision,
                                increases with the number and complexity of choices.
                            </Text>
                        </Animated.View>
                    )}
                </View>

                <View style={styles.footer}>
                    <CustomButton
                        title={isAnswered ? "Continue" : "Confirm Answer"}
                        onPress={isAnswered ? handleNext : handleConfirm}
                        disabled={selectedOption === null}
                        style={styles.actionBtn}
                    />
                </View>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Theme.spacing.lg,
        paddingTop: Platform.OS === 'ios' ? 20 : 10,
        paddingBottom: Theme.spacing.md,
        backgroundColor: Theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
    },
    progressContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: Theme.spacing.lg,
    },
    progressBar: {
        width: '100%',
        height: 6,
        backgroundColor: '#F1F5F9',
        borderRadius: 3,
        marginBottom: 4,
    },
    progressFill: {
        height: '100%',
        backgroundColor: Theme.colors.primary,
        borderRadius: 3,
    },
    progressText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Theme.colors.textSecondary,
    },
    timer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: '#EEF2FF',
        borderRadius: 8,
    },
    timerText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Theme.colors.primary,
    },
    content: {
        padding: Theme.spacing.xl,
        flex: 1,
    },
    questionText: {
        fontSize: 22,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        lineHeight: 30,
        marginBottom: Theme.spacing['2xl'], // FIXED: Use bracket notation for keys starting with numbers
    },
    optionsContainer: {
        gap: Theme.spacing.md,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
        borderRadius: 16,
        padding: Theme.spacing.lg,
        borderWidth: 1.5,
        borderColor: Theme.colors.border,
        gap: Theme.spacing.md,
    },
    selectedOption: {
        borderColor: Theme.colors.primary,
        backgroundColor: '#EEF2FF',
    },
    correctOption: {
        borderColor: Theme.colors.success,
        backgroundColor: '#ECFDF5',
    },
    wrongOption: {
        borderColor: Theme.colors.error,
        backgroundColor: '#FEF2F2',
    },
    optionIndex: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionIndexText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Theme.colors.textSecondary,
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        color: Theme.colors.text,
        lineHeight: 22,
    },
    feedbackContainer: {
        marginTop: Theme.spacing['2xl'], // FIXED: Use bracket notation here as well
        gap: 12,
    },
    feedbackLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        alignSelf: 'flex-start',
        gap: 8,
    },
    feedbackTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    explanation: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
        lineHeight: 20,
    },
    footer: {
        padding: Theme.spacing.xl,
        paddingBottom: Platform.OS === 'ios' ? 34 : Theme.spacing.xl,
        backgroundColor: Theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.border,
    },
    actionBtn: {
        height: 56,
        borderRadius: 16,
        marginVertical: 0,
    },
});

export default QuizAssessmentScreen;