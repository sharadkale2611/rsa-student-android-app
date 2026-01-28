// src/screens/Dashboard/styles.ts

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        marginTop: 14,
        padding: 16,
        paddingBottom: 60,
        
    },
    title: {
  fontSize: 22,
  fontWeight: '500',
  marginBottom: 12, 
},
    username: {
        fontSize: 26,
        fontWeight: '700',
        marginTop: 4,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: '700',
    },
    scheduleCard: {
        marginTop: 10,
        borderRadius: 12,
        padding: 10,
    },
    scheduleItem: {
        fontSize: 16,
        marginVertical: 4,
    },
    
});
