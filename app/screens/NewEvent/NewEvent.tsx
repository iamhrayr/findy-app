import React, { useState, useCallback, memo } from 'react';
import { Alert } from 'react-native';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Box, Text } from 'react-native-magnus';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Input, MaskedInput, Button } from '@app/components';
import { withInteractionsComplete } from '@app/HoCs';
import api from '@app/api';
import { useAsyncFn } from '@app/hooks';
import LicensePlateIcon from '@app/assets/license-plate.svg';
import ConfirmationModal from './ConfirmationModal';

type FormValues = {
  carNumber: string;
  message: string;
};

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
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleCarNumberChange = useCallback(
    (val: string) => {
      formik.setFieldValue('carNumber', val);
      setIsNextDisabled(true);
    },
    [formik],
  );

  const handleRequestSuccess = useCallback(() => {
    setIsVisible(false);
    formik.resetForm();
    navigation.navigate('Events:Home');
  }, [formik, navigation]);

  const handleCheckButtonPress = useCallback(() => {
    checkCarExistance(formik.values.carNumber).then(({ valid }) => {
      if (valid) {
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
    });
  }, [checkCarExistance, formik.values.carNumber, t]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <Box p="lg">
        <Box
          shadow="md"
          rounded="xl"
          px="md"
          py="3xl"
          mb="2xl"
          bg="white"
          alignItems="center">
          <LicensePlateIcon width={100} height={100} />

          <Text textAlign="center" fontSize="4xl" fontWeight="700" mb="xs">
            {t('events:new_event.title')}
          </Text>

          <Text textAlign="center" fontSize="md">
            {t('events:new_event.subtitle')}
          </Text>
        </Box>

        <MaskedInput
          options={{ mask: '99 AA 999' }}
          label={t('car_number')}
          placeholder="11 AA 111"
          onChangeText={handleCarNumberChange}
          value={formik.values.carNumber}
          autoCapitalize="characters"
          suffix={
            <Button
              variant="success"
              size="sm"
              minW={60}
              onPress={handleCheckButtonPress}
              disabled={formik.values.carNumber.length === 0 || loading}
              loading={loading}>
              {t('check')}
            </Button>
          }
        />

        <Input
          multiline
          textAlignVertical="top"
          numberOfLines={4}
          label={t('message')}
          value={formik.values.message}
          onChangeText={(val) => formik.setFieldValue('message', val)}
          placeholder={t('events:new_event.message_to_driver_placeholder')}
          mt="lg"
          minH={100}
        />

        <Button
          disabled={isNextDisabled}
          mt="xl"
          w="60%"
          alignSelf="center"
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
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default withInteractionsComplete(memo(NewEvent));
