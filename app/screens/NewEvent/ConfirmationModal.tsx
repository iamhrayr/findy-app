import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

import api from '@app/api';
import { useAsyncFn } from '@app/hooks';
import {
  Container,
  Content,
  Text,
  Spacer,
  Button,
  Layout,
  ColorTag,
} from '@app/components';

type Props = {
  isVisible: boolean;
  carId: Id;
  make: string;
  model: string;
  color: string;
  plateNumber: string;
  message: string;
  onClose: () => void;
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
}: Props) => {
  const { t } = useTranslation();

  const [
    {
      loading,
      // res, error
    },
    sendMessage,
  ] = useAsyncFn(api.sendMessage);

  const handleSendRequest = useCallback(() => {
    sendMessage({
      carId,
      message,
    });
  }, [carId, message, sendMessage]);

  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <Container>
        <SafeAreaView style={styles.safeArea}>
          <Content extraPadded scrollEnabled={false}>
            <Layout size={1} justify="center">
              <Text size="xs" transform="uppercase" weight="600">
                {t('make')}
              </Text>
              <Text size="lg">{make}</Text>

              <Spacer t="lg" />

              <Text size="xs" transform="uppercase" weight="600">
                {t('model')}
              </Text>
              <Text size="lg">{model}</Text>

              <Spacer t="lg" />

              <Text size="xs" transform="uppercase" weight="600" spacer={{ b: 'xs' }}>
                {t('color')}
              </Text>
              <ColorTag color={color} />

              <Spacer t="lg" />

              <Text size="xs" transform="uppercase" weight="600">
                {t('plate_number')}
              </Text>
              <Text size="lg">{plateNumber}</Text>

              <Spacer t="lg" />

              <Text size="xs" transform="uppercase" weight="600">
                {t('message')}
              </Text>
              <Text size="lg">{message}</Text>

              <Button
                shape="circle"
                spacer={{ t: 'xl' }}
                onPress={handleSendRequest}
                loading={loading}
                disabled={loading}>
                {t('send_request')}
              </Button>
              {/* TODO: redirect to Events after sending request */}
              <Button type="link" onPress={onClose}>
                {t('close')}
              </Button>
            </Layout>
          </Content>
        </SafeAreaView>
      </Container>
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

export default ConfirmationModal;
