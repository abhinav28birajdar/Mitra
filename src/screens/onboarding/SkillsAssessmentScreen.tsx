import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '@app-types/navigation.types';
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@components/ScreenWrapper';
import CustomButton from '@components/CustomButton';

type SkillsAssessmentScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'SkillsAssessment'>;

interface Props {
    navigation: SkillsAssessmentScreenNavigationProp;
}

interface Skill {
    id: string;
    name: string;
    category: string;
}

const SKILLS: Skill[] = [
    { id: 'javascript', name: 'JavaScript', category: 'Programming' },
    { id: 'python', name: 'Python', category: 'Programming' },
    { id: 'react', name: 'React', category: 'Web Development' },
    { id: 'nodejs', name: 'Node.js', category: 'Backend' },
    { id: 'figma', name: 'Figma', category: 'Design' },
    { id: 'uiux', name: 'UI/UX Design', category: 'Design' },
    { id: 'marketing', name: 'Digital Marketing', category: 'Business' },
    { id: 'seo', name: 'SEO', category: 'Marketing' },
    { id: 'communication', name: 'Communication', category: 'Soft Skills' },
    { id: 'leadership', name: 'Leadership', category: 'Soft Skills' },
];

const SkillsAssessmentScreen: React.FC<Props> = ({ navigation }) => {
    const { theme } = useTheme();
    const { profile, updateUserProfile } = useAuth();

    const [selectedSkills, setSelectedSkills] = useState<string[]>(
        profile?.skills || []
    );
    const [loading, setLoading] = useState(false);

    const toggleSkill = (skillId: string) => {
        setSelectedSkills((prev) => {
            if (prev.includes(skillId)) {
                return prev.filter((id) => id !== skillId);
            } else {
                return [...prev, skillId];
            }
        });
    };

    const handleContinue = async () => {
        setLoading(true);
        try {
            await updateUserProfile({
                skills: selectedSkills,
            });
            navigation.navigate('LearningPreferences');
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSkip = () => {
        navigation.navigate('LearningPreferences');
    };

    const groupedSkills = SKILLS.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    return (
        <ScreenWrapper showBackButton={true}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={[styles.progressBackground, { backgroundColor: theme.colors.background.light }]}>
                        <View style={[styles.progressBar, { backgroundColor: theme.colors.primary[600], width: '60%' }]} />
                    </View>
                    <Text style={[styles.stepText, { color: theme.colors.primary[600] }]}>
                        STEP 3 OF 5
                    </Text>
                    <Text style={[styles.title, { color: theme.colors.text.primary }]}>
                        What are your skills?
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
                        Select your current skills so we can provide more advanced recommendations.
                    </Text>
                </View>

                {Object.entries(groupedSkills).map(([category, skills]) => (
                    <View key={category} style={styles.categorySection}>
                        <Text style={[styles.categoryTitle, { color: theme.colors.text.primary }]}>
                            {category}
                        </Text>
                        <View style={styles.skillsContainer}>
                            {skills.map((skill) => {
                                const isSelected = selectedSkills.includes(skill.id);
                                return (
                                    <TouchableOpacity
                                        key={skill.id}
                                        style={[
                                            styles.skillChip,
                                            {
                                                borderColor: isSelected
                                                    ? theme.colors.primary[600]
                                                    : theme.colors.border.light,
                                                backgroundColor: isSelected
                                                    ? theme.colors.primary[600]
                                                    : theme.colors.background.paper,
                                            },
                                        ]}
                                        onPress={() => toggleSkill(skill.id)}
                                    >
                                        <Text
                                            style={[
                                                styles.skillText,
                                                {
                                                    color: isSelected
                                                        ? '#FFFFFF'
                                                        : theme.colors.text.primary,
                                                },
                                            ]}
                                        >
                                            {skill.name}
                                        </Text>
                                        {isSelected && (
                                            <Icon name="checkmark" size={14} color="#FFFFFF" />
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={[styles.footer, { backgroundColor: theme.colors.background.paper, borderTopColor: theme.colors.border.light }]}>
                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={handleSkip}
                >
                    <Text style={[styles.skipText, { color: theme.colors.text.secondary }]}>
                        Skip
                    </Text>
                </TouchableOpacity>
                <View style={{ width: '60%' }}>
                    <CustomButton
                        title="Continue"
                        onPress={handleContinue}
                        isLoading={loading}
                        icon={<Icon name="arrow-forward" size={20} color="#FFFFFF" />}
                    />
                </View>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 120,
    },
    header: {
        marginBottom: 32,
    },
    progressBackground: {
        height: 6,
        borderRadius: 3,
        marginBottom: 20,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
    },
    stepText: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
        letterSpacing: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
    },
    categorySection: {
        marginBottom: 32,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 14,
        borderWidth: 1.5,
        gap: 8,
    },
    skillText: {
        fontSize: 14,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderTopWidth: 1,
    },
    skipButton: {
        paddingVertical: 12,
    },
    skipText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default SkillsAssessmentScreen;
