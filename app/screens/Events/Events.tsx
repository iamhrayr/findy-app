import React from 'react';
import { View } from 'react-native';
import { Container, Content, List } from '@app/components';
import avatarImage from '@app/assets/no-avatar.png';
import EventItem from './EventsItem';

const items = [
  {
    pk: 1,
    participant: {
      name: 'Isaak Albenis',
      avatar: avatarImage,
    },
    carNumber: '77 SZ 877',
    date: '27 June 2019',
    lastMessage:
      'There were an accident with your car near Mashtots street. Please come as soon as possible. Thanks.',
  },
  {
    pk: 2,
    participant: {
      name: 'Juakin Rodrigo',
      avatar: avatarImage,
    },
    carNumber: '77 SZ 877',
    date: '27 June 2019',
    lastMessage:
      'There were an accident with your car near Mashtots street. Please come as soon as possible. Thanks.',
  },
  {
    pk: 3,
    participant: {
      name: 'Juakin Rodrigo',
      avatar: avatarImage,
    },
    carNumber: '77 SZ 877',
    date: '27 June 2019',
    lastMessage:
      'There were an accident with your car near Mashtots street. Please come as soon as possible. Thanks.',
  },
  {
    pk: 4,
    participant: {
      name: 'Juakin Rodrigo',
      avatar: avatarImage,
    },
    carNumber: '77 SZ 877',
    date: '27 June 2019',
    lastMessage:
      'There were an accident with your car near Mashtots street. Please come as soon as possible. Thanks.',
  },
];

const Events = () => {
  return (
    <Container>
      <Content as={View}>
        <List
          virtualized
          bordered
          data={items}
          keyExtractor={item => String(item.pk)}
          renderItem={item => <EventItem {...item} />}
        />
      </Content>
    </Container>
  );
};

export default Events;
