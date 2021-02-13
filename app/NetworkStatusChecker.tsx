import React, { useEffect, useState, memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useTranslation } from 'react-i18next';
import { Box, Text } from 'react-native-magnus';

import noConnectionImg from '@app/assets/no-connection.png';

type Props = {
  children: React.ReactElement;
};

const NetworkStatusChecker = ({ children }: Props) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const { t } = useTranslation();

  if (!isConnected) {
    return (
      <Box>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Image source={noConnectionImg} resizeMode="contain" style={styles.image} />
          <Text fontSize="h3" mb="sm" fontWeight="600" textAlign="center">
            {t('you_are_offline')}
          </Text>
          <Text fontSize="lg" fontWeight="300" textAlign="center">
            {t('connect_to_network_message')}
          </Text>
        </Box>
      </Box>
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

export default memo(NetworkStatusChecker);
