import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '@app-types/navigation.types';
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

interface Props {
    navigation: ForgotPasswordScreenNavigationProp;
}

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
    const { theme } = useTheme();
    const { resetPassword } = useAuth();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleResetPassword = async () => {
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            await resetPassword(email);
            setEmailSent(true);
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    if (emailSent) {
        return (
            <View style={styles.container}>
                <View style={styles.successContainer}>
                    <View style={[styles.iconContainer, { backgroundColor: theme.colors.success.light }]}>
                        <Icon name="mail-outline" size={48} color="#FFFFFF" />
                    </View>
                    <Text style={[styles.successTitle, { color: theme.colors.text.primary }]}>
                        Check Your Email
                    </Text>
                    <Text style={[styles.successMessage, { color: theme.colors.text.secondary }]}>
                        We've sent password reset instructions to{'\n'}
                        <Text style={{ fontWeight: '600' }}>{email}</Text>
                    </Text>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: theme.colors.primary[600] }]}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.buttonText}>Back to Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.resendButton}
                        onPress={() => setEmailSent(false)}
                    >
                        <Text style={[styles.resendText, { color: theme.colors.primary[600] }]}>
                            Try another email
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: theme.colors.text.primary }]}>
                        Forgot Password?
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
                        Don't worry! Enter your email and we'll send you instructions to reset your password.
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, { color: theme.colors.text.primary }]}>
                            Email Address
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: theme.colors.background.paper,
                                    borderColor: theme.colors.border.light,
                                    color: theme.colors.text.primary,
                                },
                            ]}
                            placeholder="Enter your email"
                            placeholderTextColor={theme.colors.text.disabled}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoFocus
                        />
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: theme.colors.primary[600] },
                            loading && styles.disabledButton,
                        ]}
                        onPress={handleResetPassword}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>Send Reset Link</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.backToLoginButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Icon name="arrow-back" size={16} color={theme.colors.primary[600]} />
                        <Text style={[styles.backToLoginText, { color: theme.colors.primary[600] }]}>
                            Back to Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
    },
    form: {
        flex: 1,
    },
    inputContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    button: {
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    disabledButton: {
        opacity: 0.6,
    },
    backToLoginButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    backToLoginText: {
        fontSize: 14,
        fontWeight: '600',
    },
    successContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    successTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    successMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 24,
    },
    resendButton: {
        marginTop: 16,
    },
    resendText: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default ForgotPasswordScreen;
