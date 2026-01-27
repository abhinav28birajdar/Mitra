import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomButton from '../components/CustomButton';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const INTERESTS = [
    'Technology & IT', 'Business & Finance', 'Creative Arts', 'Healthcare',
    'Engineering', 'Marketing & Sales', 'Education', 'Science & Research',
    'AI & Machine Learning', 'Cybersecurity', 'Digital Marketing', 'Data Science',
    'UX/UI Design', 'Project Management', 'Product Design', 'Public Speaking',
    'Entrepreneurship', 'Soft Skills', 'Human Resources', 'Content Creation',
    'Blockchain', 'Cloud Computing', 'Mobile Development', 'Game Design'
];

const InterestSelectionScreen = ({ navigation }: any) => {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [search, setSearch] = useState('');

    const toggleInterest = (interest: string) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(i => i !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const filteredInterests = INTERESTS.filter(i =>
        i.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <ScreenWrapper useGradient>
            <View style={styles.container}>
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: '80%' }]} />
                    </View>
                    <View style={styles.progressHeader}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={20} color={Theme.colors.textSecondary} />
                        </TouchableOpacity>
                        <Text style={styles.progressText}>Step 4 of 5</Text>
                        <View style={{ width: 20 }} />
                    </View>
                </View>

                <View style={styles.header}>
                    <Text style={styles.title}>Select your areas of interest</Text>
                    <Text style={styles.subtitle}>Choose at least 3 topics you'd like to explore.</Text>

                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color={Theme.colors.gray} style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search interests..."
                            value={search}
                            onChangeText={setSearch}
                            placeholderTextColor={Theme.colors.gray}
                        />
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.chipContainer}>
                        {filteredInterests.map((interest) => {
                            const isSelected = selectedInterests.includes(interest);
                            return (
                                <TouchableOpacity
                                    key={interest}
                                    style={[
                                        styles.chip,
                                        isSelected && styles.selectedChip
                                    ]}
                                    onPress={() => toggleInterest(interest)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[
                                        styles.chipText,
                                        isSelected && styles.selectedChipText
                                    ]}>{interest}</Text>
                                    {isSelected && (
                                        <Ionicons name="close-circle" size={16} color={Theme.colors.white} style={{ marginLeft: 6 }} />
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.countContainer}>
                        <Text style={styles.countText}>{selectedInterests.length} selected</Text>
                        {selectedInterests.length < 3 && (
                            <Text style={styles.requirementText}>Select {3 - selectedInterests.length} more</Text>
                        )}
                    </View>
                    <CustomButton
                        title="Continue"
                        onPress={() => navigation.navigate('LearningPreference')}
                        disabled={selectedInterests.length < 3}
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
    header: {
        padding: Theme.spacing.lg,
        paddingBottom: 0,
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
        marginBottom: Theme.spacing.lg,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.borderRadius.lg,
        paddingHorizontal: Theme.spacing.md,
        height: 50,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    searchIcon: {
        marginRight: Theme.spacing.sm,
    },
    searchInput: {
        flex: 1,
        fontSize: Theme.typography.fontSize.base,
        color: Theme.colors.text,
    },
    scrollContent: {
        padding: Theme.spacing.lg,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Theme.spacing.sm,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Theme.spacing.lg,
        paddingVertical: Theme.spacing.sm,
        borderRadius: Theme.borderRadius.full,
        backgroundColor: Theme.colors.surface,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    selectedChip: {
        backgroundColor: Theme.colors.primary,
        borderColor: Theme.colors.primary,
    },
    chipText: {
        fontSize: Theme.typography.fontSize.sm,
        fontWeight: Theme.typography.fontWeight.medium as any,
        color: Theme.colors.text,
    },
    selectedChipText: {
        color: Theme.colors.white,
    },
    footer: {
        padding: Theme.spacing.lg,
        backgroundColor: Theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.border,
    },
    countContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Theme.spacing.md,
    },
    countText: {
        fontSize: Theme.typography.fontSize.sm,
        fontWeight: Theme.typography.fontWeight.semibold as any,
        color: Theme.colors.text,
    },
    requirementText: {
        fontSize: Theme.typography.fontSize.xs,
        color: Theme.colors.error,
    },
    button: {
        marginVertical: 0,
    },
});

export default InterestSelectionScreen;
