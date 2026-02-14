import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@context/ThemeContext';

interface BadgeProps {
    label: string;
    variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
    size?: 'sm' | 'md';
    style?: ViewStyle;
}

const Badge: React.FC<BadgeProps> = ({
    label,
    variant = 'primary',
    size = 'md',
    style
}) => {
    const { theme } = useTheme();

    const getVariantStyles = () => {
        switch (variant) {
            case 'primary': return { bg: theme.colors.primary[50], color: theme.colors.primary[600] };
            case 'secondary': return { bg: theme.colors.gray[100], color: theme.colors.gray[600] };
            case 'success': return { bg: '#ECFDF5', color: '#10B981' };
            case 'error': return { bg: '#FEF2F2', color: '#EF4444' };
            case 'warning': return { bg: '#FFFBEB', color: '#F59E0B' };
            case 'info': return { bg: '#EFF6FF', color: '#3B82F6' };
            default: return { bg: theme.colors.primary[50], color: theme.colors.primary[600] };
        }
    };

    const { bg, color } = getVariantStyles();

    return (
        <View style={[
            styles.container,
            { backgroundColor: bg },
            size === 'sm' ? styles.sm : styles.md,
            style
        ]}>
            <Text style={[
                styles.text,
                { color },
                size === 'sm' ? styles.textSm : styles.textMd
            ]}>
                {label}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sm: {
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    md: {
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    text: {
        fontWeight: 'bold',
    },
    textSm: {
        fontSize: 10,
    },
    textMd: {
        fontSize: 12,
    }
});

export default Badge;
