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

type CareerInterestsScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'CareerInterests'>;

interface Props {
    navigation: CareerInterestsScreenNavigationProp;
}

interface CareerCategory {
    id: string;
    name: string;
    icon: string;
}

const CAREER_CATEGORIES: CareerCategory[] = [
    { id: 'technology', name: 'Technology', icon: 'laptop-outline' },
    { id: 'business', name: 'Business', icon: 'briefcase-outline' },
    { id: 'design', name: 'Design', icon: 'color-palette-outline' },
    { id: 'healthcare', name: 'Healthcare', icon: 'medical-outline' },
    { id: 'education', name: 'Education', icon: 'school-outline' },
    { id: 'creative', name: 'Creative Arts', icon: 'brush-outline' },
    { id: 'engineering', name: 'Engineering', icon: 'construct-outline' },
    { id: 'science', name: 'Science', icon: 'flask-outline' },
];

const CareerInterestsScreen: React.FC<Props> = ({ navigation }) => {
    const { theme } = useTheme();
    const { profile, updateUserProfile } = useAuth();

    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        profile?.careerInterests || []
    );
    const [loading, setLoading] = useState(false);

    const toggleCategory = (categoryId: string) => {
        setSelectedCategories((prev) => {
            if (prev.includes(categoryId)) {
                return prev.filter((id) => id !== categoryId);
            } else {
                return [...prev, categoryId];
            }
        });
    };

    const handleContinue = async () => {
        if (selectedCategories.length === 0) {
            Alert.alert('Selection Required', 'Please select at least one career interest');
            return;
        }

        setLoading(true);
        try {
            await updateUserProfile({
                careerInterests: selectedCategories,
            });
            navigation.navigate('SkillsAssessment');
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper showBackButton={true}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={[styles.progressBackground, { backgroundColor: theme.colors.background.light }]}>
                        <View style={[styles.progressBar, { backgroundColor: theme.colors.primary[600], width: '40%' }]} />
                    </View>
                    <Text style={[styles.stepText, { color: theme.colors.primary[600] }]}>
                        STEP 2 OF 5
                    </Text>
                    <Text style={[styles.title, { color: theme.colors.text.primary }]}>
                        What are you interested in?
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
                        Select the fields you'd like to explore. We'll find the best paths for you.
                    </Text>
                </View>

                <View style={styles.categoriesGrid}>
                    {CAREER_CATEGORIES.map((category) => {
                        const isSelected = selectedCategories.includes(category.id);
                        return (
                            <TouchableOpacity
                                key={category.id}
                                style={[
                                    styles.categoryCard,
                                    {
                                        borderColor: isSelected
                                            ? theme.colors.primary[600]
                                            : theme.colors.border.light,
                                        backgroundColor: theme.colors.background.paper,
                                    },
                                    isSelected && styles.selectedCard
                                ]}
                                onPress={() => toggleCategory(category.id)}
                            >
                                <View style={[
                                    styles.iconCircle,
                                    { backgroundColor: isSelected ? theme.colors.primary[600] : theme.colors.background.light }
                                ]}>
                                    <Icon
                                        name={category.icon}
                                        size={28}
                                        color={isSelected ? '#FFFFFF' : theme.colors.text.secondary}
                                    />
                                </View>
                                <Text
                                    style={[
                                        styles.categoryName,
                                        {
                                            color: isSelected
                                                ? theme.colors.primary[600]
                                                : theme.colors.text.primary,
                                        },
                                    ]}
                                >
                                    {category.name}
                                </Text>
                                {isSelected && (
                                    <View style={[styles.checkBadge, { backgroundColor: theme.colors.primary[600] }]}>
                                        <Icon name="checkmark" size={12} color="#FFFFFF" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            <View style={[styles.footer, { backgroundColor: theme.colors.background.paper, borderTopColor: theme.colors.border.light }]}>
                <View style={{ flex: 1 }}>
                    <CustomButton
                        title="Continue"
                        onPress={handleContinue}
                        isLoading={loading}
                        disabled={selectedCategories.length === 0}
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
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },
    categoryCard: {
        width: '47%',
        height: 140,
        borderWidth: 2,
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    selectedCard: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryName: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    checkBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderTopWidth: 1,
    },
});

export default CareerInterestsScreen;
