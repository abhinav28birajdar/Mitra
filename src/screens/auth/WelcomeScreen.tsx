import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '@app-types/navigation.types';
import { useTheme } from '@context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

type WelcomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Welcome'>;

interface Props {
    navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
    const { theme } = useTheme();

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[theme.colors.primary[600], theme.colors.primary[900]]}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <View style={styles.topSection}>
                        <View style={styles.logoBadge}>
                            <Icon name="school" size={40} color={theme.colors.primary[600]} />
                        </View>
                        <Text style={styles.brandName}>Mitra AI</Text>
                        <Text style={styles.tagline}>Shape Your Future with AI-Powered Learning</Text>
                    </View>

                    <View style={styles.middleSection}>
                        <View style={styles.featureGrid}>
                            <WelcomeFeature
                                icon="rocket-outline"
                                title="Accelerate Growth"
                                desc="Hyper-personalized career paths"
                            />
                            <WelcomeFeature
                                icon="sparkles-outline"
                                title="AI Mentorship"
                                desc="24/7 guidance for your goals"
                            />
                            <WelcomeFeature
                                icon="people-outline"
                                title="Expert Network"
                                desc="Connect with industry leaders"
                            />
                        </View>
                    </View>

                    <View style={styles.bottomSection}>
                        <TouchableOpacity
                            style={[styles.primaryButton, { shadowColor: theme.colors.primary[900] }]}
                            onPress={() => navigation.navigate('Register')}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.primaryButtonText, { color: theme.colors.primary[600] }]}>Get Started</Text>
                            <Icon name="arrow-forward" size={20} color={theme.colors.primary[600]} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() => navigation.navigate('Login')}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.secondaryButtonText}>Already have an account? </Text>
                            <Text style={[styles.secondaryButtonLink, { color: '#FFFFFF' }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

const WelcomeFeature = ({ icon, title, desc }: any) => (
    <View style={styles.featureRow}>
        <View style={styles.featureIconBox}>
            <Icon name={icon} size={24} color="#FFFFFF" />
        </View>
        <View>
            <Text style={styles.featureTitle}>{title}</Text>
            <Text style={styles.featureDesc}>{desc}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'space-between',
        paddingVertical: height * 0.08,
    },
    topSection: {
        alignItems: 'center',
    },
    logoBadge: {
        width: 80,
        height: 80,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        transform: [{ rotate: '10deg' }],
    },
    brandName: {
        fontSize: 38,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -1,
    },
    tagline: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 24,
    },
    middleSection: {
        marginVertical: 40,
    },
    featureGrid: {
        gap: 24,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    featureIconBox: {
        width: 50,
        height: 50,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    featureDesc: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        marginTop: 2,
    },
    bottomSection: {
        gap: 20,
    },
    primaryButton: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        height: 64,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    primaryButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    secondaryButtonText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 15,
    },
    secondaryButtonLink: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;
