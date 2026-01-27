import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = () => {
    const navigation = useNavigation<any>();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            })
        ]).start();

        const timer = setTimeout(() => {
            navigation.replace('Onboarding');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <ScreenWrapper backgroundColor={Theme.colors.primary}>
            <LinearGradient
                colors={[Theme.colors.primary, Theme.colors.primaryDark]}
                style={styles.container}
            >
                <Animated.View style={{
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }],
                    alignItems: 'center'
                }}>
                    <View style={styles.logoBadge}>
                        <Text style={styles.logoLetter}>M</Text>
                    </View>
                    <Text style={styles.title}>Mitra</Text>
                    <Text style={styles.tagline}>Your AI Career Companion</Text>
                </Animated.View>

                <View style={styles.footer}>
                    <Text style={styles.poweredBy}>Powered by Gemini AI</Text>
                    <Text style={styles.version}>v1.0.0</Text>
                </View>
            </LinearGradient>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoBadge: {
        width: 120,
        height: 120,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    logoLetter: {
        fontSize: 72,
        color: Theme.colors.white,
        fontWeight: Theme.typography.fontWeight.bold as any,
    },
    title: {
        fontSize: 48,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.white,
        letterSpacing: 2,
    },
    tagline: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 8,
    },
    footer: {
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
    },
    poweredBy: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 14,
        marginBottom: 4,
        fontWeight: '600',
    },
    version: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 12,
    },
});

export default SplashScreen;
