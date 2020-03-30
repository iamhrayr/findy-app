import React, { useCallback, useState, memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useTranslation } from 'react-i18next';

import { Button, Text, Container, Layout, Input, Content } from '@app/components';
// import validation from './validation';
import { register } from '@app/redux/ducks/auth/actions';
import { getRegisterStatus } from '@app/redux/ducks/auth/selectors';
// import { RootState } from '@app/redux/rootReducer';
import RegisterImage from './RegisterImage';

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
  const { t } = useTranslation();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const registerStatus = useSelector(getRegisterStatus);
  // const auth = useSelector((state: RootState) => state.auth);

  const [passVisible, setPassVisible] = useState(false);

  const navigateToLogin = useCallback(() => {
    navigation.navigate('Auth:Login');
  }, [navigation]);

  const formik = useFormik({
    initialValues,
    // validationSchema: validation,
    onSubmit: values => {
      dispatch(register(values));
    },
  });

  return (
    <Container>
      <Content noPadding>
        <Layout grow={1}>
          <RegisterImage />
        </Layout>

        <Layout spacer={{ x: 'lg', b: 'lg' }}>
          <Text size="giant" spacer={{ b: 'xl' }}>
            {t('register')}
          </Text>

          <Input
            label={t('phone_number')}
            placeholder="+374 98999590"
            onChangeText={val => formik.setFieldValue('phoneNumber', val)}
            value={formik.values.phoneNumber}
            errorMessage={
              (formik.touched.phoneNumber && formik.errors.phoneNumber) ||
              registerStatus.error?.phoneNumber
            }
          />
          <Input
            label={t('full_name')}
            placeholder="Samuel Jackson"
            onChangeText={val => formik.setFieldValue('fullName', val)}
            value={formik.values.fullName}
            errorMessage={formik.touched.fullName && formik.errors.fullName}
          />
          <Input
            secureTextEntry={!passVisible}
            label={t('password')}
            placeholder="*******"
            onChangeText={val => formik.setFieldValue('password', val)}
            value={formik.values.password}
            addonRight={
              <Icon onPress={() => setPassVisible(!passVisible)} name="eye" size={22} />
            }
            errorMessage={
              (formik.touched.password && formik.errors.password) ||
              registerStatus.error?.password
            }
          />

          <Layout align="center" spacer={{ y: 'md' }}>
            <Button
              onPress={formik.handleSubmit}
              shape="circle"
              loading={registerStatus.loading}
              wide>
              {t('register')}
            </Button>
          </Layout>

          <Text align="center">
            <Text align="center">{t('auth:register.already_registered')} </Text>
            <Text align="center" color="primary" onPress={navigateToLogin}>
              {t('auth:register.login_text')}
            </Text>
          </Text>
        </Layout>
      </Content>
    </Container>
  );
};

export default memo(Register);
