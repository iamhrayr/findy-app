import React from 'react';
import { DefaultTheme, withTheme } from 'styled-components/native';
// import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Icon } from 'react-native-eva-icons';

import { Container, Content, Card, Avatar, Layout, Text, List } from '@app/components';
import CarNumberRow from './CarNumberRow';

type Props = {
  theme: DefaultTheme;
};

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

const Profile = ({ theme }: Props) => {
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
              <Icon name="phone-outline" width={20} height={20} />
              <Text weight="300" spacer={{ l: 'xs' }}>
                374 95 959595
              </Text>
            </Layout>
          </Layout>
        </Layout>

        <Card>
          <Layout layout="row" align="center" justify="between" spacer={{ b: 'md' }}>
            <Text>My Cars</Text>
            <Layout layout="row" align="center">
              <Text color="primary" transform="uppercase" spacer={{ r: 'xs' }}>
                Add
              </Text>
              <Icon
                name="plus-outline"
                width={20}
                height={20}
                fill={theme.colors.primary}
              />
            </Layout>
          </Layout>
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

export default withTheme(Profile);
