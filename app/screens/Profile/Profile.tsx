import React from 'react';
// import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { Container, Content, Card, Avatar, Layout, Text, List } from '@app/components';
import CarNumberRow from './CarNumberRow';

const dummyCarNumbers = [
  {
    number: '11 LL 101',
    added: '27.02.2019',
  },
  {
    number: '28 KM 138',
    added: '29.07.2019',
  },
  {
    number: '37 TT 007',
    added: '13.10.2019',
  },
  {
    number: '88 LS 880',
    added: '20.02.2020',
  },
];

const Profile: React.FC<{}> = () => {
  return (
    <Container>
      <Content>
        <Layout layout="row" spacer={{ x: 'md', b: 'xxl', t: 'lg' }}>
          <Avatar />
          <Layout layout="col" justify="center" spacer={{ l: 'lg' }}>
            <Text size="h2" weight="600" spacer={{ b: 'sm' }}>
              Sipo Sipoakanyan
            </Text>
            <Layout layout="row">
              <Icon name="phone" size={20} />
              <Text weight="300" spacer={{ l: 'xs' }}>
                374 95 959595
              </Text>
            </Layout>
          </Layout>
        </Layout>

        <Card>
          <Text>My Cars</Text>
          <List
            virtualized={false}
            bordered
            data={dummyCarNumbers}
            keyExtractor={item => item.number}
            renderItem={item => <CarNumberRow data={item} />}
          />
        </Card>
      </Content>
    </Container>
  );
};

export default Profile;
