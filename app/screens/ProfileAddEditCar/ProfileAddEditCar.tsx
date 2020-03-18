import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import ColorPalette from 'react-native-color-palette';
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage } from 'react-native-flash-message';

import CAR_COLORS from '@app/constants/carColors';
import { Container, Content, Input, MaskedInput, Layout, Button } from '@app/components';
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
  makeName: string;
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

  const navigation = useNavigation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBrandsAndModels());
  }, [dispatch]);

  const brandsModels = useSelector((state: RootState) => state.brandsModels);

  const [{ error }, addCar] = useAsyncFn(api.addCar);
  const [{}, editCar] = useAsyncFn(api.editCar);
  const addOrEdit = params.pk ? editCar : addCar;

  useEffect(() => {
    error &&
      showMessage({
        message: error?.response?.data,
        type: 'danger',
      });
  }, [error]);

  const formik = useFormik({
    initialValues: params.pk ? params : initialValues,
    // validationSchema: validation,
    onSubmit: values => {
      const valuesToSend = {
        carNumber: values.carNumber,
        carModel: values.modelPk,
        color: values.color,
      };

      addOrEdit(valuesToSend, params.pk).then(() => navigation.goBack());
    },
  });

  return (
    <Container>
      <Content>
        <MaskedInput
          options={{ mask: '99 AA 999' }}
          label="Car Number"
          placeholder="11 AA 111"
          onChangeText={(val: string) => formik.setFieldValue('carNumber', val)}
          value={formik.values.carNumber}
          autoCapitalize="characters"
          // errorMessage={formik.touched.carNumber && formik.errors.carNumber}
        />

        {/* <TextInputMask type="custom" /> */}

        <CarMakeInput
          formik={formik}
          brands={brandsModels.data.brands}
          loading={brandsModels.loading}
        />

        <CarModelInput
          key={formik.values.makePk}
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
              // defaultColor={CAR_COLORS[0]}
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
