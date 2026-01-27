import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomButton from '../components/CustomButton';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const CAREER_GOALS = [
    { id: 'transition', label: 'Career Transition', icon: 'swap-horizontal-outline' },
    { id: 'skills', label: 'Skill Development', icon: 'bulb-outline' },
    { id: 'job', label: 'Job Preparation', icon: 'briefcase-outline' },
    { id: 'education', label: 'Higher Education', icon: 'school-outline' },
    { id: 'entrep', label: 'Entrepreneurship', icon: 'rocket-outline' },
    { id: 'growth', label: 'Personal Growth', icon: 'trending-up-outline' },
];

const GoalSelectionScreen = ({ navigation }: any) => {
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

    const toggleGoal = (id: string) => {
        if (selectedGoals.includes(id)) {
            setSelectedGoals(selectedGoals.filter(goal => goal !== id));
        } else {
            setSelectedGoals([...selectedGoals, id]);
        }
    };

    return (
        <ScreenWrapper useGradient>
            <View style={styles.container}>
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: '40%' }]} />
                    </View>
                    <View style={styles.progressHeader}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={20} color={Theme.colors.textSecondary} />
                        </TouchableOpacity>
                        <Text style={styles.progressText}>Step 2 of 5</Text>
                        <View style={{ width: 20 }} />
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>What are your career goals?</Text>
                    <Text style={styles.subtitle}>Select all that apply to you. We'll tailor your experience accordingly.</Text>

                    <View style={styles.list}>
                        {CAREER_GOALS.map((item) => {
                            const isSelected = selectedGoals.includes(item.id);
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.goalCard,
                                        isSelected && styles.selectedGoalCard
                                    ]}
                                    onPress={() => toggleGoal(item.id)}
                                    activeOpacity={0.7}
                                >
                                    <View style={[
                                        styles.iconBox,
                                        isSelected && styles.selectedIconBox
                                    ]}>
                                        <Ionicons
                                            name={item.icon as any}
                                            size={24}
                                            color={isSelected ? Theme.colors.white : Theme.colors.primary}
                                        />
                                    </View>
                                    <View style={styles.textContent}>
                                        <Text style={[
                                            styles.goalLabel,
                                            isSelected && styles.selectedGoalLabel
                                        ]}>{item.label}</Text>
                                    </View>
                                    <View style={[
                                        styles.checkbox,
                                        isSelected && styles.selectedCheckbox
                                    ]}>
                                        {isSelected && <Ionicons name="checkmark" size={14} color={Theme.colors.white} />}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <CustomButton
                        title="Continue"
                        onPress={() => navigation.navigate('SkillAssessment')}
                        disabled={selectedGoals.length === 0}
                        style={styles.button}
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
    progressContainer: {
        paddingHorizontal: Theme.spacing.lg,
        paddingTop: Theme.spacing.md,
        paddingBottom: Theme.spacing.sm,
    },
    progressBar: {
        height: 6,
        backgroundColor: Theme.colors.border,
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: Theme.spacing.sm,
    },
    progressFill: {
        height: '100%',
        backgroundColor: Theme.colors.primary,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressText: {
        fontSize: Theme.typography.fontSize.xs,
        color: Theme.colors.textSecondary,
        fontWeight: Theme.typography.fontWeight.semibold as any,
    },
    scrollContent: {
        padding: Theme.spacing.lg,
    },
    title: {
        fontSize: Theme.typography.fontSize['2xl'],
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: Theme.spacing.sm,
    },
    subtitle: {
        fontSize: Theme.typography.fontSize.base,
        color: Theme.colors.textSecondary,
        marginBottom: Theme.spacing.xl,
    },
    list: {
        gap: Theme.spacing.md,
    },
    goalCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.borderRadius.xl,
        padding: Theme.spacing.md,
        borderWidth: 1.5,
        borderColor: Theme.colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 1,
    },
    selectedGoalCard: {
        borderColor: Theme.colors.primary,
        backgroundColor: '#EEF2FF', // Very light indigo
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: Theme.borderRadius.lg,
        backgroundColor: Theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Theme.spacing.md,
    },
    selectedIconBox: {
        backgroundColor: Theme.colors.primary,
    },
    textContent: {
        flex: 1,
    },
    goalLabel: {
        fontSize: Theme.typography.fontSize.base,
        fontWeight: Theme.typography.fontWeight.semibold as any,
        color: Theme.colors.text,
    },
    selectedGoalLabel: {
        color: Theme.colors.primary,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: Theme.colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCheckbox: {
        backgroundColor: Theme.colors.primary,
        borderColor: Theme.colors.primary,
    },
    footer: {
        padding: Theme.spacing.lg,
        backgroundColor: Theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.border,
    },
    button: {
        marginVertical: 0,
    },
});

export default GoalSelectionScreen;
