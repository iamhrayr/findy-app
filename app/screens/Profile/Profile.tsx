import React, { useCallback } from 'react';
import { DefaultTheme, withTheme } from 'styled-components/native';
// import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Icon } from 'react-native-eva-icons';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Content,
  Card,
  Avatar,
  Layout,
  Text,
  List,
  Button,
} from '@app/components';
import CarNumberRow from './CarNumberRow';

type Props = {
  theme: DefaultTheme;
};

const dummyCarNumbers = [
  {
    pk: 'fd9430',
    number: '11 LL 101',
    added: '27.02.2019',
  },
  {
    pk: '1pdosf',
    number: '28 KM 138',
    added: '29.07.2019',
  },
  {
    pk: 'fpdo2o',
    number: '37 TT 007',
    added: '13.10.2019',
  },
  {
    pk: 'v4dl7o',
    number: '88 LS 880',
    added: '20.02.2020',
  },
];

const Profile = ({ theme }: Props) => {
  const navigation = useNavigation();

  const navigateToAddEditCar = useCallback(
    data => {
      navigation.navigate('Profile:AddEditCar', data);
    },
    [navigation],
  );

  const navigateToEditProfile = useCallback(() => {
    navigation.navigate('Profile:Edit');
  }, [navigation]);

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
            <Button
              outline
              spacer={{ t: 'sm' }}
              type="primary"
              size="sm"
              onPress={navigateToEditProfile}>
              Edit Profile
            </Button>
          </Layout>
        </Layout>

        <Card>
          <Layout layout="row" align="center" justify="between" spacer={{ b: 'md' }}>
            <Text>My Cars</Text>
            <Layout layout="row" align="center">
              <Text
                color="primary"
                transform="uppercase"
                spacer={{ r: 'xs' }}
                onPress={navigateToAddEditCar}>
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
            renderItem={item => (
              <CarNumberRow data={item} navigateToEdit={navigateToAddEditCar} />
            )}
          />
        </Card>
      </Content>
    </Container>
  );
};

export default withTheme(Profile);
