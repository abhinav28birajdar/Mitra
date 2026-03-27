import { TextStyle } from 'react-native';
import { colors } from './colors';

export const typography: Record<string, TextStyle> = {
  h1: {
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 42,
    color: colors.textPrimary,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    color: colors.textPrimary,
  },
  h3: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
    color: colors.textPrimary,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: colors.textPrimary,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    color: colors.textTertiary,
  },
  button: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
};
