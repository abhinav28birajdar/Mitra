import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '@app-types/navigation.types';
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomInput from '@components/CustomInput';
import CustomButton from '@components/CustomButton';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface Props {
    navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const { theme } = useTheme();
    const { signUp } = useAuth();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

    const emailError = useMemo(() => {
        if (!emailTouched || !email) return undefined;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return undefined;
    }, [email, emailTouched]);

    const passwordError = useMemo(() => {
        if (!passwordTouched || !password) return undefined;
        if (password.length < 8) {
            return 'Password must be at least 8 characters';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Password must contain an uppercase letter';
        }
        if (!/[a-z]/.test(password)) {
            return 'Password must contain a lowercase letter';
        }
        if (!/[0-9]/.test(password)) {
            return 'Password must contain a number';
        }
        return undefined;
    }, [password, passwordTouched]);

    const confirmPasswordError = useMemo(() => {
        if (!confirmPasswordTouched || !confirmPassword) return undefined;
        if (password !== confirmPassword) {
            return 'Passwords do not match';
        }
        return undefined;
    }, [password, confirmPassword, confirmPasswordTouched]);

    const isFormValid = useMemo(() => {
        return (
            fullName.trim() !== '' &&
            email.trim() !== '' &&
            password.trim() !== '' &&
            confirmPassword.trim() !== '' &&
            !emailError &&
            !passwordError &&
            !confirmPasswordError &&
            agreedToTerms
        );
    }, [fullName, email, password, confirmPassword, emailError, passwordError, confirmPasswordError, agreedToTerms]);

    const handleRegister = async () => {
        if (!isFormValid) {
            Alert.alert('Error', 'Please fill in all fields correctly and agree to the terms');
            return;
        }

        setLoading(true);
        try {
            await signUp(email.trim(), password, fullName.trim());
        } catch (error: any) {
            Alert.alert('Registration Failed', error.message || 'An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: theme.colors.background.default }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                        accessibilityLabel="Go back"
                        accessibilityRole="button"
                    >
                        <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: theme.colors.text.primary }]}>
                        Create Account
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
                        Start your learning journey today
                    </Text>
                </View>

                <View style={styles.form}>
                    <CustomInput
                        label="Full Name"
                        iconName="person-outline"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChangeText={setFullName}
                        autoCapitalize="words"
                        required
                        editable={!loading}
                    />

                    <CustomInput
                        label="Email"
                        iconName="mail-outline"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        onBlur={() => setEmailTouched(true)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        error={emailError}
                        required
                        editable={!loading}
                    />

                    <CustomInput
                        label="Password"
                        iconName="lock-closed-outline"
                        placeholder="Create a password"
                        value={password}
                        onChangeText={setPassword}
                        onBlur={() => setPasswordTouched(true)}
                        password
                        autoCapitalize="none"
                        error={passwordError}
                        helperText="Must be 8+ characters with uppercase, lowercase, and number"
                        required
                        editable={!loading}
                    />

                    <CustomInput
                        label="Confirm Password"
                        iconName="lock-closed-outline"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        onBlur={() => setConfirmPasswordTouched(true)}
                        password
                        autoCapitalize="none"
                        error={confirmPasswordError}
                        success={confirmPassword.length > 0 && !confirmPasswordError}
                        successMessage={confirmPassword.length > 0 && !confirmPasswordError ? "Passwords match" : undefined}
                        required
                        editable={!loading}
                    />

                    <TouchableOpacity
                        style={styles.termsContainer}
                        onPress={() => setAgreedToTerms(!agreedToTerms)}
                        accessibilityLabel="Agree to terms and conditions"
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked: agreedToTerms }}
                    >
                        <View
                            style={[
                                styles.checkbox,
                                {
                                    borderColor: theme.colors.border.main,
                                    backgroundColor: agreedToTerms
                                        ? theme.colors.primary[600]
                                        : 'transparent',
                                },
                            ]}
                        >
                            {agreedToTerms && (
                                <Icon name="checkmark" size={16} color="#FFFFFF" />
                            )}
                        </View>
                        <Text style={[styles.termsText, { color: theme.colors.text.secondary }]}>
                            I agree to the{' '}
                            <Text style={{ color: theme.colors.primary[600] }}>
                                Terms and Conditions
                            </Text>
                        </Text>
                    </TouchableOpacity>

                    <CustomButton
                        title="Create Account"
                        onPress={handleRegister}
                        isLoading={loading}
                        disabled={!isFormValid || loading}
                        variant="primary"
                    />

                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: theme.colors.text.secondary }]}>
                            Already have an account?{' '}
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                            accessibilityLabel="Sign in"
                            accessibilityRole="button"
                        >
                            <Text style={[styles.signInText, { color: theme.colors.primary[600] }]}>
                                Sign In
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 32,
    },
    backButton: {
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
    },
    form: {
        flex: 1,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        marginTop: -8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 4,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    termsText: {
        fontSize: 14,
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    footerText: {
        fontSize: 14,
    },
    signInText: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default RegisterScreen;

