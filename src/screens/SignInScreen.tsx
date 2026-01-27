import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { Theme } from '../theme';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const SignInScreen = () => {
    const navigation = useNavigation<any>();
    const { login, isLoading } = useAuth();
    const [email, setEmail] = useState('abhinavbirajdar28@gmail.com');
    const [password, setPassword] = useState('12345678');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const success = await login(email, password);
        if (!success) {
            Alert.alert('Error', 'Invalid credentials or connection error');
        }
    };

    return (
        <ScreenWrapper useGradient>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={Theme.colors.text} />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Let's continue your AI-powered learning journey.</Text>
                </View>

                <View style={styles.form}>
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

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.rememberMe}
                            onPress={() => setRememberMe(!rememberMe)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                                {rememberMe && <Ionicons name="checkmark" size={14} color={Theme.colors.white} />}
                            </View>
                            <Text style={styles.rememberMeText}>Remember me</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                    <CustomButton
                        title="Sign In"
                        onPress={handleLogin}
                        isLoading={isLoading}
                        style={styles.signInButton}
                    />

                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OR LOGIN WITH</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.socialButtons}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-google" size={24} color="#DB4437" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-apple" size={24} color={Theme.colors.text} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>New to Mitra? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signUpLink}>Create Account</Text>
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
        marginBottom: Theme.spacing.xl,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    header: {
        marginBottom: Theme.spacing['2xl'],
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Theme.spacing.xl,
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
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
    rememberMeText: {
        fontSize: Theme.typography.fontSize.sm,
        color: Theme.colors.textSecondary,
    },
    forgotPasswordText: {
        color: Theme.colors.primary,
        fontSize: Theme.typography.fontSize.sm,
        fontWeight: Theme.typography.fontWeight.semibold as any,
    },
    signInButton: {
        height: 56,
        borderRadius: 16,
        marginBottom: Theme.spacing.xl,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Theme.spacing.xl,
    },
    dividerLine: {
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
        justifyContent: 'center',
        gap: Theme.spacing.lg,
    },
    socialButton: {
        width: '45%',
        height: 56,
        borderRadius: 16,
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
    signUpLink: {
        color: Theme.colors.primary,
        fontWeight: Theme.typography.fontWeight.bold as any,
        fontSize: Theme.typography.fontSize.sm,
    },
});

export default SignInScreen;
