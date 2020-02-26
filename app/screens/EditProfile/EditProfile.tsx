import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import ImagePicker, { Image } from 'react-native-image-crop-picker';

import { Container, Content, Input, Layout, Avatar, Button } from '@app/components';
import validation from './validation';

type FormValues = {
  avatar: null | Image;
  fullName: string;
  phoneNumber: string;
};

const initialValues: FormValues = {
  avatar: null,
  fullName: '',
  phoneNumber: '',
};

const EditProfile: React.FC = () => {
  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit: () => {},
  });

  const handleAvatarPress = useCallback(() => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'photo',
      cropping: true,
      includeBase64: true,
    }).then(image => {
      // console.log(image);
      formik.setFieldValue('avatar', image);
    });
  }, [formik]);

  const { values, setFieldValue, touched, errors, handleSubmit } = formik;

  return (
    <Container>
      <Content>
        <Layout align="center" spacer={{ b: 'lg' }}>
          <Avatar
            clickable
            onPress={handleAvatarPress}
            source={
              values.avatar && {
                uri: `data:${values.avatar.mime};base64,${values.avatar.data}`,
              }
            }
          />
        </Layout>

        <Input
          label="Full Name"
          placeholder=""
          onChangeText={val => setFieldValue('fullName', val)}
          value={values.fullName}
          errorMessage={touched.fullName && errors.fullName}
        />

        <Input
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
