import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StyleProvider } from 'native-base';

import getTheme from './theme/components';
import material from './theme/variables/material';

import NavigationRoot from './navigation';

const App: React.FC = () => {
  return (
    <StyleProvider style={getTheme(material)}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <NavigationRoot />
      </NavigationContainer>
    </StyleProvider>
  );
};

export default App;
