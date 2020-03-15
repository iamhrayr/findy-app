import React, { useCallback, useEffect } from 'react';
import { FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAsyncFn } from '@app/hooks';
import { DefaultTheme, withTheme } from 'styled-components/native';
import { Icon } from 'react-native-eva-icons';

import { CarWithWrapper } from '@app/models/Car';
import { useNavigation } from '@react-navigation/native';
import api from '@app/api';
import {
  Container,
  Card,
  Avatar,
  Layout,
  Text,
  Line,
  Button,
  NoData,
  If,
} from '@app/components';
import CarNumberRow from './CarNumberRow';

type Props = {
  theme: DefaultTheme;
};

const Profile = ({ theme }: Props) => {
  const navigation = useNavigation();

  const [{ loading, res }, fetchMyCars] = useAsyncFn(api.fetchMyCars);

  useEffect(() => {
    fetchMyCars();
  }, [fetchMyCars]);

  const navigateToAddEditCar = useCallback(
    (data?: CarWithWrapper) => {
      navigation.navigate('Profile:AddEditCar', (data && data.car) || {});
    },
    [navigation],
  );

  const navigateToEditProfile = useCallback(() => {
    navigation.navigate('Profile:Edit');
  }, [navigation]);

  return (
    <Container>
      <Layout layout="row" spacer={{ x: 'md', b: 'xxl', t: 'lg' }}>
        <Avatar />
        <Layout layout="col" justify="center" spacer={{ l: 'lg' }}>
          <Text size="h3" weight="600" spacer={{ b: 'sm' }}>
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

      <Layout size={1} spacer={{ x: 'md', y: 'md' }}>
        <Card>
          <Layout layout="row" justify="between" spacer={{ b: 'md' }}>
            <Text spacer={{ b: 'sm' }}>My Cars</Text>
            <TouchableOpacity onPress={() => navigateToAddEditCar()}>
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
            </TouchableOpacity>
          </Layout>

          <If condition={loading}>
            <ActivityIndicator />
          </If>

          <If condition={res}>
            <FlatList
              data={res}
              ItemSeparatorComponent={() => <Line spacer={{ y: 'lg' }} />}
              ListEmptyComponent={() => <NoData message="You do not have any car yet" />}
              renderItem={({ item }: { item: CarWithWrapper }) => (
                <CarNumberRow data={item} navigateToEdit={navigateToAddEditCar} />
              )}
              keyExtractor={item => String(item.car.pk)}
            />
          </If>
        </Card>
      </Layout>
    </Container>
  );
};

export default withTheme(Profile);
