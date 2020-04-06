import React from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { Button, Text, Container, Layout, Input, Content } from '@app/components';
import ForgotImage from './ForgotImage';
import validation from './validation';

type FormValues = {
  phoneNumber: string;
};

const initialValues: FormValues = {
  phoneNumber: '',
};

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit: () => {},
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
            placeholder="+374 98999590"
            onChangeText={val => formik.setFieldValue('phoneNumber', val)}
            value={formik.values.phoneNumber}
            errorMessage={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />

          <Layout align="center" spacer={{ y: 'md' }}>
            <Button wide shape="circle" onPress={formik.handleSubmit}>
              {t('submit')}
            </Button>
          </Layout>
        </Layout>
      </Content>
    </Container>
  );
};

export default ForgotPassword;
