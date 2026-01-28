import { MD3LightTheme, MD3Theme } from 'react-native-paper';

export const AppColors = {
    primary: '#26368A',      // Appbar, primary buttons
    secondary: '#D32F2F',    // Alerts, badges
    accent: '#FBC02D',       // Highlights
    background: '#F4FBFC',  // Screen background
    surface: '#FFFFFF',     // Cards
    textPrimary: '#1C1C1C',
    textSecondary: '#616161',
};

export const AppTheme: MD3Theme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: AppColors.primary,
        secondary: AppColors.secondary,
        background: AppColors.background,
        surface: AppColors.surface,
        onPrimary: '#FFFFFF',
        onSurface: AppColors.textPrimary,
    },
};
