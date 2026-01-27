import React from 'react';
import { View, StyleSheet, StatusBar, ViewStyle, StatusBarStyle, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';

interface ScreenWrapperProps {
    children: React.ReactNode;
    style?: ViewStyle;
    backgroundColor?: string;
    statusBarContent?: StatusBarStyle;
    useGradient?: boolean;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
    children,
    style,
    backgroundColor = Theme.colors.background,
    statusBarContent = 'dark-content',
    useGradient = false,
}) => {
    if (useGradient) {
        return (
            <LinearGradient
                colors={[Theme.colors.background, '#F0F9FF']} // Soft gradient
                style={[styles.container, style]}
            >
                <StatusBar barStyle={statusBarContent} backgroundColor="transparent" translucent />
                <SafeAreaView style={styles.safeArea}>
                    {children}
                </SafeAreaView>
            </LinearGradient>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor }, style]}>
            <StatusBar
                barStyle={statusBarContent}
                backgroundColor={Platform.OS === 'android' ? backgroundColor : undefined}
            />
            <SafeAreaView style={styles.safeArea}>
                {children}
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
});

export default ScreenWrapper;
