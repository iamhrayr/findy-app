import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Box, Text, Toggle } from 'react-native-magnus';

import { Button, Select } from '@app/components';
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

type Option = {
  label: string;
  value: string | number;
};

type FormValues = {
  language: string;
  showPhoneNumber: boolean;
  notificationMethod: string;
};

const NotificationSettings = () => {
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

  const { values, setFieldValue, handleSubmit } = formik;

  const selectedLanguageTitle = values.language
    ? LANGUAGES.find((lng) => lng.value === values.language)?.label
    : 'Select';

  const selectedNotificationTitle = values.notificationMethod
    ? SETTINGS_VALUES.find((lng) => lng.value === values.notificationMethod)?.label
    : 'Select';

  if (settings.loading) {
    <Text>{t('loading')}</Text>;
  }

  return (
    <Box bg="white" p="lg" rounded="lg" shadow="sm">
      <Text fontSize="4xl" textAlign="center" mb="lg">
        {t('profile:settings.notification_title')}
      </Text>

      <Box flexDir="row" alignItems="center" justifyContent="space-between" mb="lg">
        <Text>{t('profile:settings.app_language')}</Text>
        <Select
          onSelect={(val: string) => setFieldValue('language', val)}
          // onSelect={(val: string) => dispatch(changePreferences({ language: val }))}
          value={values.language}
          title="Select language"
          pb="2xl"
          roundedTop="xl"
          data={LANGUAGES}
          renderItem={(item: Option) => (
            <Select.Option value={item.value} py="md">
              <Text>{item.label}</Text>
            </Select.Option>
          )}>
          {selectedLanguageTitle}
        </Select>
      </Box>

      <Box flexDir="row" alignItems="center" justifyContent="space-between" mb="lg">
        <Text>{t('profile:settings.phone_number_label')}</Text>
        <Toggle
          onPress={() => {
            setFieldValue('showPhoneNumber', !values.showPhoneNumber);
          }}
          on={values.showPhoneNumber}
        />
      </Box>

      <Box flexDir="row" alignItems="center" justifyContent="space-between">
        <Text>{t('profile:settings.notification_method_label')}</Text>
        <Select
          onSelect={(val: string) => setFieldValue('notificationMethod', val)}
          value={values.notificationMethod}
          title="Select language"
          pb="2xl"
          roundedTop="xl"
          data={SETTINGS_VALUES}
          renderItem={(item: Option) => (
            <Select.Option value={item.value} py="md">
              <Text>{item.label}</Text>
            </Select.Option>
          )}>
          {selectedNotificationTitle}
        </Select>
      </Box>

      <Button onPress={handleSubmit} alignSelf="center" w="70%" my="lg">
        {t('save')}
      </Button>
    </Box>
  );
};

export default memo(NotificationSettings);
