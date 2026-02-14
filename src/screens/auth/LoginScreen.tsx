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

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
    navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const { theme } = useTheme();
    const { signIn, signInWithGoogle } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);

    const emailError = useMemo(() => {
        if (!emailTouched || !email) return undefined;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return undefined;
    }, [email, emailTouched]);

    const isFormValid = useMemo(() => {
        return email.trim() !== '' && password.trim() !== '' && !emailError;
    }, [email, password, emailError]);

    const handleLogin = async () => {
        if (!isFormValid) {
            Alert.alert('Error', 'Please fill in all fields correctly');
            return;
        }

        setLoading(true);
        try {
            await signIn(email.trim(), password);
        } catch (error: any) {
            Alert.alert('Login Failed', error.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            await signInWithGoogle();
        } catch (error: any) {
            Alert.alert('Google Sign-In Failed', error.message || 'Google Sign-In is not configured');
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
                        Welcome Back
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
                        Sign in to continue learning
                    </Text>
                </View>

                <View style={styles.form}>
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
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        password
                        autoCapitalize="none"
                        required
                        editable={!loading}
                    />

                    <TouchableOpacity
                        style={styles.forgotPassword}
                        onPress={() => navigation.navigate('ForgotPassword')}
                        accessibilityLabel="Forgot password"
                        accessibilityRole="button"
                    >
                        <Text style={[styles.forgotPasswordText, { color: theme.colors.primary[600] }]}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    <CustomButton
                        title="Sign In"
                        onPress={handleLogin}
                        isLoading={loading}
                        disabled={!isFormValid || loading}
                        variant="primary"
                    />

                    <View style={styles.divider}>
                        <View style={[styles.dividerLine, { backgroundColor: theme.colors.border.light }]} />
                        <Text style={[styles.dividerText, { color: theme.colors.text.secondary }]}>
                            OR
                        </Text>
                        <View style={[styles.dividerLine, { backgroundColor: theme.colors.border.light }]} />
                    </View>

                    <CustomButton
                        title="Continue with Google"
                        onPress={handleGoogleSignIn}
                        variant="outline"
                        icon={<Icon name="logo-google" size={20} color="#DB4437" />}
                        disabled={loading}
                    />

                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: theme.colors.text.secondary }]}>
                            Don't have an account?{' '}
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Register')}
                            accessibilityLabel="Sign up"
                            accessibilityRole="button"
                        >
                            <Text style={[styles.signUpText, { color: theme.colors.primary[600] }]}>
                                Sign Up
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
        marginBottom: 40,
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
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
        marginTop: -8,
    },
    forgotPasswordText: {
        fontSize: 14,
        fontWeight: '600',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    dividerLine: {
        flex: 1,
        height: 1,
    },
    dividerText: {
        marginHorizontal: 16,
        fontSize: 14,
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
    signUpText: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default LoginScreen;

