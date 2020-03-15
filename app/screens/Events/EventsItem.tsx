import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Layout, Avatar, Text } from '@app/components';

type Props = {
  pk: string | number;
  participant: {
    name: string;
    avatar: React.ReactNode;
  };
  carNumber: string;
  date: string;
  lastMessage: string;
};

const EventsItem = ({ participant, carNumber, date, lastMessage }: Props) => {
  const navigation = useNavigation();
  const navigateToRegister = useCallback(() => {
    navigation.navigate('Events:Event');
  }, [navigation]);

  return (
    <TouchableOpacity onPress={navigateToRegister}>
      <Layout layout="row">
        <Avatar source={participant.avatar} size={60} />
        <Layout spacer={{ l: 'md', b: 'lg' }} size={1}>
          <Text spacer={{ b: 'sm' }}>{participant.name}</Text>
          <Text size="sm">{carNumber}</Text>
        </Layout>
        <Text size="sm">{date}</Text>
      </Layout>

      <Text numberOfLines={2}>{lastMessage}</Text>
    </TouchableOpacity>
  );
};

export default EventsItem;
