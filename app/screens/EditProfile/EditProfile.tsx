import React from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import { authSelectors } from '@app/redux/ducks/auth';
import { Container, Content, Input, Layout, Button } from '@app/components';
import validation from './validation';

// import { Avatar, Layout, Text, Button } from '@app/components';

// type FormValues = {
//   avatar: null | Image;
//   fullName: string;
//   email: string;
// };

// const initialValues: FormValues = {
//   avatar: null,
//   fullName: '',
//   email: '',
// };

const EditProfile: React.FC = () => {
  const user = useSelector(authSelectors.getUser);
  const fullName = (user?.firstName || '') + ' ' + (user?.lastName || '');

  const formik = useFormik({
    initialValues: {
      fullName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
    },
    validationSchema: validation,
    onSubmit: () => {},
  });

  const { values, setFieldValue, touched, errors, handleSubmit } = formik;

  return (
    <Container>
      <Content>
        <Input
          label="Full Name"
          placeholder=""
          onChangeText={val => setFieldValue('fullName', val)}
          value={values.fullName}
          errorMessage={touched.fullName && errors.fullName}
        />

        <Input
          label="Email"
          placeholder=""
          onChangeText={val => setFieldValue('email', val)}
          value={values.email}
          errorMessage={touched.email && errors.email}
        />

        <Input
          editable={false}
          label="Phone Number"
          placeholder=""
          onChangeText={val => setFieldValue('phoneNumber', val)}
          value={values.phoneNumber}
          errorMessage={touched.phoneNumber && errors.phoneNumber}
        />

        <Layout align="center" spacer={{ y: 'md' }}>
          <Button wide shape="circle" onPress={handleSubmit}>
            Save
          </Button>
        </Layout>
      </Content>
    </Container>
  );
};

export default EditProfile;
