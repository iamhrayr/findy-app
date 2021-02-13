import React, { useState, useEffect, memo } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Box, Text } from 'react-native-magnus';

import { Button, Input } from '@app/components';
import { withInteractionsComplete } from '@app/HoCs';
import { useAsyncFn } from '@app/hooks';
import api from '@app/api';
import ResetPasswordImage from './ResetPasswordImage';
import validation from './validation';

type FormValues = {
  token: string;
  password: string;
  confirmPassword: string;
};

const initialValues: FormValues = {
  token: '',
  password: '',
  confirmPassword: '',
};

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [passVisible, setPassVisible] = useState(false);
  const [{ loading, error, res }, resetPassword] = useAsyncFn(api.resetPassword);

  useEffect(() => {
    if (res) {
      showMessage({
        type: 'success',
        message: t('auth:reset_password.success_msg'),
      });

      navigation.navigate('Auth:Login');
    }
  }, [res, navigation, t]);

  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit: (values) => {
      resetPassword(values);
    },
  });

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <Box p="lg" flex={1}>
        <Box flex={1}>
          <ResetPasswordImage />
        </Box>

        <Box mb="lg" mx="lg">
          <Text fontSize="giant" mb="xl" fontWeight="300">
            {t('auth:reset_password.title')}
          </Text>

          <Input
            mb="2xl"
            label={t('auth:reset_password.code_label')}
            placeholder="Code from sms"
            onChangeText={(val) => formik.setFieldValue('token', val)}
            value={formik.values.token}
            errorMessage={error?.token}
          />

          <Input
            mb="2xl"
            secureTextEntry={!passVisible}
            label={t('password')}
            placeholder="*******"
            onChangeText={(val) => formik.setFieldValue('password', val)}
            value={formik.values.password}
            suffix={
              <Icon onPress={() => setPassVisible(!passVisible)} name="eye" size={22} />
            }
            errorMessage={error?.password}
          />

          <Box justifyContent="center" my="lg" flexDir="row">
            <Button onPress={formik.handleSubmit} loading={loading} w="60%">
              {t('submit')}
            </Button>
          </Box>
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default withInteractionsComplete(memo(ResetPassword));
