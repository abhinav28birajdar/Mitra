import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  icon,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, typography.bodySmall]}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          error ? styles.inputError : styles.inputBorder,
          props.multiline && styles.multiline,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[styles.input, typography.body, inputStyle]}
          placeholderTextColor={colors.textTertiary}
          {...props}
        />
      </View>
      {error && <Text style={[styles.errorText, typography.caption]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    width: '100%',
  },
  label: {
    marginBottom: spacing.xs,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
    backgroundColor: '#F3F4F6', // very soft gray
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    height: 56,
  },
  inputBorder: {
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  inputError: {
    borderWidth: 1.5,
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    height: '100%',
    color: colors.textPrimary,
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  errorText: {
    color: colors.error,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
  multiline: {
    height: 100,
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
  },
});
