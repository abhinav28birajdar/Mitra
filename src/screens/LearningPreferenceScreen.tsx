import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomButton from '../components/CustomButton';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const PREFERENCES = [
    { id: 'video', label: 'Video Content', icon: 'play-circle-outline' },
    { id: 'reading', label: 'Reading Articles', icon: 'book-outline' },
    { id: 'quizzes', label: 'Interactive Quizzes', icon: 'help-circle-outline' },
    { id: 'projects', label: 'Hands-on Projects', icon: 'construct-outline' },
    { id: 'audio', label: 'Audio/Podcasts', icon: 'mic-outline' },
    { id: 'live', label: 'Live Sessions', icon: 'videocam-outline' },
];

const LearningPreferenceScreen = ({ navigation }: any) => {
    const [selected, setSelected] = useState<string[]>([]);

    const togglePreference = (id: string) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(p => p !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    return (
        <ScreenWrapper useGradient>
            <View style={styles.container}>
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: '100%' }]} />
                    </View>
                    <View style={styles.progressHeader}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={20} color={Theme.colors.textSecondary} />
                        </TouchableOpacity>
                        <Text style={styles.progressText}>Step 5 of 5</Text>
                        <View style={{ width: 20 }} />
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>How do you prefer to learn?</Text>
                    <Text style={styles.subtitle}>Select the formats that work best for you.</Text>

                    <View style={styles.grid}>
                        {PREFERENCES.map((item) => {
                            const isSelected = selected.includes(item.id);
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.prefCard,
                                        isSelected && styles.selectedCard
                                    ]}
                                    onPress={() => togglePreference(item.id)}
                                    activeOpacity={0.7}
                                >
                                    <View style={[
                                        styles.iconContainer,
                                        isSelected && styles.selectedIconContainer
                                    ]}>
                                        <Ionicons
                                            name={item.icon as any}
                                            size={32}
                                            color={isSelected ? Theme.colors.white : Theme.colors.primary}
                                        />
                                    </View>
                                    <Text style={[
                                        styles.label,
                                        isSelected && styles.selectedLabel
                                    ]}>{item.label}</Text>

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
                        title="Complete Setup"
                        onPress={() => navigation.navigate('ProfileSetup')}
                        disabled={selected.length === 0}
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
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    prefCard: {
        width: '48%',
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.borderRadius.xl,
        padding: Theme.spacing.lg,
        alignItems: 'center',
        marginBottom: Theme.spacing.md,
        borderWidth: 1.5,
        borderColor: Theme.colors.border,
        position: 'relative',
    },
    selectedCard: {
        borderColor: Theme.colors.primary,
        backgroundColor: '#EEF2FF',
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Theme.spacing.md,
    },
    selectedIconContainer: {
        backgroundColor: Theme.colors.primary,
    },
    label: {
        fontSize: Theme.typography.fontSize.sm,
        fontWeight: Theme.typography.fontWeight.semibold as any,
        color: Theme.colors.text,
        textAlign: 'center',
    },
    selectedLabel: {
        color: Theme.colors.primary,
    },
    checkbox: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 22,
        height: 22,
        borderRadius: 11,
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

export default LearningPreferenceScreen;
