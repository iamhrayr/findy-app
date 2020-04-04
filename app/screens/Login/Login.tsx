import React, { useCallback, memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { login } from '@app/redux/ducks/auth/actions';
import { getLoginStatus } from '@app/redux/ducks/auth/selectors';
// import { RootState } from '@app/redux/rootReducer';
import { Button, Text, Container, Layout, Input, Content } from '@app/components';
import LoginImage from './LoginImage';
// import validation from './validation';

type FormValues = {
  phoneNumber: string;
  password: string;
};

const initialValues: FormValues = {
  phoneNumber: '37498999590',
  password: '123456',
};

const Login: React.FC = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loginStatus = useSelector(getLoginStatus);

  const navigateToRegister = useCallback(() => {
    navigation.navigate('Auth:Register');
  }, [navigation]);

  const navigateToForgot = useCallback(() => {
    navigation.navigate('Auth:ForgotPassword');
  }, [navigation]);

  const formik = useFormik({
    initialValues,
    // validationSchema: validation,
    onSubmit: values => {
      dispatch(login(values));
    },
  });

  return (
    <Container>
      <Content noPadding>
        <Layout grow={1}>
          <LoginImage />
        </Layout>

        <Layout spacer={{ x: 'lg', b: 'lg' }}>
          <Text size="giant" spacer={{ b: 'xl' }}>
            {t('login')}
          </Text>

          <Input
            label={t('phone_number')}
            placeholder="+374 98999590"
            onChangeText={val => formik.setFieldValue('phoneNumber', val)}
            value={formik.values.phoneNumber}
            errorMessage={
              (formik.touched.phoneNumber && formik.errors.phoneNumber) ||
              loginStatus.error?.phoneNumber
            }
          />

          <Input
            secureTextEntry
            label={t('password')}
            placeholder="*******"
            onChangeText={val => formik.setFieldValue('password', val)}
            value={formik.values.password}
            addonRight={
              <Text align="right" size="sm" color="primary" onPress={navigateToForgot}>
                {t('auth:login.forgot_password_text')}
              </Text>
            }
            errorMessage={
              (formik.touched.password && formik.errors.password) ||
              loginStatus.error?.password ||
              loginStatus.error?.nonFieldErrors
            }
          />

          <Layout align="center" spacer={{ y: 'md' }}>
            <Button
              wide
              shape="circle"
              loading={loginStatus.loading}
              onPress={formik.handleSubmit}>
              {t('login')}
            </Button>
          </Layout>

          <Text align="center">
            <Text align="center">{t('auth:login.new_user')} </Text>
            <Text align="center" color="primary" onPress={navigateToRegister}>
              {t('auth:login.register_text')}
            </Text>
          </Text>
        </Layout>
      </Content>
    </Container>
  );
};

export default memo(Login);
