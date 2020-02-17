import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';

import { Button, Text, Container, Layout, Input, Content } from '@app/components';
import LoginImage from './LoginImage';
import validation from './validation';

type FormValues = {
  phoneNumber: string;
  password: string;
};

const initialValues: FormValues = {
  phoneNumber: '',
  password: '',
};

const Login: React.FC = () => {
  const navigation = useNavigation();

  const navigateToRegister = useCallback(() => {
    navigation.navigate('Auth:Register');
  }, [navigation]);

  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
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
            errorMessage={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <Input
            secureTextEntry
            label="Password"
            placeholder="*******"
            onChangeText={val => formik.setFieldValue('password', val)}
            value={formik.values.password}
            errorMessage={formik.touched.password && formik.errors.password}
          />
          <Layout align="center" spacer={{ y: 'md' }}>
            <Button onPress={formik.handleSubmit} shape="circle" wide>
              Login
            </Button>
          </Layout>

          <Text align="center">
            <Text align="center">New user? </Text>
            <Text align="center" color="primary" onPress={navigateToRegister}>
              Login Here
            </Text>
          </Text>
        </Layout>
      </Content>
    </Container>
  );
};

export default Login;
