// This handles Login / Forgot Password screens.
// src/navigation/AuthNavigator.tsx

// AuthNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/LoginScreen';
import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false,animation: 'none', }}>
        <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
);

export default AuthNavigator;
