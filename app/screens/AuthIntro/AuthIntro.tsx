import React, { useCallback, memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Trans, useTranslation } from 'react-i18next';

import { Button, BoxNew, TextNew, ButtonNew } from '@app/components';
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
    <BoxNew flex={1} p="l">
      <BoxNew flexGrow={1}>
        <IntroImage />
      </BoxNew>

      <BoxNew flexGrow={0}>
        <TextNew fontSize={64} fontWeight="300" mb="m">
          {t('welcome')}
        </TextNew>

        <TextNew fontSize={24} lineHeight={30}>
          {t('auth:intro.text')}
        </TextNew>

        <BoxNew flexDirection="row" justifyContent="space-between" my="l">
          <BoxNew flex={0.47}>
            <ButtonNew block outline shape="circle" onPress={navigateToRegister}>
              {t('register')}
            </ButtonNew>
            {/* <Button block outline shape="circle" onPress={navigateToRegister}>
              {t('register')}
            </Button> */}
          </BoxNew>
          <BoxNew flex={0.47}>
            <Button block shape="circle" onPress={navigateToLogin}>
              {t('login')}
            </Button>
          </BoxNew>
        </BoxNew>

        <TextNew fontSize={18} textAlign="center" mb="xs">
          <Trans i18nKey="auth:intro.terms_of_use">
            By using the app you are agreeing to our
            <TextNew fontSize={18} color="primary" onPress={navigateToTermsOfUse}>
              Terms of Usea
            </TextNew>
          </Trans>
        </TextNew>
      </BoxNew>
    </BoxNew>
  );
};

export default withInteractionsComplete(memo(AuthIntro));
