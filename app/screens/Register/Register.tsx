import React, { useCallback, useState, memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useTranslation } from 'react-i18next';
import { Box, Text } from 'react-native-magnus';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button, Input } from '@app/components';
import { withInteractionsComplete } from '@app/HoCs';
// import validation from './validation';
import { register } from '@app/redux/ducks/auth/actions';
import { getRegisterStatus } from '@app/redux/ducks/auth/selectors';
// import { RootState } from '@app/redux/rootReducer';
import RegisterImage from '../Login/LoginImage';

type FormValues = {
  fullName: string;
  phoneNumber: string;
  password: string;
};

const initialValues: FormValues = {
  fullName: '',
  phoneNumber: '',
  password: '',
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
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <Box flex={1}>
        <Box flex={1}>
          <RegisterImage />
        </Box>

        <Box mb="lg" mx="lg">
          <Text fontSize="giant" mb="xl" fontWeight="300">
            {t('register')}
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
              registerStatus.error?.phoneNumber
            }
          />

          <Input
            mb="2xl"
            label={t('full_name')}
            placeholder="Samuel Jackson"
            onChangeText={(val) => formik.setFieldValue('fullName', val)}
            value={formik.values.fullName}
            errorMessage={
              (formik.touched.fullName && formik.errors.fullName) ||
              registerStatus.error?.fullName
            }
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
            errorMessage={
              (formik.touched.password && formik.errors.password) ||
              registerStatus.error?.password
            }
          />

          <Box justifyContent="center" my="lg" flexDir="row">
            <Button
              onPress={formik.handleSubmit}
              loading={registerStatus.loading}
              w="60%">
              {t('register')}
            </Button>
          </Box>

          <Text textAlign="center">
            <Text textAlign="center">{t('auth:register.already_registered')} </Text>
            <Text textAlign="center" color="primary" onPress={navigateToLogin}>
              {t('auth:register.login_text')}
            </Text>
          </Text>
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default withInteractionsComplete(memo(Register));
