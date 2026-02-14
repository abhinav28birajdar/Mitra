
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { changePassword } from '@services/auth/authService';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@components/ScreenWrapper';

const ChangePasswordScreen: React.FC = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await changePassword(currentPassword, newPassword);
            Alert.alert('Success', 'Password changed successfully!');
            navigation.goBack();
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper title="Change Password" showBackButton={true}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.header}>
                        <Icon name="lock-closed" size={48} color={theme.colors.primary[600]} />
                        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
                            Update your password to keep your account secure
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Current Password</Text>
                            <TextInput
                                style={[styles.input, { color: theme.colors.text.primary, borderColor: theme.colors.border.light, backgroundColor: theme.colors.background.paper }]}
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                secureTextEntry={!showPasswords}
                                placeholder="Enter current password"
                                placeholderTextColor={theme.colors.text.disabled}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>New Password</Text>
                            <TextInput
                                style={[styles.input, { color: theme.colors.text.primary, borderColor: theme.colors.border.light, backgroundColor: theme.colors.background.paper }]}
                                value={newPassword}
                                onChangeText={setNewPassword}
                                secureTextEntry={!showPasswords}
                                placeholder="Minimum 8 characters"
                                placeholderTextColor={theme.colors.text.disabled}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Confirm New Password</Text>
                            <TextInput
                                style={[styles.input, { color: theme.colors.text.primary, borderColor: theme.colors.border.light, backgroundColor: theme.colors.background.paper }]}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showPasswords}
                                placeholder="Repeat new password"
                                placeholderTextColor={theme.colors.text.disabled}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.toggleShow}
                            onPress={() => setShowPasswords(!showPasswords)}
                        >
                            <Text style={{ color: theme.colors.primary[600], fontWeight: '600' }}>
                                {showPasswords ? 'Hide Passwords' : 'Show Passwords'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: theme.colors.primary[600] }]}
                        onPress={handleChangePassword}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>Update Password</Text>
                        )}
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    subtitle: {
        textAlign: 'center',
        marginTop: 16,
        fontSize: 14,
        lineHeight: 20,
    },
    form: {
        marginBottom: 32,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        height: 54,
        borderRadius: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        fontSize: 16,
    },
    toggleShow: {
        alignSelf: 'flex-end',
        marginTop: -10,
    },
    button: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default ChangePasswordScreen;
