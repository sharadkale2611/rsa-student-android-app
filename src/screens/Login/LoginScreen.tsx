import React, { useState } from 'react';
import {
  View,
  Image,
  ImageBackground,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  useTheme,
  Card,
} from 'react-native-paper';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loginStudent } from '../../redux/thunks/authThunks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

import Logo from '../../assets/images/logo.png';
import BgImage from '../../assets/images/login-bg.png';
import styles from './styles';

const LoginScreen: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { loading, error } = useAppSelector(state => state.auth);

  const [username, setUsername] = useState('sanjay.dhavle0002');
  const [password, setPassword] = useState('12345678');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) return;

    const result = await dispatch(loginStudent({ username, password }));

    if (loginStudent.fulfilled.match(result)) {
      navigation.replace('Main');
    }
  };

  return (
    <ImageBackground
      source={BgImage}
      resizeMode="cover"
      style={styles.bg}
    >
      <View style={styles.overlay}>
        <Card style={styles.card} elevation={4}>
          <Card.Content>

            {/* Logo Section */}
            <View style={styles.logoContainer}>
              <Image source={Logo} style={styles.logo} />
              <Text
                variant="titleLarge"
                style={{ color: theme.colors.primary, marginTop: 6 }}
              >
                Rev. Sci. Academy
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Student Login
              </Text>
            </View>

            {/* Username */}
            <TextInput
              label="Username"
              mode="outlined"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              left={<TextInput.Icon icon="account" />}
            />

            {/* Password with Show / Hide */}
            <TextInput
              label="Password"
              mode="outlined"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.input}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(prev => !prev)}
                />
              }
            />

            {/* Error */}
            {error ? (
              <Text
                style={{
                  color: theme.colors.error,
                  marginBottom: 10,
                  textAlign: 'center',
                }}
              >
                {error}
              </Text>
            ) : null}

            {/* Button / Loader */}
            {loading ? (
              <ActivityIndicator
                animating
                size="large"
                style={{ marginTop: 16 }}
              />
            ) : (
              <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.button}
                contentStyle={{ paddingVertical: 6 }}
              >
                Login
              </Button>
            )}

            {/* Footer */}
            <Text
              style={{
                textAlign: 'center',
                marginTop: 14,
                color: theme.colors.onSurfaceVariant,
                fontSize: 12,
              }}
            >
              Version 0.2
            </Text>

          </Card.Content>
        </Card>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
