// src/screens/MainScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleTheme } from '../redux/slices/themeSlice';

const MainScreen = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state: RootState) => state.theme.darkMode);

    // Get the current Paper theme
    const theme = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={{ color: theme.colors.onBackground, fontSize: 18 }}>
                Current Theme: {darkMode ? 'Dark' : 'Light'}
            </Text>

            <Button
                mode="contained"
                onPress={() => dispatch(toggleTheme())}
                style={{ marginTop: 20 }}
            >
                Toggle Theme
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});

export default MainScreen;
