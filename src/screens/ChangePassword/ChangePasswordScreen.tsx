import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Card,
  useTheme,
  IconButton,
} from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changePasswordThunk } from "../../redux/thunks/changePasswordThunks";
import { logout } from "../../redux/slices/authSlice";
import { useNavigation } from "@react-navigation/native";

export default function ChangePasswordScreen() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const navigation = useNavigation<any>();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = () => {
    if (!user) {
      Alert.alert("Login again", "User not found");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New Password and Confirm Password do not match!");
      return;
    }

    setLoading(true);

    dispatch(
      changePasswordThunk({
        userId: user.userId,
        currentPassword: oldPassword,
        newPassword: newPassword,
      })
    )
      .unwrap()
      .then(() => {
        Alert.alert("Success", "Password updated successfully!", [
          {
            text: "OK",
            onPress: () => {
              dispatch(logout());
              navigation.replace("Auth");
            },
          },
        ]);

        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        Alert.alert("Error", err || "Failed to update password");
      })
      .finally(() => setLoading(false));
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Card style={styles.card} mode="elevated">
        <Card.Title
          title="Change Password"
          subtitle="Update your account security"
          left={(props) => (
            <IconButton
              {...props}
              icon="lock-reset"
              iconColor={theme.colors.primary}
            />
          )}
        />

        <Card.Content>
          <TextInput
            label="Old Password"
            mode="outlined"
            secureTextEntry={!showOld}
            value={oldPassword}
            onChangeText={setOldPassword}
            style={styles.input}
            left={<TextInput.Icon icon="lock-outline" />}
            right={
              <TextInput.Icon
                icon={showOld ? "eye-off" : "eye"}
                onPress={() => setShowOld(!showOld)}
              />
            }
          />

          <TextInput
            label="New Password"
            mode="outlined"
            secureTextEntry={!showNew}
            value={newPassword}
            onChangeText={setNewPassword}
            style={styles.input}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon
                icon={showNew ? "eye-off" : "eye"}
                onPress={() => setShowNew(!showNew)}
              />
            }
          />

          <TextInput
            label="Confirm Password"
            mode="outlined"
            secureTextEntry={!showConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            left={<TextInput.Icon icon="lock-check" />}
            right={
              <TextInput.Icon
                icon={showConfirm ? "eye-off" : "eye"}
                onPress={() => setShowConfirm(!showConfirm)}
              />
            }
          />

          <Button
            mode="contained"
            onPress={handleChangePassword}
            loading={loading}
            disabled={loading}
            style={styles.button}
            contentStyle={{ paddingVertical: 6 }}
            icon="check-circle-outline"
          >
            Update Password
          </Button>

          <Text
            variant="labelSmall"
            style={{ textAlign: "center", marginTop: 12, color: theme.colors.outline }}
          >
            You will be logged out after changing password
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  card: {
    borderRadius: 12,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
});
