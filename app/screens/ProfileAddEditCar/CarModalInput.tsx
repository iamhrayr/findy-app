import React, { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Input } from '@app/components';
import { Model } from '@app/models/CarBrandModel';
import CarListSelectModal from './CarListSelectModal';

type Props = {
  formik: any;
  models: Model[];
  loading: boolean;
  selectedBrandId: Id;
};

const CarModalInput = ({ formik, models = [], loading, selectedBrandId }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleModelSelect = useCallback(
    (model: Model) => {
      setModalVisible(false);
      formik.setFieldValue('model', model.name);
      formik.setFieldValue('modelPk', model.pk);
    },
    [formik],
  );

  const modelsOfBrand = models.filter(model => model.makePk === selectedBrandId);

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Input
          pointerEvents="none"
          label="Car Model"
          placeholder="Tap to select car model"
          value={formik.values.model}
          addonRight={<Icon name="ios-arrow-forward" size={24} />}
          errorMessage={formik.touched.model && formik.errors.model}
          editable={false}
        />
      </TouchableOpacity>

      <CarListSelectModal
        isVisible={modalVisible}
        close={closeModal}
        onSelect={handleModelSelect}
        data={modelsOfBrand}
        loading={loading}
      />
    </>
  );
};

export default CarModalInput;