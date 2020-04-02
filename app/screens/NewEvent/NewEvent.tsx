import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Content,
  Text,
  Card,
  Spacer,
  Input,
  MaskedInput,
  Button,
  Layout,
} from '@app/components';
import api from '@app/api';
import { useAsyncFn } from '@app/hooks';
import LicensePlateIcon from '@app/assets/license-plate.svg';
import ConfirmationModal from './ConfirmationModal';

type FormValues = {
  carNumber: string;
  message: string;
};

const TextArea = styled(Input)`
  /* TODO: most probably we need TextArea component or more smart Input one */
  margin-top: 12px;
  min-height: 100px;
`;

const NewEvent = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);

  const [{ loading, res }, checkCarExistance] = useAsyncFn(api.checkCarExistance);

  const formik = useFormik<FormValues>({
    initialValues: {
      carNumber: '',
      message: '',
    },
    onSubmit: values => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (res) {
      if (res.valid) {
        Alert.alert(
          t('events:new_event.check_car_success_title'),
          t('events:new_event.check_car_success_description'),
        );
        setIsNextDisabled(false);
      } else {
        Alert.alert(
          t('events:new_event.check_car_error_title'),
          t('events:new_event.check_car_error_description'),
        );
        setIsNextDisabled(true);
      }
    }
  }, [res, t]);

  const handleCarNumberChange = useCallback(
    (val: string) => {
      formik.setFieldValue('carNumber', val);
      setIsNextDisabled(true);
    },
    [formik],
  );
  const handleRequestSuccess = useCallback(() => {
    setIsVisible(false);
    navigation.navigate('Events:Home');
  }, [navigation]);

  return (
    <Container>
      <Content>
        <Layout spacer={{ x: 'lg', y: 'lg' }}>
          <Card>
            <Spacer b="sm" />

            <Layout align="center">
              <LicensePlateIcon width={100} height={100} />
              <Text align="center" size="h1" weight="700">
                {t('events:new_event.title')}
              </Text>
              <Spacer b="xs" />
              <Text align="center" size="xs">
                {t('events:new_event.subtitle')}
              </Text>
            </Layout>
            <Spacer b="lg" />
          </Card>
        </Layout>

        <MaskedInput
          options={{ mask: '99 AA 999' }}
          label={t('car_number')}
          placeholder="11 AA 111"
          spacer={{ t: 'lg' }}
          onChangeText={handleCarNumberChange}
          value={formik.values.carNumber}
          autoCapitalize="characters"
          addonRight={
            <Button
              type="success"
              shape="circle"
              size="sm"
              onPress={() => checkCarExistance(formik.values.carNumber)}
              disabled={formik.values.carNumber.length === 0 || loading}
              loading={loading}>
              {t('check')}
            </Button>
          }
        />

        <TextArea
          multiline
          textAlignVertical="top"
          numberOfLines={4}
          label={t('message')}
          value={formik.values.message}
          onChangeText={val => formik.setFieldValue('message', val)}
          placeholder={t('events:new_event.message_to_driver_placeholder')}
          spacer={{ t: 'lg' }}
        />

        <Button
          disabled={isNextDisabled}
          spacer={{ t: 'xl' }}
          shape="circle"
          onPress={() => setIsVisible(true)}>
          {t('next')}
        </Button>

        <ConfirmationModal
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          carId={res?.pk}
          make={res?.makeName}
          model={res?.modelName}
          color={res?.color}
          plateNumber={res?.carNumber}
          message={formik.values.message}
          onSuccess={handleRequestSuccess}
        />
      </Content>
    </Container>
  );
};

export default NewEvent;
