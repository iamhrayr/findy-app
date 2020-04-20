import React, { useState, useEffect, memo } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

import { Button, Text, Container, Layout, Input, Content } from '@app/components';
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
    <Container>
      <Content noPadding full>
        <Layout grow={1}>
          <ResetPasswordImage />
        </Layout>

        <Layout spacer={{ x: 'lg', b: 'lg' }}>
          <Text size="giant" spacer={{ b: 'xl' }}>
            {t('auth:reset_password.title')}
          </Text>

          <Input
            label={t('auth:reset_password.code_label')}
            placeholder="Code from sms"
            onChangeText={(val) => formik.setFieldValue('token', val)}
            value={formik.values.token}
            errorMessage={error?.token}
          />

          <Input
            secureTextEntry={!passVisible}
            label={t('password')}
            placeholder="*******"
            onChangeText={(val) => formik.setFieldValue('password', val)}
            value={formik.values.password}
            addonRight={
              <Icon onPress={() => setPassVisible(!passVisible)} name="eye" size={22} />
            }
            errorMessage={error?.password}
          />

          <Layout align="center" spacer={{ y: 'md' }}>
            <Button wide shape="circle" onPress={formik.handleSubmit} loading={loading}>
              {t('submit')}
            </Button>
          </Layout>
        </Layout>
      </Content>
    </Container>
  );
};

export default withInteractionsComplete(memo(ResetPassword));
