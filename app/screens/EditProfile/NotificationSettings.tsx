import React, { useEffect } from 'react';
import { Switch, StyleSheet, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Select from 'react-native-picker-select';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import { withTheme, DefaultTheme } from 'styled-components/native';

type FormValues = {
  language: string;
  showPhoneNumber: boolean;
  notificationMethod: string;
};

import { Card, Layout, Text, Spacer, Button } from '@app/components';
import {
  fetchProfileSettings,
  editProfileSettings,
  changePreferences,
} from '@app/redux/ducks/profile/actions';
import {
  getProfileSettings,
  getProfilePreferences,
} from '@app/redux/ducks/profile/selectors';

const SETTINGS_VALUES = [
  { label: 'SMS', value: 'sms' },
  { label: 'Push notification', value: 'app' },
  { label: 'Both', value: 'bh' },
];

const LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'Armenian', value: 'am' },
];

type Props = {
  theme: DefaultTheme;
};

const NotificationSettings = ({ theme }: Props) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const settings = useSelector(getProfileSettings);
  const preferences = useSelector(getProfilePreferences);

  const formik = useFormik<FormValues>({
    initialValues: {
      language: preferences.language,
      showPhoneNumber: settings.data.showPhoneNumber,
      notificationMethod: settings.data.notificationMethod,
    },
    onSubmit: ({ language, ...rest }) => {
      dispatch(editProfileSettings(rest));
      dispatch(changePreferences({ language }));
    },
  });

  useEffect(() => {
    dispatch(fetchProfileSettings());
  }, [dispatch]);

  if (settings.loading) {
    <Text>{t('loading')}</Text>;
  }

  const { values, setFieldValue, handleSubmit } = formik;

  return (
    <Card>
      <Text size="lg" align="center" spacer={{ b: 'lg' }}>
        {t('profile:settings.notification_title')}
      </Text>

      <Layout layout="row" align="center" justify="between">
        <Text>{t('profile:settings.app_language')}</Text>
        <Select
          style={styles}
          useNativeAndroidPickerStyle={false}
          onValueChange={(val) => setFieldValue('language', val)}
          Icon={() => (
            <Icon
              name="arrow-ios-downward-outline"
              width={20}
              height={20}
              fill={theme.colors.gray}
            />
          )}
          value={values.language}
          items={LANGUAGES}
          placeholder={{}}
        />
      </Layout>

      <Spacer b="lg" />

      <Layout layout="row" align="center" justify="between">
        <Text>{t('profile:settings.phone_number_label')}</Text>
        <Switch
          onValueChange={(val) => {
            console.log('asdasdasdasd', val);
            setFieldValue('showPhoneNumber', val);
          }}
          value={values.showPhoneNumber}
        />
      </Layout>

      <Spacer b="lg" />

      <Layout layout="row" align="center" justify="between">
        <Text>{t('profile:settings.notification_method_label')}</Text>
        <Select
          style={styles}
          useNativeAndroidPickerStyle={false}
          onValueChange={(val) => setFieldValue('notificationMethod', val)}
          Icon={() => (
            <Icon
              name="arrow-ios-downward-outline"
              width={20}
              height={20}
              fill={theme.colors.gray}
            />
          )}
          value={values.notificationMethod}
          items={SETTINGS_VALUES}
          placeholder={{}}
        />
      </Layout>

      <Layout align="center" spacer={{ t: 'lg' }}>
        <Button wide shape="circle" onPress={handleSubmit}>
          {t('save')}
        </Button>
      </Layout>
    </Card>
  );
};

const styles = StyleSheet.create({
  inputIOS: { paddingRight: 20 },
  inputAndroid: { paddingRight: 20 },
  iconContainer: { bottom: 14, ...Platform.select({ android: {}, ios: { top: -2 } }) },
});

export default withTheme(NotificationSettings);
