import React from 'react';
import {useColorScheme} from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
  PaperProvider,
} from 'react-native-paper';
import darkColorTheme from './assets/themeColorsDark.json';
import lightColorTheme from './assets/themeColorsLight.json';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  const colorScheme = useColorScheme();

  const theme = {
    ...(colorScheme === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(colorScheme === 'dark' ? DarkTheme : DefaultTheme).colors,
      ...(colorScheme === 'dark'
        ? darkColorTheme.colors
        : lightColorTheme.colors),
    },
  };

  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
};

export default App;
