import React, { useCallback, memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Box, Text } from 'react-native-magnus';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { useQuery, useMutation } from 'react-query';

// import api from '@app/api';
import { login } from '@app/redux/ducks/auth/actions';
import { getLoginStatus } from '@app/redux/ducks/auth/selectors';
import { Input } from '@app/components';
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

  // const { mutate, error, isLoading } = useMutation(api.login);

  const formik = useFormik({
    initialValues,
    // validationSchema: validation,
    onSubmit: (values) => {
      dispatch(login(values));
      // mutate(values);
    },
  });

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <Box flex={1}>
        <Box flex={1}>
          <LoginImage />
        </Box>

        <Box mx="xl" mb="xl">
          <Text fontSize="giant" mb="2xl" fontWeight="300">
            {t('login')}
          </Text>

          <Input
            mb="2xl"
            label={t('phone_number')}
            placeholder="+374 XXXXXXXX"
            keyboardType="phone-pad"
            onChangeText={(val) => formik.setFieldValue('phoneNumber', val)}
            value={formik.values.phoneNumber}
            errorMessage={
              (formik.touched.phoneNumber && formik.errors.phoneNumber) ||
              loginStatus.error?.phoneNumber
            }
          />

          <Input
            secureTextEntry
            label={t('password')}
            mb="2xl"
            placeholder="*******"
            onChangeText={(val) => formik.setFieldValue('password', val)}
            value={formik.values.password}
            suffix={
              <Text fontSize="lg" color="primary" onPress={navigateToForgot}>
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
              onPress={formik.handleSubmit}
              loading={loginStatus.loading}>
              {t('login')}
            </Button>
          </Box>

          <Box justifyContent="center" flexDir="row">
            <Text textAlign="center" mr="sm">
              {t('auth:login.new_user')}
            </Text>
            <Text textAlign="center" color="primary" onPress={navigateToRegister}>
              {t('auth:login.register_text')}
            </Text>
          </Box>
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default withInteractionsComplete(memo(Login));
