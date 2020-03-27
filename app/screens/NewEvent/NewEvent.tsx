import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { useFormik } from 'formik';

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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);

  const [{ loading, res }, checkCarExistance] = useAsyncFn(api.checkCarExistance);

  const formik = useFormik<FormValues>({
    initialValues: {
      carNumber: '',
      message:
        "Hello. I'm so sorry. I crashed your car. It's complatly broken. Please come and help to solve the problem. thanks.",
    },
    onSubmit: values => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (res) {
      if (res.valid) {
        Alert.alert('You are lucky', 'The car is registered in the sustem');
        setIsNextDisabled(false);
      } else {
        Alert.alert('We are sorry', 'The car is not registered in our system');
        setIsNextDisabled(true);
      }
    }
  }, [res]);

  const handleCarNumberChange = useCallback(
    (val: string) => {
      formik.setFieldValue('carNumber', val);
      setIsNextDisabled(true);
    },
    [formik],
  );
  return (
    <Container>
      <Content>
        <Card>
          <Spacer b="sm" />

          <Layout align="center">
            <LicensePlateIcon width={100} height={100} />
            <Text align="center" size="h1" weight="700">
              SEND A REQUEST
            </Text>
            <Spacer b="xs" />
            <Text align="center" size="xs">
              TYPE CAR NUMBER AND CHECK EXISTANCE
            </Text>
          </Layout>
          <Spacer b="lg" />
        </Card>

        <MaskedInput
          options={{ mask: '99 AA 999' }}
          label="Car Number"
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
              Check
            </Button>
          }
        />

        <TextArea
          multiline
          textAlignVertical="top"
          numberOfLines={4}
          label="Message"
          value={formik.values.message}
          onChangeText={val => formik.setFieldValue('message', val)}
          placeholder="Type message to another driver..."
          spacer={{ t: 'lg' }}
        />

        <Button
          disabled={isNextDisabled}
          spacer={{ t: 'xl' }}
          shape="circle"
          onPress={() => setIsVisible(true)}>
          Next
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
        />
      </Content>
    </Container>
  );
};

export default NewEvent;
