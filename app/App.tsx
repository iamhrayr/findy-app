import React from 'react';
import useMount from 'react-use/lib/useMount';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { enableScreens } from 'react-native-screens';

import NavigationRoot from './navigation';

enableScreens();

const App: React.FC = () => {
  useMount(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <NavigationRoot />
    </NavigationContainer>
  );
};

export default App;
