import React, { useEffect } from 'react';
import { View } from 'react-native';
import useMount from 'react-use/lib/useMount';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import messaging from '@react-native-firebase/messaging';

import { RootState } from '@app/redux/rootReducer';
import httpInstance from '@app/helpers/http';
import { logout, refreshToken } from '@app/redux/ducks/auth/actions';
import { getRefreshTokenStatus } from '@app/redux/ducks/auth/selectors';
import { getProfilePreferences } from '@app/redux/ducks/profile/selectors';
import { Loading } from '@app/components';

type Props = {
  setAppInitialised: (status: boolean) => void;
};

const requestPermission = async () => {
  const granted = messaging().requestPermission();

  if (granted) {
    console.log('User granted messaging permissions!');
  } else {
    console.log('User declined messaging permissions :(');
  }
};

const registerAppWithFCM = async () => {
  await requestPermission();
  await messaging().registerForRemoteNotifications();
  const fcmToken = await messaging().getToken();

  console.log({ fcmToken });
  // send token to api
};

const Splash = ({ setAppInitialised }: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const refreshTokenStatus = useSelector(getRefreshTokenStatus);
  const profilePreferences = useSelector(getProfilePreferences);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated && refreshTokenStatus.loaded) {
      setAppInitialised(true);
    }
  }, [auth.isAuthenticated, refreshTokenStatus.loaded, setAppInitialised]);

  useMount(() => {
    httpInstance.setLanguageHeader(profilePreferences.language);
    if (!auth.isAuthenticated) {
      return setAppInitialised(true);
    }

    if (auth.refreshToken) {
      const decodedRefreshToken: any = jwtDecode(auth.refreshToken);
      if (decodedRefreshToken.exp * 1000 < Date.now()) {
        dispatch(logout());
        setAppInitialised(true);
      } else {
        dispatch(refreshToken(auth.refreshToken));
        registerAppWithFCM();
      }
    } else {
      dispatch(logout());
      setAppInitialised(true);
    }
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Loading />
    </View>
  );
};

export default Splash;
