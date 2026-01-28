import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    listContainer: {
    padding: 12,
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
  },
  batchText: {
    marginTop: 4,
    color: '#555',
  },
  chipRow: {
    marginTop: 10,
    flexDirection: 'row',
  },
  chip: {
    backgroundColor: '#EDE7F6',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  helperText: {
    marginTop: 8,
    color: '#666',
  },
  errorText: {
    color: 'red',
    fontWeight: '500',
  },
});