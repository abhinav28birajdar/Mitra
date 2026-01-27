import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const ResetPasswordScreen = ({ navigation }: any) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleReset = async () => {
        if (!password || !confirmPassword) return;
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        setIsLoading(true);
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);

        Alert.alert(
            "Success",
            "Your password has been reset successfully.",
            [{ text: "Sign In", onPress: () => navigation.navigate('SignIn') }]
        );
    };

    return (
        <ScreenWrapper useGradient>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Reset Password</Text>
                    <Text style={styles.subtitle}>
                        Create a new password that is at least 8 characters long.
                    </Text>
                </View>

                <View style={styles.form}>
                    <CustomInput
                        label="New Password"
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        iconName="lock-closed-outline"
                        password
                    />

                    <CustomInput
                        label="Confirm New Password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        iconName="lock-closed-outline"
                        password
                    />

                    <View style={styles.requirements}>
                        <Text style={styles.requirementTitle}>Password Requirements:</Text>
                        <View style={styles.requirementItem}>
                            <Ionicons name="checkmark-circle" size={16} color={password.length >= 8 ? Theme.colors.success : Theme.colors.gray} />
                            <Text style={[styles.requirementText, password.length >= 8 && { color: Theme.colors.success }]}>Minimum 8 characters</Text>
                        </View>
                        <View style={styles.requirementItem}>
                            <Ionicons name="checkmark-circle" size={16} color={/[A-Z]/.test(password) ? Theme.colors.success : Theme.colors.gray} />
                            <Text style={[styles.requirementText, /[A-Z]/.test(password) && { color: Theme.colors.success }]}>One uppercase letter</Text>
                        </View>
                    </View>

                    <CustomButton
                        title="Reset Password"
                        onPress={handleReset}
                        isLoading={isLoading}
                        style={styles.button}
                    />
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        padding: Theme.spacing.lg,
    },
    header: {
        marginTop: Theme.spacing.xl,
        marginBottom: Theme.spacing.xl,
    },
    title: {
        fontSize: Theme.typography.fontSize['3xl'],
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
        marginTop: Theme.spacing.md,
    },
    button: {
        marginTop: Theme.spacing.xl,
    },
    requirements: {
        marginTop: Theme.spacing.sm,
        padding: Theme.spacing.md,
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.borderRadius.md,
    },
    requirementTitle: {
        fontSize: Theme.typography.fontSize.sm,
        fontWeight: Theme.typography.fontWeight.semibold as any,
        color: Theme.colors.text,
        marginBottom: Theme.spacing.xs,
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    requirementText: {
        fontSize: Theme.typography.fontSize.xs,
        color: Theme.colors.textSecondary,
        marginLeft: Theme.spacing.xs,
    },
});

export default ResetPasswordScreen;
