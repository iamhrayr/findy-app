import React, { memo } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const user = useSelector(authSelectors.getUser);
  // const fullName = (user?.firstName || '') + ' ' + (user?.lastName || '');

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    },
    // validationSchema: validation,
    onSubmit: (values) => {
      dispatch(authActions.updateUser(values));
    },
  });

  const { values, setFieldValue, touched, errors, handleSubmit } = formik;

  return (
    <Card>
      <Text size="lg" align="center" spacer={{ b: 'lg' }}>
        {t('profile:settings.personal_details_title')}
      </Text>

      <Input
        label={t('first_name')}
        placeholder=""
        onChangeText={(val) => setFieldValue('firstName', val)}
        value={values.firstName}
        errorMessage={touched.firstName && errors.firstName}
      />

      <Input
        label={t('last_name')}
        placeholder=""
        onChangeText={(val) => setFieldValue('lastName', val)}
        value={values.lastName}
        errorMessage={touched.lastName && errors.lastName}
      />

      <Input
        label={t('email')}
        placeholder=""
        onChangeText={(val) => setFieldValue('email', val)}
        value={values.email}
        errorMessage={touched.email && errors.email}
      />

      <Input
        editable={false}
        label={t('phone_number')}
        placeholder=""
        value={user!.phoneNumber}
        addonRight={
          <Text align="right" size="sm" color="gray">
            {t('profile:not_editable')}
          </Text>
        }
      />

      <Layout align="center" spacer={{ y: 'md' }}>
        <Button wide shape="circle" onPress={handleSubmit}>
          {t('save')}
        </Button>
      </Layout>
    </Card>
  );
};

export default memo(PersonalDetailsForm);
