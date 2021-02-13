import React, { useState, useCallback, memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-magnus';

import { Input } from '@app/components';
import { Model } from '@app/types/CarBrandModel';
import CarListSelectModal from './CarListSelectModal';

type Props = {
  formik: any;
  models: Model[];
  loading: boolean;
  selectedBrandId?: Id;
};

const CarModalInput = ({ formik, models = [], loading, selectedBrandId }: Props) => {
  const { t } = useTranslation();

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

  const modelsOfBrand = models.filter((model) => model.makePk === selectedBrandId);

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Input
          pointerEvents="none"
          label={t('profile:car_model_label')}
          placeholder={t('profile:car_model_placeholder')}
          value={formik.values.model}
          suffix={<Icon name="ios-arrow-forward" fontFamily="Ionicons" fontSize={24} />}
          errorMessage={formik.touched.model && formik.errors.model}
          editable={false}
          mb="2xl"
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

export default memo(CarModalInput);
