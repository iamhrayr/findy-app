import React from 'react';

import { Container, Content } from '@app/components';
import Message from './Message';

const Event = () => {
  return (
    <Container>
      <Content>
        <Message
          isTypeReceived
          text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
          tempor invidunt ut labore et dolore"
        />
        <Message isTypeReceived text="Elitr, sed diam nonumy eirmod" />
        <Message text="Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore" />
        <Message text="Sed diam nonumy eirmod tempor" />
        <Message text="Elitr, sed diam nonumy eirmod" />
      </Content>
    </Container>
  );
};

export default Event;
