import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import { Container, Content, Text, Spacer, Button, Layout } from '@app/components';

type Props = {
  isVisible: boolean;
};

const ConfirmationModal = ({ isVisible }: Props) => {
  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <Container>
        <SafeAreaView style={styles.safeArea}>
          <Content extraPadded scrollEnabled={false}>
            <Layout size={1} justify="center">
              <Text size="xs" transform="uppercase" weight="600">
                Make
              </Text>
              <Text size="lg">Subaru</Text>

              <Spacer t="lg" />

              <Text size="xs" transform="uppercase" weight="600">
                Model
              </Text>
              <Text size="lg">Legacy</Text>

              <Spacer t="lg" />

              <Text size="xs" transform="uppercase" weight="600">
                Color
              </Text>
              <Text size="lg">Blue</Text>

              <Spacer t="lg" />

              <Text size="xs" transform="uppercase" weight="600">
                Plate number
              </Text>
              <Text size="lg">77 SZ 877</Text>

              <Spacer t="lg" />

              <Text size="xs" transform="uppercase" weight="600">
                Message
              </Text>
              <Text size="lg">
                Hello. I'm so sorry. I enter into your car. It's complatly broken. please
                come and help to solve the problem. thanks.
              </Text>

              <Button shape="circle" spacer={{ t: 'xl' }}>
                Send Request
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
