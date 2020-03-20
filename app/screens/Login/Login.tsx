import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Text, Container, Layout, Input, Content } from '@app/components';
import LoginImage from './LoginImage';
import validation from './validation';
import { login } from '@app/redux/ducks/auth/actions';
import { RootState } from '@app/redux/rootReducer';

type FormValues = {
  phoneNumber: string;
  password: string;
};

const initialValues: FormValues = {
  phoneNumber: '37498999590',
  password: '123456',
};

const Login: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const navigateToRegister = useCallback(() => {
    navigation.navigate('Auth:Register');
  }, [navigation]);

  const navigateToForgot = useCallback(() => {
    navigation.navigate('Auth:ForgotPassword');
  }, [navigation]);

  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit: values => {
      dispatch(login(values));
    },
  });

  return (
    <Container>
      <Content extraPadded>
        <Layout grow={1}>
          <LoginImage />
        </Layout>

        <Layout>
          <Text size="giant" spacer={{ b: 'xl' }}>
            Login
          </Text>

          <Input
            label="Phone Number"
            placeholder="+374 98999590"
            onChangeText={val => formik.setFieldValue('phoneNumber', val)}
            value={formik.values.phoneNumber}
            errorMessage={
              (formik.touched.phoneNumber && formik.errors.phoneNumber) ||
              auth.error.login.phoneNumber
            }
          />

          <Input
            secureTextEntry
            label="Password"
            placeholder="*******"
            onChangeText={val => formik.setFieldValue('password', val)}
            value={formik.values.password}
            addonRight={
              <Text align="right" size="sm" color="primary" onPress={navigateToForgot}>
                Forgot?
              </Text>
            }
            errorMessage={
              (formik.touched.password && formik.errors.password) ||
              auth.error.login.password ||
              auth.error.login.nonFieldErrors
            }
          />

          <Layout align="center" spacer={{ y: 'md' }}>
            <Button
              wide
              shape="circle"
              loading={auth.isAuthenticating}
              onPress={formik.handleSubmit}>
              Login
            </Button>
          </Layout>

          <Text align="center">
            <Text align="center">New user? </Text>
            <Text align="center" color="primary" onPress={navigateToRegister}>
              Register Here
            </Text>
          </Text>
        </Layout>
      </Content>
    </Container>
  );
};

export default Login;
