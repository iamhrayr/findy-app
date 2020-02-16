import React from 'react';
// import { useNavigation } from '@react-navigation/native';
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
  // const navigation = useNavigation();

  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    validateOnChange: false,
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
            errorMessage={formik.errors.phoneNumber}
          />
          <Input
            secureTextEntry
            label="Password"
            placeholder="*******"
            onChangeText={val => formik.setFieldValue('password', val)}
            value={formik.values.password}
            errorMessage={formik.errors.password}
          />
          <Layout align="center" spacer={{ y: 'md' }}>
            <Button onPress={formik.handleSubmit} shape="circle" wide>
              Login
            </Button>
          </Layout>

          <Text align="center">
            <Text align="center">New user? </Text>
            <Text align="center" color="primary">
              Login Here
            </Text>
          </Text>
        </Layout>
      </Content>
    </Container>
  );
};

export default Login;
