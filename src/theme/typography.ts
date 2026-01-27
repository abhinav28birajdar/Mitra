import { Platform } from 'react-native';

export const TYPOGRAPHY = {
    fontFamily: {
        regular: Platform.select({ ios: 'System', android: 'sans-serif' }),
        medium: Platform.select({ ios: 'System', android: 'sans-serif-medium' }),
        bold: Platform.select({ ios: 'System', android: 'sans-serif-bold' }),
        semibold: Platform.select({ ios: 'System', android: 'sans-serif-medium' }), // Android fallback
    },
    fontSize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
    },
    fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extraBold: '800',
    },
    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    }
};
