import React, { memo } from 'react';
import { Box, Text, Avatar } from 'react-native-magnus';

import moment from '@app/helpers/moment';
import noAvatarImg from '@app/assets/no-avatar.png';

type Props = {
  text: string;
  isTypeReceived?: boolean;
  date: string;
};

const SingleMessage = ({ text, isTypeReceived, date }: Props) => {
  return (
    <Box flexDir={isTypeReceived ? 'row' : 'row-reverse'} mb="md">
      {isTypeReceived && <Avatar source={noAvatarImg} size={50} />}
      <Box mr="lg" />
      <Box
        p="md"
        borderWidth={isTypeReceived ? 1 : 0}
        borderColor="gray400"
        rounded="2xl"
        roundedTopLeft={isTypeReceived ? 'none' : '2xl'}
        roundedTopRight={isTypeReceived ? '2xl' : 'none'}
        bg={isTypeReceived ? 'transparent' : 'primary'}
        flex={0.9}>
        <Text color={isTypeReceived ? 'gray700' : 'white'}>{text}</Text>
      </Box>
      <Box mr="sm" />
      <Text fontSize="lg" mt="sm">
        {moment(date).fromNow()}
      </Text>
    </Box>
  );
};

export default memo(SingleMessage);
