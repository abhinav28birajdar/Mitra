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

type LearningPreferencesScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'LearningPreferences'>;

interface Props {
    navigation: LearningPreferencesScreenNavigationProp;
}

interface LearningPreference {
    id: string;
    title: string;
    description: string;
    icon: string;
}

const LEARNING_STYLES: LearningPreference[] = [
    { id: 'visual', title: 'Visual Learner', description: 'Videos, diagrams, and images', icon: 'eye-outline' },
    { id: 'reading', title: 'Reading/Writing', description: 'Articles and taking notes', icon: 'book-outline' },
    { id: 'hands-on', title: 'Hands-On', description: 'By doing and practicing', icon: 'hammer-outline' },
    { id: 'auditory', title: 'Auditory Learner', description: 'Lectures and podcasts', icon: 'headset-outline' },
];

const LEARNING_PACE: LearningPreference[] = [
    { id: 'self-paced', title: 'Self-Paced', description: 'Learn at your own speed', icon: 'walk-outline' },
    { id: 'structured', title: 'Structured', description: 'Scheduled classes and deadlines', icon: 'calendar-outline' },
    { id: 'intensive', title: 'Intensive', description: 'Quick with focused sessions', icon: 'flash-outline' },
];

const LearningPreferencesScreen: React.FC<Props> = ({ navigation }) => {
    const { theme } = useTheme();
    const { updateUserProfile } = useAuth();

    const [learningStyle, setLearningStyle] = useState<string>('');
    const [learningPace, setLearningPace] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleContinue = async () => {
        if (!learningStyle || !learningPace) {
            Alert.alert('Selection Required', 'Please select both learning style and pace');
            return;
        }

        setLoading(true);
        try {
            await updateUserProfile({
                preferences: {
                    notifications: true,
                    emailUpdates: true,
                    theme: 'auto',
                    language: 'en',
                    learningStyle,
                    learningPace,
                },
            });
            navigation.navigate('Complete');
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const PreferenceItem = ({ item, isSelected, onSelect }: any) => (
        <TouchableOpacity
            style={[
                styles.preferenceCard,
                {
                    borderColor: isSelected ? theme.colors.primary[600] : theme.colors.border.light,
                    backgroundColor: theme.colors.background.paper,
                },
                isSelected && styles.selectedCard
            ]}
            onPress={() => onSelect(item.id)}
        >
            <View style={[styles.iconBox, { backgroundColor: isSelected ? theme.colors.primary[600] : theme.colors.background.light }]}>
                <Icon name={item.icon} size={22} color={isSelected ? '#FFFFFF' : theme.colors.text.secondary} />
            </View>
            <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>{item.title}</Text>
                <Text style={[styles.cardDesc, { color: theme.colors.text.secondary }]}>{item.description}</Text>
            </View>
            <View style={[styles.radio, { borderColor: isSelected ? theme.colors.primary[600] : theme.colors.border.light }]}>
                {isSelected && <View style={[styles.radioInner, { backgroundColor: theme.colors.primary[600] }]} />}
            </View>
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper showBackButton={true}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={[styles.progressBackground, { backgroundColor: theme.colors.background.light }]}>
                        <View style={[styles.progressBar, { backgroundColor: theme.colors.primary[600], width: '80%' }]} />
                    </View>
                    <Text style={[styles.stepText, { color: theme.colors.primary[600] }]}>
                        STEP 4 OF 5
                    </Text>
                    <Text style={[styles.title, { color: theme.colors.text.primary }]}>
                        How do you learn?
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
                        We'll adapt the content delivery to match your style and pace.
                    </Text>
                </View>

                <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Learning Style</Text>
                <View style={styles.list}>
                    {LEARNING_STYLES.map(style => (
                        <PreferenceItem
                            key={style.id}
                            item={style}
                            isSelected={learningStyle === style.id}
                            onSelect={setLearningStyle}
                        />
                    ))}
                </View>

                <Text style={[styles.sectionTitle, { color: theme.colors.text.primary, marginTop: 12 }]}>Learning Pace</Text>
                <View style={styles.list}>
                    {LEARNING_PACE.map(pace => (
                        <PreferenceItem
                            key={pace.id}
                            item={pace}
                            isSelected={learningPace === pace.id}
                            onSelect={setLearningPace}
                        />
                    ))}
                </View>
            </ScrollView>

            <View style={[styles.footer, { backgroundColor: theme.colors.background.paper, borderTopColor: theme.colors.border.light }]}>
                <View style={{ flex: 1 }}>
                    <CustomButton
                        title="Continue"
                        onPress={handleContinue}
                        isLoading={loading}
                        disabled={!learningStyle || !learningPace}
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    list: {
        gap: 12,
        marginBottom: 24,
    },
    preferenceCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1.5,
    },
    selectedCard: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    cardDesc: {
        fontSize: 13,
    },
    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    footer: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderTopWidth: 1,
    },
});

export default LearningPreferencesScreen;
