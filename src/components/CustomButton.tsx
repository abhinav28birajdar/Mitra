import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@context/ThemeContext';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'error';
    icon?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
}

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    isLoading = false,
    disabled = false,
    style,
    textStyle,
    variant = 'primary',
    icon,
    size = 'md',
}) => {
    const { theme } = useTheme();

    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return {
                    bg: theme.colors.primary[600],
                    text: '#FFFFFF',
                    border: 'transparent'
                };
            case 'secondary':
                return {
                    bg: theme.colors.background.light,
                    text: theme.colors.primary[600],
                    border: theme.colors.primary[100]
                };
            case 'outline':
                return {
                    bg: 'transparent',
                    text: theme.colors.primary[600],
                    border: theme.colors.primary[600]
                };
            case 'error':
                return {
                    bg: theme.colors.error.main,
                    text: '#FFFFFF',
                    border: 'transparent'
                };
            case 'ghost':
                return {
                    bg: 'transparent',
                    text: theme.colors.primary[600],
                    border: 'transparent'
                };
            default:
                return {
                    bg: theme.colors.primary[600],
                    text: '#FFFFFF',
                    border: 'transparent'
                };
        }
    };

    const { bg, text, border } = getVariantStyles();

    const height = size === 'sm' ? 40 : size === 'lg' ? 64 : 54;
    const fontSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || isLoading}
            activeOpacity={0.8}
            style={[
                styles.container,
                {
                    backgroundColor: bg,
                    borderColor: border,
                    borderWidth: border !== 'transparent' ? 1.5 : 0,
                    height,
                    opacity: disabled ? 0.6 : 1
                },
                style
            ]}
        >
            {isLoading ? (
                <ActivityIndicator color={text} />
            ) : (
                <View style={styles.content}>
                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                    <Text style={[
                        styles.text,
                        { color: text, fontSize },
                        textStyle
                    ]}>
                        {title}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginRight: 8,
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CustomButton;
