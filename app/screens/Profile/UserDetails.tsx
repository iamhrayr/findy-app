import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-native-eva-icons';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { withTheme, DefaultTheme } from 'styled-components/native';

import api from '@app/api';
import { authSelectors, authActions } from '@app/redux/ducks/auth';
import { useAsyncFn } from '@app/hooks';
import { Avatar, Layout, Text, Button } from '@app/components';

type Props = {
  theme: DefaultTheme;
};

const UserDetails = ({ theme }: Props) => {
  const navigation = useNavigation();
  const user = useSelector(authSelectors.getUser);
  const { t } = useTranslation();
  // const isAuth = useSelector(state => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  // console.log('before isAUth????', { isAuth });

  const [{}, changeAvatarMutation] = useAsyncFn(api.changeAvatar);

  const navigateToEditProfile = useCallback(() => {
    navigation.navigate('Profile:Edit');
  }, [navigation]);

  const renderFullName = useCallback(() => {
    if (user && user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return t('profile:no_name');
  }, [t, user]);

  const phoneNumber = parsePhoneNumberFromString(
    user!.phoneNumber,
    'AM',
  )!.formatInternational();

  const handleAvatarPress = useCallback(() => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'photo',
      cropping: true,
      includeBase64: true,
    }).then((photo: Image | Image[]) => {
      if (Array.isArray(photo)) {
        return;
      }

      const formdata = new FormData();
      formdata.append('avatar', {
        uri: photo.path,
        name: 'avatar.jpeg',
        type: photo.mime,
        title: 'avatar',
      });

      changeAvatarMutation(formdata);
    });
  }, [changeAvatarMutation]);

  const logoutHandler = useCallback(() => {
    CommonActions.reset({
      index: 1,
      routes: [{ name: 'Auth:Intro' }],
    });
    dispatch(authActions.logout());
  }, [dispatch]);

  const s =
    user?.avatar && user.avatar.replace('http://127.0.0.1', 'http://134.122.22.145');

  return (
    <Layout layout="row" spacer={{ x: 'md', b: 'xxl', t: 'lg' }}>
      <Avatar
        clickable
        onPress={handleAvatarPress}
        // source={{ uri: user!.avatar! }}
        source={{ uri: s }}
      />
      <Layout layout="col" justify="center" spacer={{ l: 'lg' }}>
        <Text size="h3" weight="600" spacer={{ b: 'sm' }}>
          {renderFullName()}
        </Text>
        <Layout layout="row">
          <Icon
            name="phone-outline"
            width={20}
            height={20}
            fill={theme.colors.darkGray}
          />
          <Text weight="300" spacer={{ l: 'xs' }}>
            {phoneNumber}
          </Text>
        </Layout>
        <Layout layout="row" align="center" spacer={{ t: 'sm' }}>
          <Button outline type="primary" size="sm" onPress={navigateToEditProfile}>
            {t('profile:edit_profile')}
          </Button>
          <Button type="link" size="sm" onPress={logoutHandler}>
            {t('logout')}
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default withTheme(UserDetails);
