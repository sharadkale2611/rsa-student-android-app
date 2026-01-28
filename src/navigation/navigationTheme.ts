import { Theme as NavigationTheme } from '@react-navigation/native';
import { MD3Theme } from 'react-native-paper';

export const createNavigationTheme = (
    paperTheme: MD3Theme
): NavigationTheme => ({
    dark: paperTheme.dark,

    colors: {
        primary: paperTheme.colors.primary,
        background: paperTheme.colors.background,
        card: paperTheme.colors.surface,
        text: paperTheme.colors.onSurface,
        border: paperTheme.colors.outline,
        notification: paperTheme.colors.error,
    },

    // ✅ REQUIRED by React Navigation
    fonts: {
        regular: {
            fontFamily: paperTheme.fonts.bodyMedium.fontFamily,
            fontWeight: '400',
        },
        medium: {
            fontFamily: paperTheme.fonts.bodyMedium.fontFamily,
            fontWeight: '500',
        },
        bold: {
            fontFamily: paperTheme.fonts.bodyMedium.fontFamily,
            fontWeight: '700',
        },
        heavy: {
            fontFamily: paperTheme.fonts.bodyMedium.fontFamily,
            fontWeight: '800',
        },
    },
});
