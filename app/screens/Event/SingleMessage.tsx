import React, { memo } from 'react';

import moment from '@app/helpers/moment';
import { Avatar, Spacer, BoxNew, TextNew } from '@app/components';

type Props = {
  text: string;
  isTypeReceived?: boolean;
  date: string;
};

const SingleMessage = ({ text, isTypeReceived, date }: Props) => {
  return (
    <BoxNew
      flexDirection={isTypeReceived ? 'row' : 'row-reverse'}
      alignItems="flex-start"
      mb="m">
      {isTypeReceived && <Avatar size="50" circle />}

      <Spacer r="md" />

      <BoxNew
        flex={0.9}
        p="s"
        borderColor="lightGray"
        borderRadius={15}
        borderTopStartRadius={!isTypeReceived ? 15 : 0}
        borderTopEndRadius={isTypeReceived ? 15 : 0}
        borderWidth={isTypeReceived ? 1 : 0}
        bg={isTypeReceived ? 'transparent' : 'primary'}>
        <TextNew color={isTypeReceived ? 'dirtyBlue' : 'white'}>{text}</TextNew>
      </BoxNew>

      <BoxNew flex={0.05} />

      <TextNew mt="s" variant="tiny" fontWeight="300">
        {moment(date).fromNow()}
      </TextNew>
    </BoxNew>
  );
};

export default memo(SingleMessage);
