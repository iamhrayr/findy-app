import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

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
                Make
              </Text>
              <Text size="lg">{make}</Text>

              <Spacer t="lg" />

              <Text size="xs" transform="uppercase" weight="600">
                Model
              </Text>
              <Text size="lg">{model}</Text>

              <Spacer t="lg" />

              <Text size="xs" transform="uppercase" weight="600" spacer={{ b: 'xs' }}>
                Color
              </Text>
              <ColorTag color={color} />

              <Spacer t="lg" />

              <Text size="xs" transform="uppercase" weight="600">
                Plate number
              </Text>
              <Text size="lg">{plateNumber}</Text>

              <Spacer t="lg" />

              <Text size="xs" transform="uppercase" weight="600">
                Message
              </Text>
              <Text size="lg">{message}</Text>

              <Button
                shape="circle"
                spacer={{ t: 'xl' }}
                onPress={handleSendRequest}
                loading={loading}
                disabled={loading}>
                Send Request
              </Button>
              <Button type="link" onPress={onClose}>
                Close
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
