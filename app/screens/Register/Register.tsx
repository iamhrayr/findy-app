import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Text, Container, Layout, Input, Content } from '@app/components';
import RegisterImage from './RegisterImage';
// import validation from './validation';
import { register } from '@app/redux/ducks/auth/actions';
import { RootState } from '@app/redux/rootReducer';

type FormValues = {
  fullName: string;
  phoneNumber: string;
  password: string;
};

const initialValues: FormValues = {
  fullName: 'Hrayr Movsisyan',
  phoneNumber: '37498999590',
  password: '123456',
};

const Register: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const navigateToLogin = useCallback(() => {
    navigation.navigate('Auth:Login');
  }, [navigation]);

  const formik = useFormik({
    initialValues,
    // validationSchema: validation,
    onSubmit: values => {
      console.log('values', values);
      dispatch(register(values));
    },
  });

  return (
    <Container>
      <Content extraPadded>
        <Layout grow={1}>
          <RegisterImage />
        </Layout>

        <Layout>
          <Text size="giant" spacer={{ b: 'xl' }}>
            Register
          </Text>

          <Input
            label="Phone Number"
            placeholder="+374 98999590"
            onChangeText={val => formik.setFieldValue('phoneNumber', val)}
            value={formik.values.phoneNumber}
            errorMessage={
              (formik.touched.phoneNumber && formik.errors.phoneNumber) ||
              auth.error.register.phoneNumber
            }
          />
          <Input
            label="Full Name"
            placeholder="Samuel Jackson"
            onChangeText={val => formik.setFieldValue('fullName', val)}
            value={formik.values.fullName}
            errorMessage={formik.touched.fullName && formik.errors.fullName}
          />
          <Input
            secureTextEntry
            label="Password"
            placeholder="*******"
            onChangeText={val => formik.setFieldValue('password', val)}
            value={formik.values.password}
            errorMessage={
              (formik.touched.password && formik.errors.password) ||
              auth.error.register.password
            }
          />

          <Layout align="center" spacer={{ y: 'md' }}>
            <Button onPress={formik.handleSubmit} shape="circle" wide>
              Register
            </Button>
          </Layout>

          <Text align="center">
            <Text align="center">New user? </Text>
            <Text align="center" color="primary" onPress={navigateToLogin}>
              Login Here
            </Text>
          </Text>
        </Layout>
      </Content>
    </Container>
  );
};

export default Register;
