import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Trans, useTranslation } from 'react-i18next';

import { Button, Text, Container, Content, Layout } from '@app/components';
import { withInteractionsComplete } from '@app/HoCs';
import IntroImage from './IntroImage';

const AuthIntro: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const navigateToRegister = useCallback(() => {
    requestAnimationFrame(() => navigation.navigate('Auth:Register'));
  }, [navigation]);

  const navigateToLogin = useCallback(() => {
    requestAnimationFrame(() => navigation.navigate('Auth:Login'));
  }, [navigation]);

  const navigateToTermsOfUse = useCallback(() => {
    requestAnimationFrame(() => navigation.navigate('Auth:TermsOfUse'));
  }, [navigation]);

  return (
    <Container>
      <Content noPaddingX full>
        <Layout size={1} spacer={{ x: 'lg' }}>
          <Layout grow={1}>
            <IntroImage />
          </Layout>

          <Layout grow={0}>
            <Text size="giant" weight="300" spacer={{ b: 'md' }}>
              {t('welcome')}
            </Text>

            <Text size="lg">{t('auth:intro.text')}</Text>

            <Layout layout="row" justify="between" spacer={{ y: 'lg' }}>
              <Layout size={47}>
                <Button block outline shape="circle" onPress={navigateToRegister}>
                  {t('register')}
                </Button>
              </Layout>
              <Layout size={6} />
              <Layout size={47}>
                <Button block shape="circle" onPress={navigateToLogin}>
                  {t('login')}
                </Button>
              </Layout>
            </Layout>

            <Text align="center" spacer={{ b: 'xs' }}>
              <Trans i18nKey="auth:intro.terms_of_use">
                By using the app you are agreeing to our
                <Text align="center" color="primary" onPress={navigateToTermsOfUse}>
                  Terms of Usea
                </Text>
              </Trans>
            </Text>
          </Layout>
        </Layout>
      </Content>
    </Container>
  );
};

export default withInteractionsComplete(AuthIntro);
