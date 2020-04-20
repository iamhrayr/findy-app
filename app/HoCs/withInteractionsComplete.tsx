import React, { ComponentType, memo } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Content, Layout } from '@app/components';

import { useInteractionsComplete } from '@app/hooks';

function withInteractionsComplete<Props>(BaseComponent: ComponentType) {
  return memo((props: Props) => {
    const interactionsComplete = useInteractionsComplete();

    if (!interactionsComplete) {
      return (
        <Container>
          <Content full>
            <Layout align="center" justify="center" grow={1}>
              <ActivityIndicator />
            </Layout>
          </Content>
        </Container>
      );
    }

    return <BaseComponent {...props} />;
  });
}

export default withInteractionsComplete;
