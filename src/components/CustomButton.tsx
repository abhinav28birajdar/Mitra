import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../theme';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    isLoading = false,
    disabled = false,
    style,
    textStyle,
    variant = 'primary',
}) => {
    const isPrimary = variant === 'primary';
    const isOutline = variant === 'outline';
    const isGhost = variant === 'ghost';
    const isSecondary = variant === 'secondary';

    const renderContent = () => (
        isLoading ? (
            <ActivityIndicator color={isOutline || isGhost ? Theme.colors.primary : Theme.colors.white} />
        ) : (
            <Text style={[
                styles.text,
                isOutline || isGhost ? { color: Theme.colors.primary } : { color: Theme.colors.white },
                textStyle
            ]}>
                {title}
            </Text>
        )
    );

    if (isPrimary) {
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled || isLoading}
                activeOpacity={0.8}
                style={[styles.container, style]}
            >
                <LinearGradient
                    colors={[Theme.colors.primary, Theme.colors.primaryDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.gradient, { opacity: disabled ? 0.6 : 1 }]}
                >
                    {renderContent()}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || isLoading}
            activeOpacity={0.8}
            style={[
                styles.container,
                isOutline && styles.outline,
                isGhost && styles.ghost,
                isSecondary && styles.secondary,
                disabled && { opacity: 0.5 },
                style
            ]}
        >
            {renderContent()}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        borderRadius: Theme.borderRadius.lg,
        overflow: 'hidden',
        marginVertical: Theme.spacing.sm,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Theme.spacing.md,
    },
    secondary: {
        backgroundColor: Theme.colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: Theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ghost: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: Theme.typography.fontSize.base,
        fontWeight: Theme.typography.fontWeight.semibold as any,
        textAlign: 'center',
    },
});

export default CustomButton;
