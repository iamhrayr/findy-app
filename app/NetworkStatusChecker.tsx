import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTranslation } from 'react-i18next';

import { Container, Content, Text, Layout } from '@app/components';
import noConnectionImg from '@app/assets/no-connection.png';

type Props = {
  children: React.ReactElement;
};

const NetworkStatusChecker = ({ children }: Props) => {
  const netInfo = useNetInfo();
  const { t } = useTranslation();

  if (!netInfo.isConnected) {
    return (
      <Container>
        <Content full extraPadded>
          <Layout size={1} align="center" justify="center">
            <Image source={noConnectionImg} resizeMode="contain" style={styles.image} />
            <Text size="h3" spacer={{ b: 'sm' }} weight="600" align="center">
              {t('you_are_offline')}
            </Text>
            <Text size="lg" weight="300" align="center">
              {t('connect_to_network_message')}
            </Text>
          </Layout>
        </Content>
      </Container>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  image: {
    width: '90%',
    maxHeight: 200,
  },
});

export default NetworkStatusChecker;
