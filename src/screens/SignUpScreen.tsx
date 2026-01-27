import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { Theme } from '../theme';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const SignUpScreen = () => {
    const navigation = useNavigation<any>();
    const { register, isLoading } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleSignUp = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (!agreeTerms) {
            Alert.alert('Error', 'Please agree to the Terms & Conditions');
            return;
        }

        const success = await register({ name, email });
        if (success) {
            navigation.navigate('EmailVerification');
        } else {
            Alert.alert('Error', 'Registration failed');
        }
    };

    return (
        <ScreenWrapper useGradient>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={Theme.colors.text} />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.title}>Join Mitra</Text>
                    <Text style={styles.subtitle}>Unlock a world of AI-driven career opportunities.</Text>
                </View>

                <View style={styles.form}>
                    <CustomInput
                        label="Full Name"
                        placeholder="John Doe"
                        value={name}
                        onChangeText={setName}
                        iconName="person-outline"
                    />

                    <CustomInput
                        label="Email Address"
                        placeholder="example@gmail.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        iconName="mail-outline"
                    />

                    <CustomInput
                        label="Password"
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        password
                        iconName="lock-closed-outline"
                    />

                    <CustomInput
                        label="Confirm Password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        password
                        iconName="lock-closed-outline"
                    />

                    <TouchableOpacity
                        style={styles.termsRow}
                        onPress={() => setAgreeTerms(!agreeTerms)}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.checkbox, agreeTerms && styles.checkboxActive]}>
                            {agreeTerms && <Ionicons name="checkmark" size={14} color={Theme.colors.white} />}
                        </View>
                        <Text style={styles.termsText}>
                            I agree to the <Text style={styles.linkText}>Terms & Conditions</Text>
                        </Text>
                    </TouchableOpacity>

                    <CustomButton
                        title="Create Account"
                        onPress={handleSignUp}
                        isLoading={isLoading}
                        style={styles.signUpButton}
                    />

                    <View style={styles.socialAuthSection}>
                        <View style={styles.divider}>
                            <View style={styles.line} />
                            <Text style={styles.dividerText}>OR SIGN UP WITH</Text>
                            <View style={styles.line} />
                        </View>

                        <View style={styles.socialButtons}>
                            <TouchableOpacity style={styles.socialIcon}>
                                <Ionicons name="logo-google" size={24} color="#DB4437" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialIcon}>
                                <Ionicons name="logo-apple" size={24} color={Theme.colors.text} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.signInLink}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        padding: Theme.spacing.xl,
        flexGrow: 1,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: Theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Theme.spacing.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    header: {
        marginBottom: Theme.spacing.xl,
    },
    title: {
        fontSize: 32,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: Theme.spacing.sm,
    },
    subtitle: {
        fontSize: Theme.typography.fontSize.base,
        color: Theme.colors.textSecondary,
        lineHeight: 22,
    },
    form: {
        marginBottom: Theme.spacing.xl,
    },
    termsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Theme.spacing.xl,
        marginTop: Theme.spacing.xs,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: Theme.colors.border,
        marginRight: Theme.spacing.sm,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
    },
    checkboxActive: {
        backgroundColor: Theme.colors.primary,
        borderColor: Theme.colors.primary,
    },
    termsText: {
        fontSize: Theme.typography.fontSize.xs,
        color: Theme.colors.textSecondary,
    },
    linkText: {
        color: Theme.colors.primary,
        fontWeight: Theme.typography.fontWeight.bold as any,
    },
    signUpButton: {
        height: 56,
        borderRadius: 16,
        marginBottom: Theme.spacing.xl,
    },
    socialAuthSection: {
        alignItems: 'center',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Theme.spacing.xl,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: Theme.colors.border,
    },
    dividerText: {
        marginHorizontal: Theme.spacing.md,
        color: Theme.colors.gray,
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    socialButtons: {
        flexDirection: 'row',
        gap: Theme.spacing.lg,
    },
    socialIcon: {
        width: 60,
        height: 60,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        paddingVertical: Theme.spacing.lg,
    },
    footerText: {
        color: Theme.colors.textSecondary,
        fontSize: Theme.typography.fontSize.sm,
    },
    signInLink: {
        color: Theme.colors.primary,
        fontWeight: Theme.typography.fontWeight.bold as any,
        fontSize: Theme.typography.fontSize.sm,
    },
});

export default SignUpScreen;
