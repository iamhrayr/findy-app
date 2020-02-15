import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import NavigationRoot from './navigation';
import getTheme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={getTheme('light')}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <NavigationRoot />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
