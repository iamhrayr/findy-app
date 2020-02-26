import React from 'react';
import { useFormik } from 'formik';

import { Container, Content, Input, Layout, Button } from '@app/components';
import validation from './validation';

type FormValues = {
  carNumber: string;
  carModel: string;
  color: string;
};

const initialValues: FormValues = {
  carNumber: '',
  carModel: '',
  color: '',
};

const ProfileAddEditCar: React.FC = () => {
  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit: () => {},
  });

  return (
    <Container>
      <Content>
        <Input
          label="Car Number"
          placeholder=""
          onChangeText={val => formik.setFieldValue('carNumber', val)}
          value={formik.values.carNumber}
          errorMessage={formik.touched.carNumber && formik.errors.carNumber}
        />

        <Input
          label="Car Model"
          placeholder=""
          onChangeText={val => formik.setFieldValue('carModel', val)}
          value={formik.values.carModel}
          errorMessage={formik.touched.carModel && formik.errors.carModel}
        />

        <Input
          label="Color"
          placeholder=""
          onChangeText={val => formik.setFieldValue('color', val)}
          value={formik.values.color}
          errorMessage={formik.touched.color && formik.errors.color}
        />

        <Layout align="center" spacer={{ y: 'md' }}>
          <Button wide shape="circle" onPress={formik.handleSubmit}>
            Save
          </Button>
        </Layout>
      </Content>
    </Container>
  );
};

export default ProfileAddEditCar;
