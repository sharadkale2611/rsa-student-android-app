import { MD3DarkTheme as PaperDarkTheme } from 'react-native-paper';
import colors from './colors';

export const darkTheme = {
    ...PaperDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,

        primary: colors.primary,
        onPrimary: '#FFFFFF',

        background: '#121212',
        surface: '#1E1E1E',
        surfaceVariant: '#2A2A2A',

        secondary: colors.secondary,
        error: colors.error,
    },
};
