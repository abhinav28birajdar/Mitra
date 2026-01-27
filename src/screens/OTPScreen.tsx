import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomButton from '../components/CustomButton';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const OTPScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { email } = route.params || { email: 'your email' };

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const inputRefs = useRef<Array<TextInput | null>>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        if (otp.join('').length < 6) return;
        navigation.replace('SignIn');
    };

    return (
        <ScreenWrapper useGradient>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={Theme.colors.text} />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.title}>Verify Email</Text>
                    <Text style={styles.subtitle}>We've sent a 6-digit code to {email}.</Text>
                </View>

                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => { inputRefs.current[index] = ref; }}
                            style={[styles.otpInput, digit !== '' && styles.otpInputActive]}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            textAlign="center"
                        />
                    ))}
                </View>

                <View style={styles.timerContainer}>
                    {timer > 0 ? (
                        <Text style={styles.timerText}>Resend code in <Text style={styles.boldText}>{timer}s</Text></Text>
                    ) : (
                        <TouchableOpacity onPress={() => setTimer(30)}>
                            <Text style={styles.resendText}>Resend Code</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <CustomButton
                    title="Verify & Continue"
                    onPress={handleVerify}
                    disabled={otp.join('').length < 6}
                    style={styles.btn}
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: Theme.spacing.xl,
        flex: 1,
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
        marginBottom: Theme.spacing['2xl'],
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
        lineHeight: 22,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Theme.spacing['2xl'],
    },
    otpInput: {
        width: 48,
        height: 56,
        borderRadius: 12,
        backgroundColor: Theme.colors.surface,
        borderWidth: 1.5,
        borderColor: Theme.colors.border,
        fontSize: 20,
        fontWeight: 'bold',
        color: Theme.colors.text,
    },
    otpInputActive: {
        borderColor: Theme.colors.primary,
        backgroundColor: '#EEF2FF',
    },
    timerContainer: {
        alignItems: 'center',
        marginBottom: Theme.spacing.xl,
    },
    timerText: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
    },
    boldText: {
        fontWeight: 'bold',
        color: Theme.colors.primary,
    },
    resendText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Theme.colors.primary,
    },
    btn: {
        height: 56,
        borderRadius: 16,
    },
});

export default OTPScreen;
