import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CountDown from 'react-native-countdown-component';
import { showMessage } from 'react-native-flash-message';

import { Button, Text, Container, Layout, Content } from '@app/components';
import UserIdentityIcon from '@app/assets/user-identity.svg';
import { confirmPhoneNumber } from '@app/redux/ducks/auth/actions';
import { RootState } from '@app/redux/rootReducer';
import VerificationCodeField from './VerificationCodeField';

const CELL_COUNT = 4;

const ConfirmPhoneNumber: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [value, setValue] = useState('');

  const handleSubmit = useCallback(() => {
    dispatch(confirmPhoneNumber(value));
  }, [dispatch, value]);

  useEffect(() => {
    if (auth.codeConfirmed) {
      showMessage({
        message: 'You have successfully registered! please Log In',
        type: 'success',
      });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth:Login' }],
      });
    }
  }, [auth.codeConfirmed, navigation]);

  return (
    <Container>
      <Content extraPadded>
        <Layout align="center">
          <UserIdentityIcon width={100} height={200} />
        </Layout>

        <Text align="center" size="h1" spacer={{ b: 'sm' }}>
          Phone verification
        </Text>

        <Text align="center">
          Please enter the confirmation code you received via sms
        </Text>

        <CountDown
          size={30}
          until={2 * 60}
          // @ts-ignore
          onFinish={() => alert('Finished')}
          digitStyle={styles.digitStyle}
          separatorStyle={styles.separatorStyle}
          timeToShow={['M', 'S']}
          timeLabels={{ m: null, s: null }}
          showSeparator
        />

        <VerificationCodeField value={value} cellCount={CELL_COUNT} setValue={setValue} />

        <Button
          shape="circle"
          size="lg"
          spacer={{ t: 'xxl' }}
          onPress={handleSubmit}
          disabled={value.length !== CELL_COUNT}>
          Confirm
        </Button>

        {auth.error.confirmPhone.token && (
          <Text align="center" color="danger" spacer={{ t: 'sm' }}>
            {auth.error.confirmPhone.token}
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

export default ConfirmPhoneNumber;
