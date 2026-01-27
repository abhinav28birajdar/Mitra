import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, TextInputProps, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../theme';

interface CustomInputProps extends TextInputProps {
    label?: string;
    iconName?: keyof typeof Ionicons.glyphMap;
    error?: string;
    password?: boolean;
    containerStyle?: ViewStyle;
}

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    iconName,
    error,
    password,
    containerStyle,
    onFocus,
    onBlur,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={[
                styles.inputContainer,
                { borderColor: error ? Theme.colors.error : isFocused ? Theme.colors.primary : Theme.colors.border },
                isFocused && styles.inputFocused
            ]}>
                {iconName && (
                    <Ionicons
                        name={iconName}
                        size={20}
                        color={error ? Theme.colors.error : isFocused ? Theme.colors.primary : Theme.colors.textSecondary}
                        style={styles.icon}
                    />
                )}

                <TextInput
                    secureTextEntry={hidePassword}
                    autoCorrect={false}
                    onFocus={(e) => {
                        onFocus?.(e);
                        setIsFocused(true);
                    }}
                    onBlur={(e) => {
                        onBlur?.(e);
                        setIsFocused(false);
                    }}
                    style={styles.input}
                    placeholderTextColor={Theme.colors.gray}
                    {...props}
                />

                {password && (
                    <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons
                            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={Theme.colors.textSecondary}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Theme.spacing.md,
        width: '100%',
    },
    label: {
        marginBottom: Theme.spacing.xs,
        fontSize: Theme.typography.fontSize.sm,
        fontWeight: Theme.typography.fontWeight.medium as any,
        color: Theme.colors.text,
    },
    inputContainer: {
        height: 56,
        backgroundColor: Theme.colors.surface,
        flexDirection: 'row',
        paddingHorizontal: Theme.spacing.md,
        borderWidth: 1.5,
        borderRadius: Theme.borderRadius.lg,
        alignItems: 'center',
    },
    inputFocused: {
        backgroundColor: Theme.colors.background,
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    icon: {
        marginRight: Theme.spacing.sm,
    },
    input: {
        color: Theme.colors.text,
        flex: 1,
        height: '100%',
        fontSize: Theme.typography.fontSize.base,
    },
    errorText: {
        color: Theme.colors.error,
        fontSize: Theme.typography.fontSize.xs,
        marginTop: Theme.spacing.xs,
        marginLeft: Theme.spacing.xs,
    },
});

export default CustomInput;
