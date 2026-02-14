import { colors, ColorPalette } from './colors';
import { typography, Typography } from './typography';
import { spacing, borderRadius, shadows, zIndex, Spacing, BorderRadius, Shadows, ZIndex } from './spacing';

export interface Theme {
    colors: ColorPalette;
    typography: Typography;
    spacing: Spacing;
    borderRadius: BorderRadius;
    shadows: Shadows;
    zIndex: ZIndex;
    isDark: boolean;
}

export const lightTheme: Theme = {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    zIndex,
    isDark: false,
};

export const darkTheme: Theme = {
    ...lightTheme,
    colors: {
        ...colors,
        background: {
            light: colors.background.dark,
            dark: colors.background.light,
            paper: colors.background.darkPaper,
            darkPaper: colors.background.paper,
        },
        text: {
            primary: colors.text.light,
            secondary: colors.gray[400],
            disabled: colors.gray[600],
            light: colors.text.primary,
        },
    },
    isDark: true,
};

export { colors, colors as COLORS, typography, spacing, borderRadius, shadows, zIndex };
