import React, { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import { Input } from '@app/components';
import { Brand } from '@app/types/CarBrandModel';
import CarListSelectModal from './CarListSelectModal';

type Props = {
  formik: any;
  brands: Brand[];
  loading: boolean;
};

const CarMakeInput = ({ formik, brands, loading }: Props) => {
  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleBrandSelect = useCallback(
    (brand: Brand) => {
      setModalVisible(false);
      formik.setFieldValue('makeName', brand.name);
      formik.setFieldValue('makePk', brand.pk);
      formik.setFieldValue('model', '');
      formik.setFieldValue('modelPk', '');
    },
    [formik],
  );

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Input
          pointerEvents="none"
          label={t('profile:car_make_label')}
          placeholder={t('profile:car_make_placeholder')}
          value={formik.values.makeName}
          addonRight={<Icon name="ios-arrow-forward" size={24} />}
          errorMessage={formik.touched.makeName && formik.errors.makeName}
          editable={false}
        />
      </TouchableOpacity>

      <CarListSelectModal
        isVisible={modalVisible}
        close={closeModal}
        onSelect={handleBrandSelect}
        data={brands || []}
        loading={loading}
      />
    </>
  );
};

export default CarMakeInput;
