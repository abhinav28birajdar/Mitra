import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '@app-types/navigation.types';
import { useTheme } from '@context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '@context/AuthContext';

const { width } = Dimensions.get('window');

type OnboardingCompleteScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Complete'>;

interface Props {
    navigation: OnboardingCompleteScreenNavigationProp;
}

const OnboardingCompleteScreen: React.FC<Props> = ({ navigation }) => {
    const { theme } = useTheme();
    const { updateUserProfile } = useAuth();

    const handleGetStarted = async () => {
        try {
            // Mark onboarding as complete in profile
            await updateUserProfile({
                onboardingCompleted: true,
            });
            // The RootNavigator will automatically switch to MainNavigator
            // because of the profile change listener in App.tsx or similar logic
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <LinearGradient
            colors={[theme.colors.primary[600], theme.colors.primary[800]]}
            style={styles.container}
        >
            <View style={styles.content}>
                <View style={styles.successIconContainer}>
                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)']}
                        style={styles.successCircle}
                    >
                        <Icon name="checkmark" size={60} color="#FFFFFF" />
                    </LinearGradient>
                </View>

                <Text style={styles.title}>You're all set!</Text>
                <Text style={styles.subtitle}>
                    Your personalized learning journey is ready. Let's start building your future.
                </Text>

                <View style={styles.featureList}>
                    <FeatureRow
                        icon="rocket-outline"
                        title="Personalized Path"
                        desc="Courses matched to your unique interests"
                    />
                    <FeatureRow
                        icon="stats-chart-outline"
                        title="Skill Tracking"
                        desc="Monitor your growth and earn certificates"
                    />
                    <FeatureRow
                        icon="chatbubbles-outline"
                        title="AI Advisor"
                        desc="24/7 support for your learning queries"
                    />
                </View>

                <TouchableOpacity
                    style={styles.getStartedButton}
                    onPress={handleGetStarted}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.buttonText, { color: theme.colors.primary[600] }]}>Get Started</Text>
                    <Icon name="arrow-forward" size={20} color={theme.colors.primary[600]} />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const FeatureRow = ({ icon, title, desc }: any) => (
    <View style={styles.featureRow}>
        <View style={styles.featureIconBox}>
            <Icon name={icon} size={24} color="#FFFFFF" />
        </View>
        <View style={styles.featureTextBox}>
            <Text style={styles.featureTitle}>{title}</Text>
            <Text style={styles.featureDesc}>{desc}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    successIconContainer: {
        marginBottom: 40,
    },
    successCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        marginBottom: 48,
        lineHeight: 26,
    },
    featureList: {
        width: '100%',
        marginBottom: 60,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    featureIconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    featureTextBox: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 2,
    },
    featureDesc: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    getStartedButton: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: 60,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OnboardingCompleteScreen;
