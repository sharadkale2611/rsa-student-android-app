import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Avatar,
  Card,
  Text,
  useTheme,
  List,
  Divider,
  ActivityIndicator,
} from 'react-native-paper';
import { fetchStudentProfile } from '../../redux/thunks/profileThunks';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { formatDate } from '../../utils/formatDate';
import { styles } from './styles';

const StudentProfileScreen = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const user = useAppSelector((state) => state.auth.user);
  const { profile, loading, error } = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (user?.userId && user?.firmId) {
      dispatch(
        fetchStudentProfile({
          userId: user.userId,
          firmId: user.firmId,
        })
      );
    }
  }, [user]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.center}>Error: {error}</Text>;
  }

  if (!profile) {
    return <Text style={styles.center}>No profile data</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      {/* Profile Header */}
      <Card style={styles.profileCard} mode="elevated">
        <View style={styles.header}>
          <Avatar.Text
            size={72}
            label={profile.firstName.charAt(0).toUpperCase()}
            style={{ backgroundColor: theme.colors.primary }}
            color={theme.colors.onPrimary}
          />

          <View style={styles.headerText}>
            <Text variant="titleLarge" style={{ fontWeight: '700' }}>
              {profile.firstName} {profile.lastName}
            </Text>
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {profile.userName}
            </Text>

            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {profile.studentCode}
            </Text>
          </View>
        </View>
      </Card>

      {/* Personal Info */}
      <Card style={styles.sectionCard} mode="outlined">
        <Card.Title title="Personal Information" />
        <Card.Content>
          <List.Item title="Email" description={profile.email} />
          <Divider />
          <List.Item
            title="Gender"
            description={profile.gender === 'F' ? 'Female' : 'Male'}
          />
          <Divider />
          <List.Item title="Mobile" description={profile.mobileNumber1} />
          <Divider />
          <List.Item
            title="Date of Birth"
            description={formatDate(profile.dateOfBirth)}
          />
        </Card.Content>
      </Card>

      

      {/* Firm Info */}
      <Card style={styles.sectionCard} mode="outlined">
        <Card.Title title="Organization" />
        <Card.Content>
          <List.Item
            title="Firm"
            description={`${profile.firmName} (${profile.firmCode})`}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default StudentProfileScreen;