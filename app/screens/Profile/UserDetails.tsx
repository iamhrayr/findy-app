import React, { useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Box, Text, Icon, Avatar } from 'react-native-magnus';

import { Button } from '@app/components';
import { authSelectors, authActions } from '@app/redux/ducks/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UserDetails = () => {
  const navigation = useNavigation();
  const user = useSelector(authSelectors.getUser);
  const dispatch = useDispatch();
  const { t } = useTranslation();

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

      dispatch(authActions.changeAvatar.trigger(formdata));
    });
  }, [dispatch]);

  return (
    <Box flexDir="row" mx="md" my="2xl">
      <TouchableOpacity onPress={handleAvatarPress}>
        <Avatar size={100} rounded="2xl" source={{ uri: user!.avatar! }} />
      </TouchableOpacity>

      <Box justifyContent="center" ml="lg">
        <Text fontSize="3xl" fontWeight="600" mb="sm">
          {renderFullName()}
        </Text>
        <Box flexDir="row" alignItems="center">
          <Icon name="phone" w={20} h={20} fontSize="xl" color="gray700" />
          <Text ml="xs">{phoneNumber}</Text>
        </Box>
        <Box mt="sm">
          <Button outline size="sm" w="70%" onPress={navigateToEditProfile}>
            {t('profile:edit_profile')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

// all this messy shit was because of some unexpected rerender after logout.
// When logout action dispatched it changes isAuthenticated flag,
// Navigator whould handle it and show the Auth screen,
// but somehow before showing Auth screen this component rerenders
// and the fucking error appears. I'm almost sure it's react-navigation bug.
const UserDetailsWrapper = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  if (!isAuthenticated) {
    return null;
  }
  return <UserDetails />;
};

export default memo(UserDetailsWrapper);
