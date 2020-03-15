import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useRoute, RouteProp } from '@react-navigation/native';
import ColorPalette from 'react-native-color-palette';
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage } from 'react-native-flash-message';

import CAR_COLORS from '@app/constants/carColors';
import { Container, Content, Input, Layout, Button } from '@app/components';
import { Car } from '@app/models/Car';
import { useAsyncFn } from '@app/hooks';
import api from '@app/api';
import { RootState } from '@app/redux/rootReducer';
import { fetchBrandsAndModels } from '@app/redux/ducks/brandsModels/actions';
import CarIcon from '@app/assets/car.svg';
// import validation from './validation';
import CarMakeInput from './CarMakeInput';
import CarModelInput from './CarModalInput';

type InputValues = {
  carNumber: string;
  color: string;
  make: string;
  makePk: string;
  model: string;
  modelPk: string;
};

const initialValues: Partial<InputValues> = {
  color: CAR_COLORS[0],
};

type RoutePropType = RouteProp<{ 'Profile:AddEditCar': Car }, 'Profile:AddEditCar'>;

const ProfileAddEditCar: React.FC = () => {
  const { params } = useRoute<RoutePropType>();
  console.log(params);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBrandsAndModels());
  }, [dispatch]);

  const brandsModels = useSelector((state: RootState) => state.brandsModels);

  const [{ error }, addCar] = useAsyncFn(api.addCar);

  useEffect(() => {
    error &&
      showMessage({
        message: error?.response?.data,
        type: 'danger',
      });
  }, [error]);

  const formik = useFormik({
    initialValues: params || initialValues,
    // validationSchema: validation,
    onSubmit: values => {
      const valuesToSend = {
        carNumber: values.carNumber,
        carModel: values.modelPk,
        color: values.color,
      };
      addCar(valuesToSend)
        .then(res => console.log(res))
        .catch(e => console.log(e));
    },
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

        <CarMakeInput
          formik={formik}
          brands={brandsModels.data.brands}
          loading={brandsModels.loading}
        />

        <CarModelInput
          formik={formik}
          models={brandsModels.data.models}
          loading={brandsModels.loading}
          selectedBrandId={formik.values.makePk}
        />

        <Layout layout="row" align="center">
          <Layout spacer={{ r: 'md' }} size={0.7}>
            <Input.Label>Color</Input.Label>
            <ColorPalette
              onChange={(color: string) => formik.setFieldValue('color', color)}
              value={formik.values.color}
              defaultColor={CAR_COLORS[0]}
              colors={CAR_COLORS}
              title={null}
              icon={<Icon name="ios-checkmark" size={28} color="white" />}
              paletteStyles={styles.colorsWrapper}
            />
          </Layout>
          <Layout size={0.3}>
            <CarIcon height={100} color={formik.values.color} />
          </Layout>
        </Layout>

        <Layout align="center" spacer={{ t: 'xl', y: 'md' }}>
          <Button wide shape="circle" onPress={formik.handleSubmit}>
            Save
          </Button>
        </Layout>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  colorsWrapper: {
    justifyContent: 'space-between',
  },
});

export default ProfileAddEditCar;
