import React, { useState, useCallback } from 'react';
import { View, TextInput } from 'react-native';
import styled, { css, withTheme, DefaultTheme } from 'styled-components/native';
import { Icon } from 'react-native-eva-icons';

const Wrapper = styled(View)`
  ${({ theme }) => css`
    flex-direction: row;
    padding: 25px 15px;
    border-top-width: 1px;
    border-top-color: ${theme.colors.lightGray};
    align-items: center;
  `}
`;

const MessageInput = styled(TextInput)`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.lightGray};
    border-radius: 25px;
    padding: 10px 20px;
  `}
`;

const SendIcon = styled(Icon)`
  margin-left: 10px;
  color: red;
`;

type Props = {
  theme: DefaultTheme;
  onSendMessage: (message: string) => void;
};

const WriteMessage = ({ theme, onSendMessage }: Props) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = useCallback(() => {
    onSendMessage(message);
    setMessage('');
  }, [message, onSendMessage]);

  return (
    <Wrapper>
      <MessageInput
        placeholder="Type your message..."
        onSubmitEditing={handleSendMessage}
        onChangeText={val => setMessage(val)}
        value={message}
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

export default withTheme(WriteMessage);
