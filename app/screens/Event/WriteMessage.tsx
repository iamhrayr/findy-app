import React, { useState, useCallback, memo } from 'react';
import {
  // View,
  TextInput,
} from 'react-native';
import styled, { css, withTheme, DefaultTheme } from 'styled-components/native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import { s } from 'react-native-size-matters';

import {
  View,
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
  Incubator,
  TextField,
} from 'react-native-ui-lib';

import { Line } from '@app/components';

const Wrapper = styled(View)`
  border-top-width: ${s(1)}px;
`;

const MessageInput = styled(TextInput)`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.lightGray};
    border-radius: ${s(25)}px;
    padding: ${s(10)}px ${s(20)}px;
  `}
`;

const SendIcon = styled(Icon)`
  margin-left: ${s(10)}px;
  /* color: red; */
`;

type Props = {
  theme: DefaultTheme;
  onSendMessage: (message: string) => void;
};

const WriteMessage = ({ theme, onSendMessage }: Props) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');

  const handleSendMessage = useCallback(() => {
    onSendMessage(message);
    setMessage('');
  }, [message, onSendMessage]);

  return (
    <View paddingH-25 paddingV-15 row center>
      {/* <Line /> */}
      {/* <MessageInput
        placeholder={t('events:message.type_msg')}
        onSubmitEditing={handleSendMessage}
        onChangeText={(val) => setMessage(val)}
        value={message}
        returnKeyType="send"
      /> */}

      <View flex-1 bg-red10>
        <Incubator.TextField
          paddingB-0
          placeholder={t('events:message.type_msg')}
          onSubmitEditing={handleSendMessage}
          onChangeText={(val) => setMessage(val)}
          value={message}
          returnKeyType="send"
        />
      </View>

      <SendIcon
        name="paper-plane-outline"
        width={30}
        height={30}
        fill={theme.colors.primary}
        onPress={handleSendMessage}
      />
    </View>
  );
};

export default memo(withTheme(WriteMessage));
