import React, { useCallback, memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView } from 'react-native';
import { Button, Box, Text, Input } from 'react-native-magnus';

import { login } from '@app/redux/ducks/auth/actions';
import { getLoginStatus } from '@app/redux/ducks/auth/selectors';
// import { RootState } from '@app/redux/rootReducer';
// import { Input as InputOld } from '@app/components';
import { withInteractionsComplete } from '@app/HoCs';
import LoginImage from './LoginImage';
// import validation from './validation';

type FormValues = {
  phoneNumber: string;
  password: string;
};

const initialValues: FormValues = {
  phoneNumber: '',
  password: '',
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
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Box flex={1}>
        <Box flex={1} justifyContent="space-between">
          <LoginImage />
        </Box>

        <Box mx="xl" mb="xl">
          <Text fontSize={62} mb="2xl">
            {t('login')}
          </Text>

          <Text
            fontSize="lg"
            mb="sm"
            textTransform="uppercase"
            color="gray500"
            fontWeight="600">
            {t('phone_number')}
          </Text>
          <Input
            // label={t('phone_number')}
            mb="2xl"
            borderColor="transparent"
            bg="transparent"
            borderBottomColor="gray400"
            px="none"
            borderBottomWidth={1}
            placeholder="+374 XXXXXXXX"
            onChangeText={(val) => formik.setFieldValue('phoneNumber', val)}
            value={formik.values.phoneNumber}
            errorMessage={
              (formik.touched.phoneNumber && formik.errors.phoneNumber) ||
              loginStatus.error?.phoneNumber
            }
          />

          <Text
            fontSize="lg"
            mb="sm"
            textTransform="uppercase"
            color="gray500"
            fontWeight="600">
            {t('password')}
          </Text>
          <Input
            secureTextEntry
            mb="2xl"
            // label={t('password')}
            borderColor="transparent"
            bg="transparent"
            borderBottomColor="gray400"
            px="none"
            borderBottomWidth={1}
            placeholder="*******"
            onChangeText={(val) => formik.setFieldValue('password', val)}
            value={formik.values.password}
            suffix={
              <Text
                textAlign="right"
                fontSize="lg"
                color="primary"
                onPress={navigateToForgot}>
                {t('auth:login.forgot_password_text')}
              </Text>
            }
            errorMessage={
              (formik.touched.password && formik.errors.password) ||
              loginStatus.error?.password ||
              loginStatus.error?.nonFieldErrors
            }
          />

          <Box justifyContent="center" my="lg" flexDir="row">
            <Button
              minW="60%"
              mb="xl"
              textTransform="uppercase"
              rounded="circle"
              fontSize="xl"
              onPress={navigateToRegister}>
              {t('login')}
            </Button>
          </Box>

          <Box justifyContent="center" flexDir="row">
            <Text textAlign="center" fontSize="xl" mr="sm">
              {t('auth:login.new_user')}
            </Text>
            <Text
              textAlign="center"
              color="primary"
              fontSize="xl"
              onPress={navigateToRegister}>
              {t('auth:login.register_text')}
            </Text>
          </Box>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default withInteractionsComplete(memo(Login));
