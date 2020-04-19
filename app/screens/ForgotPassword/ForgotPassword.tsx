import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { Button, Text, Container, Layout, Input, Content } from '@app/components';
import { withInteractionsComplete } from '@app/HoCs';
import { useAsyncFn } from '@app/hooks';
import api from '@app/api';
import ForgotImage from './ForgotImage';

type FormValues = {
  phoneNumber: string;
};

const initialValues: FormValues = {
  phoneNumber: '',
};

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [{ loading, error, res }, forgotPassword] = useAsyncFn(api.forgotPassword);

  useEffect(() => {
    res && navigation.navigate('Auth:ResetPassword');
  }, [res, navigation]);

  const formik = useFormik({
    initialValues,
    onSubmit: forgotPassword,
  });

  return (
    <Container>
      <Content noPadding full>
        <Layout grow={1}>
          <ForgotImage />
        </Layout>

        <Layout spacer={{ x: 'lg', b: 'lg' }}>
          <Text size="giant" spacer={{ b: 'xl' }}>
            {t('auth:forgot_password.title')}
          </Text>

          <Input
            label={t('phone_number')}
            placeholder="+374 XX XXXXXX"
            onChangeText={(val) => formik.setFieldValue('phoneNumber', val)}
            value={formik.values.phoneNumber}
            errorMessage={error?.phoneNumber}
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

export default withInteractionsComplete(ForgotPassword);
