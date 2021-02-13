import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import RNRestart from 'react-native-restart'; // Import package from node modules
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { Box, Text } from 'react-native-magnus';

import { Button } from '@app/components';
import brokenCar from '@app/assets/broken-car.png';

type Props = {
  t: TFunction;
};

class ErrorBoundary extends React.Component<Props> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { t } = this.props;

    if (this.state.hasError) {
      return (
        <Box p="lg">
          <Box flex={1} alignItems="center" justifyContent="center">
            <Image source={brokenCar} resizeMode="contain" style={styles.image} />
            <Text fontSize="2xl" mb="b" fontWeight="300" textAlign="center">
              {t('oops_something_wrong')}
            </Text>
            <Button shape="circle" onPress={this.restartApp}>
              {t('reload')}
            </Button>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }

  restartApp = () => {
    RNRestart.Restart();
  };
}

const styles = StyleSheet.create({
  image: {
    width: '90%',
    maxHeight: 200,
  },
});

export default withTranslation()(memo(ErrorBoundary as any));
