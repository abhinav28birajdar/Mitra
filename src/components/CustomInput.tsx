import React, { useState, useCallback, useMemo } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInputProps,
    ViewStyle,
    Platform,
    Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@context/ThemeContext';

interface CustomInputProps extends TextInputProps {
    label?: string;
    iconName?: string;
    error?: string;
    password?: boolean;
    containerStyle?: ViewStyle;
    helperText?: string;
    showCharacterCount?: boolean;
    required?: boolean;
    success?: boolean;
    successMessage?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    iconName,
    error,
    password,
    containerStyle,
    onFocus,
    onBlur,
    value,
    onChangeText,
    multiline,
    numberOfLines,
    style: inputStyleOverride,
    helperText,
    showCharacterCount = false,
    maxLength,
    required = false,
    success = false,
    successMessage,
    editable = true,
    ...props
}) => {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);

    const handleFocus = useCallback((e: any) => {
        setIsFocused(true);
        onFocus?.(e);
    }, [onFocus]);

    const handleBlur = useCallback((e: any) => {
        setIsFocused(false);
        onBlur?.(e);
    }, [onBlur]);

    const togglePassword = useCallback(() => {
        setHidePassword(prev => !prev);
    }, []);

    const characterCount = useMemo(() => value?.length || 0, [value]);

    const borderColor = useMemo(() => {
        if (!editable) return theme.colors.border.light;
        if (error) return theme.colors.error.main;
        if (success) return theme.colors.success?.main || '#10B981';
        if (isFocused) return theme.colors.primary[600];
        return theme.colors.border.light;
    }, [error, success, isFocused, editable, theme]);

    const iconColor = useMemo(() => {
        if (!editable) return theme.colors.text.disabled;
        if (error) return theme.colors.error.main;
        if (success) return theme.colors.success?.main || '#10B981';
        if (isFocused) return theme.colors.primary[600];
        return theme.colors.text.disabled;
    }, [error, success, isFocused, editable, theme]);

    const isMultiline = !!multiline;
    const minHeight = isMultiline ? 100 : 54;

    const showSuccessIcon = success && !error && !password;
    const showErrorIcon = error && !password;

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <View style={styles.labelContainer}>
                    <Text style={[styles.label, { color: theme.colors.text.secondary }]}>
                        {label}
                        {required && <Text style={{ color: theme.colors.error.main }}> *</Text>}
                    </Text>
                    {showCharacterCount && maxLength && (
                        <Text style={[styles.characterCount, {
                            color: characterCount > maxLength
                                ? theme.colors.error.main
                                : theme.colors.text.disabled
                        }]}>
                            {characterCount}/{maxLength}
                        </Text>
                    )}
                </View>
            )}

            <View style={[
                styles.inputWrapper,
                {
                    borderColor,
                    backgroundColor: editable ? theme.colors.background.paper : theme.colors.background.light,
                    minHeight,
                },
                isMultiline && { alignItems: 'flex-start', paddingVertical: 12 },
                isFocused && editable && styles.focusedShadow,
                !editable && styles.disabledInput,
            ]}>
                {iconName && (
                    <Icon
                        name={iconName}
                        size={20}
                        color={iconColor}
                        style={[styles.icon, isMultiline && { marginTop: 2 }]}
                    />
                )}

                <TextInput
                    secureTextEntry={hidePassword}
                    autoCorrect={false}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={value}
                    onChangeText={onChangeText}
                    multiline={isMultiline}
                    numberOfLines={numberOfLines}
                    textAlignVertical={isMultiline ? 'top' : 'center'}
                    maxLength={maxLength}
                    editable={editable}
                    style={[
                        styles.input,
                        { color: editable ? theme.colors.text.primary : theme.colors.text.disabled },
                        inputStyleOverride,
                    ]}
                    placeholderTextColor={theme.colors.text.disabled}
                    accessibilityLabel={label}
                    accessibilityHint={helperText}
                    accessibilityState={{
                        disabled: !editable,
                    }}
                    {...props}
                />

                {password && (
                    <TouchableOpacity
                        onPress={togglePassword}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        accessibilityLabel={hidePassword ? 'Show password' : 'Hide password'}
                        accessibilityRole="button"
                    >
                        <Icon
                            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={theme.colors.text.disabled}
                        />
                    </TouchableOpacity>
                )}

                {showSuccessIcon && (
                    <Icon
                        name="checkmark-circle"
                        size={20}
                        color={theme.colors.success?.main || '#10B981'}
                        style={styles.statusIcon}
                    />
                )}

                {showErrorIcon && (
                    <Icon
                        name="alert-circle"
                        size={20}
                        color={theme.colors.error.main}
                        style={styles.statusIcon}
                    />
                )}
            </View>

            {helperText && !error && !successMessage && (
                <Text style={[styles.helperText, { color: theme.colors.text.disabled }]}>
                    {helperText}
                </Text>
            )}

            {error && (
                <View style={styles.messageContainer}>
                    <Icon name="alert-circle-outline" size={14} color={theme.colors.error.main} />
                    <Text style={[styles.errorText, { color: theme.colors.error.main }]}>{error}</Text>
                </View>
            )}

            {successMessage && !error && (
                <View style={styles.messageContainer}>
                    <Icon name="checkmark-circle-outline" size={14} color={theme.colors.success?.main || '#10B981'} />
                    <Text style={[styles.successText, { color: theme.colors.success?.main || '#10B981' }]}>
                        {successMessage}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        width: '100%',
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
    },
    characterCount: {
        fontSize: 12,
        fontWeight: '500',
    },
    inputWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        borderWidth: 1.5,
        borderRadius: 14,
        alignItems: 'center',
    },
    focusedShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    disabledInput: {
        opacity: 0.6,
    },
    icon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: Platform.OS === 'android' ? 8 : 0,
    },
    statusIcon: {
        marginLeft: 8,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        marginLeft: 4,
        gap: 6,
    },
    helperText: {
        fontSize: 12,
        marginTop: 6,
        marginLeft: 4,
    },
    errorText: {
        fontSize: 12,
        flex: 1,
    },
    successText: {
        fontSize: 12,
        flex: 1,
    },
});

export default CustomInput;

