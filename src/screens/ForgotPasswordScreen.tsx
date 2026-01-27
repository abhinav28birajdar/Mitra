import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const ForgotPasswordScreen = () => {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleReset = () => {
        if (!email) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('OTP', { email });
        }, 1500);
    };

    return (
        <ScreenWrapper useGradient>
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={Theme.colors.text} />
                </TouchableOpacity>

                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="key-outline" size={32} color={Theme.colors.primary} />
                    </View>
                    <Text style={styles.title}>Forgot Password?</Text>
                    <Text style={styles.subtitle}>Enter your email address and we'll send you an OTP to reset your password.</Text>
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

                    <CustomButton
                        title="Send OTP"
                        onPress={handleReset}
                        isLoading={isLoading}
                        style={styles.btn}
                    />
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
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
    },
    header: {
        alignItems: 'center',
        marginBottom: Theme.spacing['2xl'],
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Theme.spacing.xl,
    },
    title: {
        fontSize: 28,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: Theme.spacing.sm,
    },
    subtitle: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 20,
    },
    form: {
        marginTop: Theme.spacing.md,
    },
    btn: {
        marginTop: Theme.spacing.lg,
        height: 56,
        borderRadius: 16,
    },
});

export default ForgotPasswordScreen;
