import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchMyFees } from '../../redux/thunks/feesThunks';
import { Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

/* =======================
   Component
======================= */

const FeesScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const navigation = useNavigation<any>();

  const { items, loading, error } = useSelector(
    (state: RootState) => state.fees
  );

  useEffect(() => {
    dispatch(fetchMyFees());
  }, [dispatch]);

  /* =======================
     Render States
  ======================= */

  if (loading) {
    return (
      <>
        <Appbar.Header elevated style={{ backgroundColor: theme.colors.surface }}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
            color={theme.colors.primary}
          />
          <Appbar.Content
            title="My Fees"
            titleStyle={{ fontWeight: '700' }}
            subtitle="Payments & installments"
          />
        </Appbar.Header>

        <View style={[styles.center, { backgroundColor: theme.colors.background }]}>
          <ActivityIndicator size="large" />
          <Text style={styles.infoText}>Loading payment details...</Text>
        </View>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Appbar.Header elevated style={{ backgroundColor: theme.colors.surface }}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
            color={theme.colors.primary}
          />
          <Appbar.Content
            title="My Fees"
            titleStyle={{ fontWeight: '700' }}
            subtitle="Payments & installments"
          />
        </Appbar.Header>

        <View style={[styles.center, { backgroundColor: theme.colors.background }]}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </>
    );
  }

  if (!items.length) {
    return (
      <>
        <Appbar.Header elevated style={{ backgroundColor: theme.colors.surface }}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
            color={theme.colors.primary}
          />
          <Appbar.Content
            title="My Fees"
            titleStyle={{ fontWeight: '700' }}
            subtitle="Payments & installments"
          />
        </Appbar.Header>

        <View style={[styles.center, { backgroundColor: theme.colors.background }]}>
          <Text style={styles.infoText}>No payment records found</Text>
        </View>
      </>
    );
  }

  /* =======================
     Render Item
  ======================= */

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.rowBetween}>
          <Text style={styles.courseName}>{item.courseName}</Text>
        </View>

        {/* Student */}
        <Text style={styles.studentName}>{item.studentName}</Text>

        {/* Amounts */}
        <View style={styles.amountRow}>
          <View>
            <Text style={styles.label}>Installment</Text>
            <Text style={styles.value}>₹{item.installmentAmount ?? 0}</Text>
          </View>

          <View>
            <Text style={styles.label}>Paid</Text>
            <Text style={styles.value}>₹{item.amountPaid ?? 0}</Text>
          </View>

          <View>
            <Text style={styles.label}>Count</Text>
            <Text style={styles.value}>{item.installmentCount ?? '-'}</Text>
          </View>
        </View>

        {/* Dates */}
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>
            Installment Date:{' '}
            {item.installmentDate
              ? new Date(item.installmentDate).toLocaleDateString()
              : '-'}
          </Text>

          <Text style={styles.footerText}>
            Paid Date:{' '}
            {item.paidDate
              ? new Date(item.paidDate).toLocaleDateString()
              : '-'}
          </Text>
        </View>
      </View>
    );
  };

  /* =======================
     Main Render
  ======================= */

  return (
    <>
      <Appbar.Header elevated style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color={theme.colors.primary}
        />
        <Appbar.Content
          title="My Fees"
          titleStyle={{ fontWeight: '700' }}
          subtitle="Payments & installments"
        />
      </Appbar.Header>

      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.studentPaymentId.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default FeesScreen;

/* =======================
   Styles
======================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  listContent: {
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    marginTop: 12,
    color: '#555',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  studentName: {
    marginTop: 6,
    color: '#777',
    fontSize: 13,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  label: {
    fontSize: 12,
    color: '#888',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginTop: 2,
  },
  footerRow: {
    marginTop: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
});
