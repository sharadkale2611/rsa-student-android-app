// src/screens/Login/styles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    card: {
        width: '100%',
        maxWidth: 380,
        borderRadius: 16,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 8,
    },
    input: {
        marginBottom: 14,
    },
    button: {
        marginTop: 8,
        borderRadius: 10,
    },
});


export default StyleSheet.create(styles);
