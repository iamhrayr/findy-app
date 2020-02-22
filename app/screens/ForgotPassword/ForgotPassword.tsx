import React from 'react';
import { useFormik } from 'formik';

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
  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit: () => {},
  });

  return (
    <Container>
      <Content extraPadded>
        <Layout grow={1}>
          <ForgotImage />
        </Layout>

        <Layout>
          <Text size="giant" spacer={{ b: 'xl' }}>
            Forgot Password
          </Text>

          <Input
            label="Phone Number"
            placeholder="+374 98999590"
            onChangeText={val => formik.setFieldValue('phoneNumber', val)}
            value={formik.values.phoneNumber}
            errorMessage={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />

          <Layout align="center" spacer={{ y: 'md' }}>
            <Button wide shape="circle" onPress={formik.handleSubmit}>
              Submit
            </Button>
          </Layout>
        </Layout>
      </Content>
    </Container>
  );
};

export default ForgotPassword;
