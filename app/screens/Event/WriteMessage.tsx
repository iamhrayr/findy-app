import React, { useState, useCallback, memo } from 'react';
import { TextInput } from 'react-native';
import styled, { css, withTheme, DefaultTheme } from 'styled-components/native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import { s } from 'react-native-size-matters';

import { BoxNew } from '@app/components';

const MessageInput = styled(TextInput)`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.lightGray};
    border-radius: ${s(25)}px;
    padding: ${s(10)}px ${s(20)}px;
  `}
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
    <BoxNew
      flexDirection="row"
      py="l"
      px="m"
      borderTopWidth={1}
      borderTopColor="lightGray"
      alignItems="center">
      <MessageInput
        placeholder={t('events:message.type_msg')}
        onSubmitEditing={handleSendMessage}
        onChangeText={(val) => setMessage(val)}
        value={message}
        returnKeyType="send"
      />

      <BoxNew ml="s">
        <Icon
          name="paper-plane-outline"
          width={30}
          height={30}
          fill={theme.colors.primary}
          onPress={handleSendMessage}
        />
      </BoxNew>
    </BoxNew>
  );
};

export default memo(withTheme(WriteMessage));
