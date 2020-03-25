import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import useMount from 'react-use/lib/useMount';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';

import { RootState } from '@app/redux/rootReducer';
import { logout, refreshToken } from '@app/redux/ducks/auth/actions';
import { getRefreshTokenStatus } from '@app/redux/ducks/auth/selectors';

type Props = {
  setAppInitialised: (status: boolean) => void;
};

const Splash = ({ setAppInitialised }: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const refreshTokenStatus = useSelector(getRefreshTokenStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated && refreshTokenStatus.loaded) {
      setAppInitialised(true);
    }
  }, [auth.isAuthenticated, refreshTokenStatus.loaded, setAppInitialised]);

  useMount(() => {
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Splash Screen</Text>
    </View>
  );
};

export default Splash;
