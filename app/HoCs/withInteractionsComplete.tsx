import React, { ComponentType, memo } from 'react';
import { ActivityIndicator } from 'react-native';
import { Box } from 'react-native-magnus';

import { useInteractionsComplete } from '@app/hooks';

function withInteractionsComplete<Props>(BaseComponent: ComponentType) {
  return memo((props: Props) => {
    const interactionsComplete = useInteractionsComplete();

    if (!interactionsComplete) {
      return (
        <Box p="lg">
          <Box alignItems="center" justifyContent="center">
            <ActivityIndicator />
          </Box>
        </Box>
      );
    }

    return <BaseComponent {...props} />;
  });
}

export default withInteractionsComplete;
