// App.tsx
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();

import React from 'react';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { Provider as PaperProvider, Portal } from 'react-native-paper';

import { store, RootState } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { lightTheme, darkTheme } from './src/theme';

const AppContent = () => {
  const darkMode = useSelector(
    (state: RootState) => state.theme.darkMode
  );

  const paperTheme = darkMode ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <Portal.Host>
        <AppNavigator />
      </Portal.Host>
    </PaperProvider>
  );
};

export default function App() {
  return (
    <ReduxProvider store={store}>
      <AppContent />
    </ReduxProvider>
  );
}
