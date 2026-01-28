import { MD3LightTheme as PaperLightTheme } from 'react-native-paper';
import colors from './colors';

export const lightTheme = {
    ...PaperLightTheme,
    colors: {
        ...PaperLightTheme.colors,

        primary: colors.primary,
        onPrimary: '#FFFFFF',

        background: colors.background,
        surface: colors.surface,
        surfaceVariant: colors.surfaceVariant,

        secondary: colors.secondary,
        error: colors.error,

        outline: colors.border,
    },
};
