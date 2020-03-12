import React, { useState } from 'react';
import styled from 'styled-components/native';

import {
  Container,
  Content,
  Text,
  Card,
  Spacer,
  Input,
  Button,
  Layout,
} from '@app/components';
import LicensePlateIcon from '@app/assets/license-plate.svg';
import ConfirmationModal from './ConfirmationModal';

const TextArea = styled(Input)`
  /* TODO: most probably we need TextArea component or more smart Input one */
  margin-top: 12px;
  min-height: 100px;
`;

const NewEvent = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <Container>
      <Content>
        <Card>
          <Spacer b="sm" />
          <Layout align="center">
            <LicensePlateIcon width={100} height={100} />
            <Text align="center" size="h1" weight="700">
              SCAN
            </Text>
            <Spacer b="xs" />
            <Text align="center" size="xs">
              AUTOMATICALLY BY CAMERA
            </Text>
          </Layout>
          <Spacer b="lg" />
        </Card>

        <Input label="Car number" placeholder="77 SZ 877" spacer={{ t: 'lg' }} />
        <TextArea
          multiline
          textAlignVertical="top"
          numberOfLines={4}
          label="Message"
          placeholder="Type message to another driver..."
          spacer={{ t: 'lg' }}
        />

        <Button spacer={{ t: 'xl' }} shape="circle" onPress={() => setIsVisible(true)}>
          Next
        </Button>

        <ConfirmationModal isVisible={isVisible} />
      </Content>
    </Container>
  );
};

export default NewEvent;
