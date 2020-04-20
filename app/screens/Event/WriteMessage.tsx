import React, { useState, useCallback, memo } from 'react';
import { View, TextInput } from 'react-native';
import styled, { css, withTheme, DefaultTheme } from 'styled-components/native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import { s } from 'react-native-size-matters';

const Wrapper = styled(View)`
  ${({ theme }) => css`
    flex-direction: row;
    padding: ${s(25)}px ${s(15)}px;
    border-top-width: ${s(1)}px;
    border-top-color: ${theme.colors.lightGray};
    align-items: center;
    background-color: ${theme.colors.white};
    margin-top: auto;
    /* position: absolute; */
  `}
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
  color: red;
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
    <Wrapper>
      <MessageInput
        placeholder={t('events:message.type_msg')}
        onSubmitEditing={handleSendMessage}
        onChangeText={(val) => setMessage(val)}
        value={message}
        returnKeyType="send"
      />

      <SendIcon
        name="paper-plane-outline"
        width={30}
        height={30}
        fill={theme.colors.primary}
        onPress={handleSendMessage}
      />
    </Wrapper>
  );
};

export default memo(withTheme(WriteMessage));
