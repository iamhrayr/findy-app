import React, { useCallback, memo } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import { Icon, Box, Text } from 'react-native-magnus';

import api from '@app/api';
import { useAsyncFn } from '@app/hooks';
import { ColorTag, Button } from '@app/components';

type Props = {
  isVisible: boolean;
  carId: Id;
  make: string;
  model: string;
  color: string;
  plateNumber: string;
  message: string;
  onClose: () => void;
  onSuccess: () => void;
};

const ConfirmationModal = ({
  isVisible,
  carId,
  make,
  model,
  color,
  plateNumber,
  message,
  onClose,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();

  const [{ loading }, sendMessage] = useAsyncFn(api.sendMessage);

  const handleSendRequest = useCallback(() => {
    sendMessage({
      carId,
      message,
    }).then(() => {
      onSuccess();
    });
  }, [carId, message, onSuccess, sendMessage]);

  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <Box flex={1} bg="white" px="2xl">
        <SafeAreaView style={styles.safeArea}>
          <Box flex={1} mt="4xl">
            <Box mb="lg">
              <Text fontSize="md" textTransform="uppercase" fontWeight="600">
                {t('make')}
              </Text>
              <Text fontSize="lg">{make}</Text>
            </Box>

            <Box mb="lg">
              <Text fontSize="md" textTransform="uppercase" fontWeight="600">
                {t('model')}
              </Text>
              <Text fontSize="lg">{model}</Text>
            </Box>

            <Box mb="lg">
              <Text fontSize="md" textTransform="uppercase" fontWeight="600" mb="xs">
                {t('color')}
              </Text>
              <ColorTag color={color} />
            </Box>

            <Box mb="lg">
              <Text fontSize="md" textTransform="uppercase" fontWeight="600">
                {t('plate_number')}
              </Text>
              <Text fontSize="lg">{plateNumber}</Text>
            </Box>

            <Box mb="lg">
              <Text fontSize="md" textTransform="uppercase" fontWeight="600">
                {t('message')}
              </Text>
              <Text fontSize="lg">{message}</Text>
            </Box>

            <Box mt="xl">
              <Button
                alignSelf="center"
                onPress={handleSendRequest}
                loading={loading}
                disabled={loading}
                mb="sm">
                {t('send_request')}
              </Button>

              <Button
                bg="gray400"
                h={45}
                w={45}
                rounded="circle"
                onPress={onClose}
                alignSelf="center">
                <Icon color="gray900" name="close" />
              </Button>
            </Box>
          </Box>
        </SafeAreaView>
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  safeArea: {
    flex: 1,
  },
});

export default memo(ConfirmationModal);
