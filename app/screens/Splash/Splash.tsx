import React from 'react';
import { View, Text } from 'react-native';
import useMount from 'react-use/lib/useMount';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';

import { RootState } from '@app/redux/rootReducer';
import { logout, refreshToken } from '@app/redux/ducks/auth/actions';

type Props = {
  setAppInitialised: (status: boolean) => void;
};

const Splash = ({ setAppInitialised }: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  // console.log(auth);

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
        setAppInitialised(true);
      }
    } else {
      dispatch(logout());
      setAppInitialised(true);
    }
  });

  return (
    <View style={{ backgroundColor: 'red' }}>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;
