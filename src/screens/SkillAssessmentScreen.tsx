import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomButton from '../components/CustomButton';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const LEVELS = [
    {
        id: 'beginner',
        label: 'Beginner',
        desc: 'Just starting out, no prior experience in the field.',
        icon: 'star-outline',
        color: '#10B981'
    },
    {
        id: 'intermediate',
        label: 'Intermediate',
        desc: 'Have some basic knowledge and experience.',
        icon: 'star-half-outline',
        color: '#3B82F6'
    },
    {
        id: 'advanced',
        label: 'Advanced',
        desc: 'Experienced professional with significant expertise.',
        icon: 'star',
        color: '#6366F1'
    },
    {
        id: 'expert',
        label: 'Expert',
        desc: 'Industry veteran with deep mastery and leadership.',
        icon: 'trophy-outline',
        color: '#F59E0B'
    },
];

const SkillAssessmentScreen = ({ navigation }: any) => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <ScreenWrapper useGradient>
            <View style={styles.container}>
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: '60%' }]} />
                    </View>
                    <View style={styles.progressHeader}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={20} color={Theme.colors.textSecondary} />
                        </TouchableOpacity>
                        <Text style={styles.progressText}>Step 3 of 5</Text>
                        <View style={{ width: 20 }} />
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>What's your current experience level?</Text>
                    <Text style={styles.subtitle}>Help us provide content that matches your expertise.</Text>

                    <View style={styles.list}>
                        {LEVELS.map((item) => {
                            const isSelected = selected === item.id;
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.levelCard,
                                        isSelected && { borderColor: item.color, backgroundColor: `${item.color}10` }
                                    ]}
                                    onPress={() => setSelected(item.id)}
                                    activeOpacity={0.7}
                                >
                                    <View style={[
                                        styles.iconBox,
                                        { backgroundColor: `${item.color}20` }
                                    ]}>
                                        <Ionicons name={item.icon as any} size={24} color={item.color} />
                                    </View>
                                    <View style={styles.textContent}>
                                        <Text style={[styles.levelLabel, isSelected && { color: item.color }]}>{item.label}</Text>
                                        <Text style={styles.levelDesc}>{item.desc}</Text>
                                    </View>
                                    <View style={[
                                        styles.radio,
                                        isSelected && { borderColor: item.color }
                                    ]}>
                                        {isSelected && <View style={[styles.radioFill, { backgroundColor: item.color }]} />}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <CustomButton
                        title="Continue"
                        onPress={() => navigation.navigate('InterestSelection')}
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
    levelCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.borderRadius.xl,
        padding: Theme.spacing.lg,
        borderWidth: 1.5,
        borderColor: Theme.colors.border,
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Theme.spacing.md,
    },
    textContent: {
        flex: 1,
    },
    levelLabel: {
        fontSize: Theme.typography.fontSize.lg,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: 2,
    },
    levelDesc: {
        fontSize: Theme.typography.fontSize.sm,
        color: Theme.colors.textSecondary,
        lineHeight: 18,
    },
    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: Theme.colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: Theme.spacing.sm,
    },
    radioFill: {
        width: 12,
        height: 12,
        borderRadius: 6,
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

export default SkillAssessmentScreen;
