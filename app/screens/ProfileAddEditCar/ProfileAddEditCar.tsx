import React, { useEffect, memo } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import ColorPalette from 'react-native-color-palette';
// import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage } from 'react-native-flash-message';
import useMount from 'react-use/lib/useMount';
import { useTranslation } from 'react-i18next';
import { Box, Text, Icon } from 'react-native-magnus';

import CAR_COLORS from '@app/constants/carColors';
import { MaskedInput, Button } from '@app/components';
import { withInteractionsComplete } from '@app/HoCs';
import { Car } from '@app/types/Car';
import { useAsyncFn } from '@app/hooks';
import api from '@app/api';
import { RootState } from '@app/redux/rootReducer';
import { fetchBrandsAndModels } from '@app/redux/ducks/brandsModels/actions';
import { editCar, addCar } from '@app/redux/ducks/profile/actions';
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
  const { t } = useTranslation();
  const { params } = useRoute<RoutePropType>();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const brandsModels = useSelector((state: RootState) => state.brandsModels);
  const operation = params?.pk ? api.editCar : api.addCar;

  const [{ loading, error, res }, mutation] = useAsyncFn(operation);

  useMount(() => dispatch(fetchBrandsAndModels()));

  useEffect(() => {
    if (res) {
      params?.pk
        ? dispatch(editCar({ car: res, id: params.pk }))
        : dispatch(addCar({ car: res }));

      showMessage({
        type: 'success',
        message: params?.pk ? t('successfully_updated') : t('successfully_added'),
      });

      navigation.goBack();
    }
  }, [dispatch, navigation, params, res, t]);

  const formik = useFormik({
    initialValues: params?.pk ? params : initialValues,
    onSubmit: (values) => {
      const valuesToSend = {
        carNumber: values.carNumber,
        carModel: values.modelPk,
        color: values.color,
      };

      mutation(valuesToSend, params?.pk);
    },
  });

  return (
    <Box p="lg">
      <Box bg="white" p="lg" rounded="lg">
        <MaskedInput
          options={{ mask: '99 AA 999' }}
          label={t('car_number')}
          placeholder="11 AA 111"
          onChangeText={(val: string) => formik.setFieldValue('carNumber', val)}
          value={formik.values.carNumber}
          autoCapitalize="characters"
          errorMessage={
            (formik.touched.carNumber && formik.errors.carNumber) || error?.carNumber
          }
          mb="2xl"
        />

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

        <Box>
          <Text variant="label">{t('color')}</Text>
          <Box flexDir="row" alignItems="center">
            <Box mr="md" flex={0.7}>
              <ColorPalette
                onChange={(color: string) => formik.setFieldValue('color', color)}
                value={formik.values.color}
                colors={CAR_COLORS}
                title={null}
                icon={
                  <Icon
                    fontFamily="Ionicons"
                    name="ios-checkmark"
                    fontSize={18}
                    color="white"
                  />
                }
                paletteStyles={styles.colorsWrapper}
              />
            </Box>
            <Box flex={0.3}>
              <CarIcon height={100} color={formik.values.color} />
            </Box>
          </Box>
        </Box>

        <Button
          block
          alignSelf="center"
          mt="2xl"
          onPress={formik.handleSubmit}
          loading={loading}>
          {t('save')}
        </Button>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  colorsWrapper: {
    justifyContent: 'space-between',
  },
});

export default withInteractionsComplete(memo(ProfileAddEditCar));
