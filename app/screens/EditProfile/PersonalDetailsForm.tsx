import React from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

// import { useAsyncFn } from '@app/hooks';
// import api from '@app/api';
import { authSelectors, authActions } from '@app/redux/ducks/auth';
import { Card, Input, Layout, Button, Text } from '@app/components';
// import validation from './validation';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

const PersonalDetailsForm: React.FC = () => {
  // const [{}, editUser] = useAsyncFn(api.editUser);

  const dispatch = useDispatch();

  const user = useSelector(authSelectors.getUser);
  // const fullName = (user?.firstName || '') + ' ' + (user?.lastName || '');

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user!.email,
    },
    // validationSchema: validation,
    onSubmit: values => {
      dispatch(authActions.updateUser(values));
    },
  });

  const { values, setFieldValue, touched, errors, handleSubmit } = formik;

  return (
    <Card>
      <Text size="lg" align="center" spacer={{ b: 'lg' }}>
        Personal Details
      </Text>

      <Input
        label="Full Name"
        placeholder=""
        onChangeText={val => setFieldValue('firstName', val)}
        value={values.firstName}
        errorMessage={touched.firstName && errors.firstName}
      />

      <Input
        label="Full Name"
        placeholder=""
        onChangeText={val => setFieldValue('lastName', val)}
        value={values.lastName}
        errorMessage={touched.lastName && errors.lastName}
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
        value={user!.phoneNumber}
      />

      <Layout align="center" spacer={{ y: 'md' }}>
        <Button wide shape="circle" onPress={handleSubmit}>
          Save
        </Button>
      </Layout>
    </Card>
  );
};

export default PersonalDetailsForm;
