import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-eva-icons';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { withTheme, DefaultTheme } from 'styled-components/native';

import api from '@app/api';
import { authSelectors } from '@app/redux/ducks/auth';
import { useAsyncFn } from '@app/hooks';
import { Avatar, Layout, Text, Button } from '@app/components';

type Props = {
  theme: DefaultTheme;
};

const UserDetails = ({ theme }: Props) => {
  const navigation = useNavigation();
  const user = useSelector(authSelectors.getUser);
  const { t } = useTranslation();

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

  return (
    <Layout layout="row" spacer={{ x: 'md', b: 'lg', t: 'lg' }}>
      <Avatar clickable onPress={handleAvatarPress} source={{ uri: user!.avatar! }} />
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
        <Layout layout="col" spacer={{ t: 'sm' }}>
          <Button outline type="primary" size="sm" onPress={navigateToEditProfile}>
            {t('profile:edit_profile')}
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};

const UserDetailsWithTheme = withTheme(UserDetails);

// all this messy shit was because of some unexpected rerender after logout.
// When logout action dispatched it changes isAuthenticated flag,
// Navigator whould handle it and show the Auth screen,
// but somehow before showing Auth screen this component rerenders
// and the fucking error appears. I'm almost sure it's react-navigation bug.
const UserDetailsWrapper = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  if (!isAuthenticated) {
    return null;
  }
  return <UserDetailsWithTheme />;
};

export default UserDetailsWrapper;
