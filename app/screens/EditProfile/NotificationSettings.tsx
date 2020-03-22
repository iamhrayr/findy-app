import React, { useCallback, useEffect } from 'react';
import { Switch, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-native-picker-select';
import { Icon } from 'react-native-eva-icons';

// import api from '@app/api';
import { Card, Layout, Text, Spacer } from '@app/components';
// import { useAsyncFn } from '@app/hooks';
import {
  fetchProfileSettings,
  updateProfileSettings,
} from '@app/redux/ducks/profile/actions';
import { getProfileSettings } from '@app/redux/ducks/profile/selectors';

const SELECT_VALUES = [
  { label: 'SMS', value: 'sms' },
  { label: 'Push notification', value: 'app' },
  { label: 'Both', value: 'both' },
];

const NotificationSettings = () => {
  // const [{ loading: fetchSettingsLoading }, fetchSettings] = useAsyncFn(
  //   api.fetchProfileSettings,
  // );

  const dispatch = useDispatch();
  const settings = useSelector(getProfileSettings);

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

  if (settings.loading) {
    <Text>Loading...</Text>;
  }

  return (
    <Card>
      <Text size="lg" align="center" spacer={{ b: 'lg' }}>
        Notification Settings
      </Text>

      <Layout layout="row" align="center" justify="between">
        <Text>Show phone number</Text>
        <Switch
          onValueChange={handlePhoneNumberChange}
          value={settings.data.showPhoneNumber}
        />
      </Layout>

      <Spacer b="lg" />

      <Layout layout="row" align="center" justify="between">
        <Text>Notification method</Text>
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

export default NotificationSettings;
