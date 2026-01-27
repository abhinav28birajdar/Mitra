import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomButton from '../components/CustomButton';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const WelcomeScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <ScreenWrapper useGradient>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.logoCircle}>
                        <View style={styles.logoInner}>
                            <Text style={styles.logoLetter}>M</Text>
                        </View>
                        {/* Decorative elements */}
                        <View style={[styles.dot, { top: -10, right: 20, backgroundColor: Theme.colors.primary }]} />
                        <View style={[styles.dot, { bottom: 20, left: -10, backgroundColor: Theme.colors.secondary }]} />
                        <View style={[styles.dot, { bottom: -15, right: 40, backgroundColor: Theme.colors.accent }]} />
                    </View>

                    <Text style={styles.title}>Welcome to Mitra</Text>
                    <Text style={styles.tagline}>Unlock your potential with Gemini AI</Text>
                    <Text style={styles.description}>
                        Start your journey towards your dream career with personalized learning paths and expert AI guidance.
                    </Text>
                </View>

                <View style={styles.footer}>
                    <CustomButton
                        title="Sign In"
                        onPress={() => navigation.navigate('SignIn')}
                        style={styles.signInButton}
                    />
                    <CustomButton
                        title="Create Account"
                        variant="outline"
                        onPress={() => navigation.navigate('SignUp')}
                        style={styles.signUpButton}
                    />

                    <View style={styles.socialAuthPreview}>
                        <Text style={styles.socialText}>Or continue with</Text>
                        <View style={styles.socialIcons}>
                            <TouchableOpacity style={styles.socialIcon}>
                                <Ionicons name="logo-google" size={24} color="#DB4437" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialIcon}>
                                <Ionicons name="logo-apple" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={styles.termsText}>
                        By continuing, you agree to our{' '}
                        <Text style={styles.link}>Terms</Text> and{' '}
                        <Text style={styles.link}>Privacy Policy</Text>.
                    </Text>
                </View>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Theme.spacing.xl,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoCircle: {
        width: 140,
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Theme.spacing.xl,
        position: 'relative',
    },
    logoInner: {
        width: 100,
        height: 100,
        borderRadius: 25,
        backgroundColor: Theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },
    logoLetter: {
        fontSize: 60,
        color: Theme.colors.white,
        fontWeight: Theme.typography.fontWeight.bold as any,
    },
    dot: {
        position: 'absolute',
        width: 15,
        height: 15,
        borderRadius: 7.5,
    },
    title: {
        fontSize: 36,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        textAlign: 'center',
    },
    tagline: {
        fontSize: 18,
        color: Theme.colors.primary,
        fontWeight: Theme.typography.fontWeight.semibold as any,
        textAlign: 'center',
        marginTop: 4,
    },
    description: {
        fontSize: Theme.typography.fontSize.base,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
        marginTop: Theme.spacing.md,
        paddingHorizontal: Theme.spacing.md,
    },
    footer: {
        width: '100%',
        paddingBottom: 20,
    },
    signInButton: {
        marginBottom: Theme.spacing.md,
    },
    signUpButton: {
        marginBottom: Theme.spacing.xl,
    },
    socialAuthPreview: {
        alignItems: 'center',
        marginBottom: Theme.spacing.xl,
    },
    socialText: {
        fontSize: Theme.typography.fontSize.xs,
        color: Theme.colors.textSecondary,
        marginBottom: Theme.spacing.sm,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    socialIcons: {
        flexDirection: 'row',
        gap: Theme.spacing.lg,
    },
    socialIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    termsText: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
    },
    link: {
        color: Theme.colors.primary,
        fontWeight: '600',
    },
});

export default WelcomeScreen;
