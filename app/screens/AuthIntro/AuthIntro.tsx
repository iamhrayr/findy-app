import React, { useCallback, memo } from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Trans, useTranslation } from 'react-i18next';
import { Box, Text } from 'react-native-magnus';
import { Button } from '@app/components';

import { withInteractionsComplete } from '@app/HoCs';
import IntroImage from './IntroImage';

const AuthIntro: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const navigateToRegister = useCallback(() => {
    // requestAnimationFrame(() => navigation.navigate('Auth:Register'));
    navigation.navigate('Auth:Register');
  }, [navigation]);

  const navigateToLogin = useCallback(() => {
    // requestAnimationFrame(() => navigation.navigate('Auth:Login'));
    navigation.navigate('Auth:Login');
  }, [navigation]);

  const navigateToTermsOfUse = useCallback(() => {
    // requestAnimationFrame(() => navigation.navigate('Auth:TermsOfUse'));
    navigation.navigate('Auth:TermsOfUse');
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1}>
        <Box flex={1} mx="2xl" justifyContent="space-between">
          <Box>
            <IntroImage />
          </Box>

          <Box>
            <Text fontSize={62} fontWeight="300" mb="lg">
              {t('welcome')}
            </Text>

            <Text fontSize="4xl">{t('auth:intro.text')}</Text>

            <Box flexDir="row" justifyContent="space-between" my="2xl">
              <Box flex={0.48}>
                <Button block outline onPress={navigateToRegister}>
                  {t('register')}
                </Button>
              </Box>
              <Box flex={0.48}>
                <Button block onPress={navigateToLogin}>
                  {t('login')}
                </Button>
              </Box>
            </Box>

            <Text textAlign="center" fontSize="xl">
              <Trans i18nKey="auth:intro.terms_of_use">
                By using the app you are agreeing to our
                <Text color="primary" fontSize="xl" onPress={navigateToTermsOfUse}>
                  Terms of Use
                </Text>
              </Trans>
            </Text>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default withInteractionsComplete(memo(AuthIntro));
