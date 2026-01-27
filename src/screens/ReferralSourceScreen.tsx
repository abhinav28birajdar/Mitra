import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomButton from '../components/CustomButton';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const REFERRAL_SOURCES = [
    { id: 'instagram', label: 'Instagram', icon: 'logo-instagram' },
    { id: 'college', label: 'School/College', icon: 'school-outline' },
    { id: 'friend', label: 'Friend/Family', icon: 'people-outline' },
    { id: 'search', label: 'Online Search', icon: 'search-outline' },
    { id: 'youtube', label: 'YouTube', icon: 'logo-youtube' },
    { id: 'other', label: 'Other', icon: 'ellipsis-horizontal-outline' },
];

const ReferralSourceScreen = ({ navigation }: any) => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <ScreenWrapper useGradient>
            <View style={styles.container}>
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: '20%' }]} />
                    </View>
                    <Text style={styles.progressText}>Step 1 of 5</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>How did you hear about Mitra?</Text>
                    <Text style={styles.subtitle}>Select one option to help us understand our community better.</Text>

                    <View style={styles.grid}>
                        {REFERRAL_SOURCES.map((item) => {
                            const isSelected = selected === item.id;
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.optionButton,
                                        isSelected && styles.selectedOption
                                    ]}
                                    onPress={() => setSelected(item.id)}
                                    activeOpacity={0.7}
                                >
                                    <View style={[
                                        styles.iconContainer,
                                        isSelected && styles.selectedIconContainer
                                    ]}>
                                        <Ionicons
                                            name={item.icon as any}
                                            size={28}
                                            color={isSelected ? Theme.colors.white : Theme.colors.primary}
                                        />
                                    </View>
                                    <Text style={[
                                        styles.optionLabel,
                                        isSelected && styles.selectedOptionLabel
                                    ]}>{item.label}</Text>

                                    {isSelected && (
                                        <View style={styles.checkBadge}>
                                            <Ionicons name="checkmark" size={12} color={Theme.colors.white} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <CustomButton
                        title="Continue"
                        onPress={() => navigation.navigate('GoalSelection')}
                        disabled={!selected}
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
        marginBottom: Theme.spacing.xs,
    },
    progressFill: {
        height: '100%',
        backgroundColor: Theme.colors.primary,
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
    optionButton: {
        width: '48%',
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.borderRadius.lg,
        padding: Theme.spacing.lg,
        alignItems: 'center',
        marginBottom: Theme.spacing.md,
        borderWidth: 2,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        position: 'relative',
    },
    selectedOption: {
        borderColor: Theme.colors.primary,
        backgroundColor: Theme.colors.surface,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Theme.spacing.sm,
    },
    selectedIconContainer: {
        backgroundColor: Theme.colors.primary,
    },
    optionLabel: {
        fontSize: Theme.typography.fontSize.sm,
        fontWeight: Theme.typography.fontWeight.semibold as any,
        color: Theme.colors.text,
        textAlign: 'center',
    },
    selectedOptionLabel: {
        color: Theme.colors.primary,
    },
    checkBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: Theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
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

export default ReferralSourceScreen;
