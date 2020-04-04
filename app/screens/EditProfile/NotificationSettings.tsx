import React, { useCallback, useEffect, memo } from 'react';
import { Switch, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-native-picker-select';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';

// import api from '@app/api';
import { Card, Layout, Text, Spacer } from '@app/components';
// import { useAsyncFn } from '@app/hooks';
import {
  fetchProfileSettings,
  updateProfileSettings,
  changePreferences,
} from '@app/redux/ducks/profile/actions';
import {
  getProfileSettings,
  getProfilePreferences,
} from '@app/redux/ducks/profile/selectors';

const SELECT_VALUES = [
  { label: 'SMS', value: 'sms' },
  { label: 'Push notification', value: 'app' },
  { label: 'Both', value: 'both' },
];

const LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'Armenian', value: 'am' },
];

const NotificationSettings = () => {
  // const [{ loading: fetchSettingsLoading }, fetchSettings] = useAsyncFn(
  //   api.fetchProfileSettings,
  // );
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const settings = useSelector(getProfileSettings);
  const preferences = useSelector(getProfilePreferences);

  useEffect(() => {
    dispatch(fetchProfileSettings());
  }, [dispatch]);

  const handlePhoneNumberChange = useCallback(
    showPhoneNumber => {
      dispatch(
        updateProfileSettings({
          showPhoneNumber,
        }),
      );
    },
    [dispatch],
  );

  const handleNotificationChange = useCallback(
    notificationMethod => {
      dispatch(
        updateProfileSettings({
          notificationMethod,
        }),
      );
    },
    [dispatch],
  );

  const handleLanguageChange = useCallback(
    language => {
      dispatch(
        changePreferences({
          language,
        }),
      );
    },
    [dispatch],
  );

  if (settings.loading) {
    <Text>{t('loading')}</Text>;
  }

  return (
    <Card>
      <Text size="lg" align="center" spacer={{ b: 'lg' }}>
        {t('profile:settings.notification_title')}
      </Text>

      <Layout layout="row" align="center" justify="between">
        <Text>{t('profile:settings.app_language')}</Text>
        <Select
          style={styles}
          onValueChange={handleLanguageChange}
          Icon={() => <Icon name="arrow-ios-downward-outline" width={20} height={20} />}
          value={preferences.language}
          items={LANGUAGES}
        />
      </Layout>

      <Spacer b="lg" />

      <Layout layout="row" align="center" justify="between">
        <Text>{t('profile:settings.phone_number_label')}</Text>
        <Switch
          onValueChange={handlePhoneNumberChange}
          value={settings.data.showPhoneNumber}
        />
      </Layout>

      <Spacer b="lg" />

      <Layout layout="row" align="center" justify="between">
        <Text>{t('profile:settings.notification_method_label')}</Text>
        <Select
          style={styles}
          onValueChange={handleNotificationChange}
          Icon={() => <Icon name="arrow-ios-downward-outline" width={20} height={20} />}
          value={settings.data.notificationMethod}
          items={SELECT_VALUES}
        />
      </Layout>
    </Card>
  );
};

const styles = StyleSheet.create({
  inputIOS: { paddingRight: 20 },
  inputAndroid: { paddingRight: 20 },
  iconContainer: { bottom: -1 },
});

export default memo(NotificationSettings);
