import React, { useState, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Icon } from 'react-native-magnus';

import { Button, Input } from '@app/components';

type Props = {
  onSendMessage: (message: string) => void;
};

const WriteMessage = ({ onSendMessage }: Props) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');

  const handleSendMessage = useCallback(() => {
    onSendMessage(message);
    setMessage('');
  }, [message, onSendMessage]);

  return (
    <Box
      flexDir="row"
      py={25}
      px={20}
      borderTopWidth={1}
      borderTopColor="gray400"
      alignItems="center"
      justifyContent="center"
      bg="white"
      mt="auto">
      <Box flex={1}>
        <Input
          variant="regular"
          bg="gray200"
          rounded="circle"
          placeholder={t('events:message.type_msg')}
          onSubmitEditing={handleSendMessage}
          onChangeText={(val) => setMessage(val)}
          value={message}
          returnKeyType="send"
        />
      </Box>

      <Button
        onPress={handleSendMessage}
        w={40}
        h={40}
        ml="md"
        p="none"
        alignSelf="center"
        ghost>
        <Icon
          name="md-paper-plane-outline"
          fontFamily="Ionicons"
          fontSize={30}
          color="primary"
        />
      </Button>
    </Box>
  );
};

export default memo(WriteMessage);
