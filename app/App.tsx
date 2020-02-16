import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import NavigationRoot from './navigation';
import getTheme from './theme';
import store from './redux/store';

store.dispatch({ type: 'LOGIN' });

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={getTheme('light')}>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <NavigationRoot />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
