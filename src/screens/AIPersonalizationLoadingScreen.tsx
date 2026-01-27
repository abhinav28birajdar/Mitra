import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const MESSAGES = [
    "Analyzing your goals...",
    "Curating learning paths...",
    "Preparing recommendations...",
    "Finding career matches...",
    "Setting up your dashboard...",
    "Almost there..."
];

const AIPersonalizationLoadingScreen = ({ navigation }: any) => {
    const [messageIndex, setMessageIndex] = useState(0);
    const pulseAnim = useState(new Animated.Value(1))[0];
    const rotateAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        // Pulse animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Rotate animation
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        // Message ticker
        const messageInterval = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % MESSAGES.length);
        }, 2000);

        // Transition to main after a while
        const timer = setTimeout(() => {
            navigation.replace('Main');
        }, 8000);

        return () => {
            clearInterval(messageInterval);
            clearTimeout(timer);
        };
    }, []);

    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <ScreenWrapper useGradient>
            <View style={styles.container}>
                <View style={styles.centerBox}>
                    <Animated.View style={[
                        styles.iconOuter,
                        { transform: [{ scale: pulseAnim }, { rotate: rotation }] }
                    ]}>
                        <View style={styles.iconInner}>
                            <Ionicons name="sparkles" size={40} color={Theme.colors.white} />
                        </View>
                    </Animated.View>

                    <Text style={styles.title}>Creating your journey</Text>
                    <Text style={styles.message}>{MESSAGES[messageIndex]}</Text>

                    <View style={styles.loadingBarContainer}>
                        <Animated.View style={styles.loadingBarFill} />
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Theme.spacing.xl,
    },
    centerBox: {
        alignItems: 'center',
        width: '100%',
    },
    iconOuter: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Theme.spacing.xl,
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    iconInner: {
        transform: [{ rotate: '0deg' }], // Keeps icon stable while outer rotates if needed, but here it rotates with it
    },
    title: {
        fontSize: Theme.typography.fontSize['2xl'],
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: Theme.spacing.md,
    },
    message: {
        fontSize: Theme.typography.fontSize.base,
        color: Theme.colors.textSecondary,
        height: 24,
    },
    loadingBarContainer: {
        width: '100%',
        height: 6,
        backgroundColor: Theme.colors.border,
        borderRadius: 3,
        marginTop: Theme.spacing['2xl'],
        overflow: 'hidden',
    },
    loadingBarFill: {
        height: '100%',
        backgroundColor: Theme.colors.primary,
        width: '100%',
        // In real app, animate width from 0 to 100
    },
});

export default AIPersonalizationLoadingScreen;
