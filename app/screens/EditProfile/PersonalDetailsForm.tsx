import React, { memo } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Text, Button } from 'react-native-magnus';

// import { useAsyncFn } from '@app/hooks';
// import api from '@app/api';
import { authSelectors, authActions } from '@app/redux/ducks/auth';
import { Input } from '@app/components';
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
    <Box bg="white" p="lg" rounded="lg" shadow="sm">
      <Text fontSize="4xl" textAlign="center" mb="lg">
        {t('profile:settings.personal_details_title')}
      </Text>

      <Input
        mb="lg"
        label={t('first_name')}
        placeholder=""
        onChangeText={(val) => setFieldValue('firstName', val)}
        value={values.firstName}
        errorMessage={touched.firstName && errors.firstName}
      />

      <Input
        mb="lg"
        label={t('last_name')}
        onChangeText={(val) => setFieldValue('lastName', val)}
        value={values.lastName}
        errorMessage={touched.lastName && errors.lastName}
      />

      <Input
        mb="lg"
        label={t('email')}
        onChangeText={(val) => setFieldValue('email', val)}
        value={values.email}
        errorMessage={touched.email && errors.email}
      />

      <Input
        mb="lg"
        editable={false}
        label={t('phone_number')}
        value={user!.phoneNumber}
        suffix={
          <Text textAlign="right" fontSize="md" color="gray">
            {t('profile:not_editable')}
          </Text>
        }
      />

      <Button alignSelf="center" w="60%" onPress={handleSubmit} my="lg">
        {t('save')}
      </Button>
    </Box>
  );
};

export default memo(PersonalDetailsForm);
