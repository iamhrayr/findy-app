import React, { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Input } from '@app/components';
import { Brand } from '@app/models/CarBrandModel';
import CarListSelectModal from './CarListSelectModal';

type Props = {
  formik: any;
  brands: Brand[];
  loading: boolean;
};

const CarMakeInput = ({ formik, brands, loading }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleBrandSelect = useCallback(
    (brand: Brand) => {
      setModalVisible(false);
      formik.setFieldValue('make', brand.name);
      formik.setFieldValue('makePk', brand.pk);
    },
    [formik],
  );

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Input
          pointerEvents="none"
          label="Car Make"
          placeholder="Tap to select car make"
          value={formik.values.make}
          addonRight={<Icon name="ios-arrow-forward" size={24} />}
          errorMessage={formik.touched.make && formik.errors.make}
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
