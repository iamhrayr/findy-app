import React, { useCallback, useState, useEffect, memo } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CountDown from 'react-native-countdown-component';
import { showMessage } from 'react-native-flash-message';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'react-native-magnus';
import { Container, Layout, Content } from '@app/components';

import { withInteractionsComplete } from '@app/HoCs';
import UserIdentityIcon from '@app/assets/user-identity.svg';
import { confirmPhoneNumber } from '@app/redux/ducks/auth/actions';
import { getConfirmPhoneNumberStatus } from '@app/redux/ducks/auth/selectors';
// import { RootState } from '@app/redux/rootReducer';
import VerificationCodeField from './VerificationCodeField';

const CELL_COUNT = 4;

const ConfirmPhoneNumber: React.FC = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const auth = useSelector((state: RootState) => state.auth);
  const confirmPhoneNumberStatus = useSelector(getConfirmPhoneNumberStatus);
  const [value, setValue] = useState('');

  const handleSubmit = useCallback(() => {
    dispatch(confirmPhoneNumber(value));
  }, [dispatch, value]);

  useEffect(() => {
    if (confirmPhoneNumberStatus.loaded) {
      showMessage({
        message: t('auth:verification.success_message'),
        type: 'success',
      });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth:Login' }],
      });
    }
  }, [confirmPhoneNumberStatus.loaded, navigation, t]);

  return (
    <Container>
      <Content extraPadded>
        <Layout align="center">
          <UserIdentityIcon width={100} height={200} />
        </Layout>

        <Text textAlign="center" fontSize="xl" mb="sm">
          {t('auth:verification.title')}
        </Text>

        <Text textAlign="center">{t('auth:verification.confirmation_code_text')}</Text>

        <CountDown
          size={30}
          until={2 * 60}
          // @ts-ignore
          // TODO: show message and redirect to register page if time is over
          onFinish={() => Alert.alert('Finished')}
          digitStyle={styles.digitStyle}
          separatorStyle={styles.separatorStyle}
          timeToShow={['M', 'S']}
          timeLabels={{ m: null, s: null }}
          showSeparator
        />

        <VerificationCodeField value={value} cellCount={CELL_COUNT} setValue={setValue} />

        <Button
          mt="2xl"
          w="60%"
          alignSelf="center"
          onPress={handleSubmit}
          loading={confirmPhoneNumberStatus.loading}
          disabled={value.length !== CELL_COUNT}>
          {t('confirm')}
        </Button>

        {confirmPhoneNumberStatus.error?.token && (
          <Text textAlign="center" color="danger" mt="sm">
            {confirmPhoneNumberStatus.error?.token}
          </Text>
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  digitStyle: {
    width: 40,
  },
  separatorStyle: {
    fontSize: 30,
    lineHeight: 30,
  },
});

export default withInteractionsComplete(memo(ConfirmPhoneNumber));
