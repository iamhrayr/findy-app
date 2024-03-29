import React, { useEffect, useCallback, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import useMount from 'react-use/lib/useMount';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import jwtDecode from 'jwt-decode';
import { showMessage } from 'react-native-flash-message';

import { RootState } from '@app/redux/rootReducer';
import httpInstance from '@app/helpers/http';
import i18n from '@app/i18n';
import api from '@app/api';
import { firebaseService } from '@app/services';
import { logout, refreshToken } from '@app/redux/ducks/auth/actions';
import { getRefreshTokenStatus } from '@app/redux/ducks/auth/selectors';
import { getProfilePreferences } from '@app/redux/ducks/profile/selectors';
// import { Loading } from '@app/components';

type Props = {
  setAppInitialised: (status: boolean) => void;
};

const Splash = ({ setAppInitialised }: Props) => {
  const { t } = useTranslation();
  const auth = useSelector((state: RootState) => state.auth);
  const refreshTokenStatus = useSelector(getRefreshTokenStatus);
  const profilePreferences = useSelector(getProfilePreferences);
  const dispatch = useDispatch();

  const registerAppWithFCM = useCallback(() => {
    const fn = async () => {
      const fcmToken = await firebaseService.getRemoteMessageToken();
      let error = false;

      if (fcmToken) {
        try {
          await api.connectForPushNotifications(fcmToken);
        } catch (err) {
          error = true;
        }
      }

      if (!fcmToken || error) {
        showMessage({
          type: 'danger',
          message: t('auth:error_sending_deviceid_title'),
          description: t('auth:error_sending_deviceid_description'),
          duration: 5000,
        });
      }
    };
    fn();
  }, [t]);

  useMount(() => {
    httpInstance.setLanguageHeader(profilePreferences.language);
    i18n.changeLanguage(profilePreferences.language);

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
      }
    } else {
      dispatch(logout());
      setAppInitialised(true);
    }
  });

  useEffect(() => {
    if (auth.isAuthenticated && refreshTokenStatus.loaded) {
      registerAppWithFCM();
      setAppInitialised(true);
    }
  }, [
    auth.isAuthenticated,
    refreshTokenStatus.loaded,
    setAppInitialised,
    registerAppWithFCM,
  ]);

  return <View style={styles.container}>{/* <Loading /> */}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(Splash);
