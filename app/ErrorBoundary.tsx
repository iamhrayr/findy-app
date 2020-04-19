import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import RNRestart from 'react-native-restart'; // Import package from node modules
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

import { Container, Content, Text, Layout, Button } from '@app/components';
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
        <Container>
          <Content full extraPadded>
            <Layout size={1} align="center" justify="center">
              <Image source={brokenCar} resizeMode="contain" style={styles.image} />
              <Text size="h3" spacer={{ b: 'lg' }} weight="300" align="center">
                {t('oops_something_wrong')}
              </Text>
              <Button shape="circle" onPress={this.restartApp}>
                {t('reload')}
              </Button>
            </Layout>
          </Content>
        </Container>
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
