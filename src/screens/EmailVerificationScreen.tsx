import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomButton from '../components/CustomButton';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const EmailVerificationScreen = ({ navigation }: any) => {
    const { logout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        let timer: any;
        if (countdown > 0) {
            timer = setInterval(() => setCountdown(c => c - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    const handleResend = async () => {
        if (countdown > 0) return;
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setCountdown(60);
    };

    return (
        <ScreenWrapper useGradient>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="shield-checkmark-outline" size={60} color={Theme.colors.primary} />
                    </View>

                    <Text style={styles.title}>Verify your email</Text>
                    <Text style={styles.subtitle}>
                        We've sent a verification link to your email address. Please click the link to verify your account.
                    </Text>

                    <View style={styles.infoBox}>
                        <Ionicons name="information-circle-outline" size={20} color={Theme.colors.info} />
                        <Text style={styles.infoText}>
                            Check your spam folder if you don't see the email within a few minutes.
                        </Text>
                    </View>

                    <CustomButton
                        title="I've Verified My Email"
                        onPress={() => navigation.navigate('Main')} // In real app, check status
                        style={styles.button}
                    />

                    <TouchableOpacity
                        style={[styles.resendButton, countdown > 0 && { opacity: 0.5 }]}
                        onPress={handleResend}
                        disabled={countdown > 0 || isLoading}
                    >
                        <Text style={styles.resendText}>
                            {countdown > 0
                                ? `Resend email in ${countdown}s`
                                : "Didn't receive the email? Resend"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={logout}
                    >
                        <Text style={styles.logoutText}>Sign out and use a different email</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        padding: Theme.spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Theme.spacing.xl,
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    title: {
        fontSize: Theme.typography.fontSize['3xl'],
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: Theme.spacing.sm,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: Theme.typography.fontSize.base,
        color: Theme.colors.textSecondary,
        lineHeight: 22,
        textAlign: 'center',
        marginBottom: Theme.spacing.xl,
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#E0F2FE', // Light blue
        padding: Theme.spacing.md,
        borderRadius: Theme.borderRadius.md,
        alignItems: 'center',
        marginBottom: Theme.spacing.xl,
    },
    infoText: {
        fontSize: Theme.typography.fontSize.sm,
        color: Theme.colors.info,
        marginLeft: Theme.spacing.sm,
        flex: 1,
    },
    button: {
        width: '100%',
    },
    resendButton: {
        marginTop: Theme.spacing.lg,
    },
    resendText: {
        fontSize: Theme.typography.fontSize.sm,
        color: Theme.colors.primary,
        fontWeight: Theme.typography.fontWeight.semibold as any,
    },
    logoutButton: {
        marginTop: Theme.spacing.xl,
    },
    logoutText: {
        fontSize: Theme.typography.fontSize.sm,
        color: Theme.colors.textSecondary,
        textDecorationLine: 'underline',
    },
});

export default EmailVerificationScreen;
