import React, { useEffect, memo } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Box, Text } from 'react-native-magnus';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button, Input } from '@app/components';
import { withInteractionsComplete } from '@app/HoCs';
import { useAsyncFn } from '@app/hooks';
import api from '@app/api';
import ForgotImage from './ForgotImage';

type FormValues = {
  phoneNumber: string;
};

const initialValues: FormValues = {
  phoneNumber: '',
};

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [{ loading, error, res }, forgotPassword] = useAsyncFn(api.forgotPassword);

  useEffect(() => {
    res && navigation.navigate('Auth:ResetPassword');
  }, [res, navigation]);

  const formik = useFormik({
    initialValues,
    onSubmit: forgotPassword,
  });

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <Box flex={1}>
        <Box flex={1}>
          <ForgotImage />
        </Box>

        <Box mx="lg" mb="lg">
          <Text fontSize="giant" mb="xl" fontWeight="300">
            {t('auth:forgot_password.title')}
          </Text>

          <Input
            mb="2xl"
            label={t('phone_number')}
            placeholder="+374 XX XXXXXX"
            keyboardType="phone-pad"
            onChangeText={(val) => formik.setFieldValue('phoneNumber', val)}
            value={formik.values.phoneNumber}
            errorMessage={error?.phoneNumber}
          />

          <Box justifyContent="center" flexDir="row" mb="xl">
            <Button w="60%" onPress={formik.handleSubmit} loading={loading}>
              {t('submit')}
            </Button>
          </Box>
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default withInteractionsComplete(memo(ForgotPassword));
