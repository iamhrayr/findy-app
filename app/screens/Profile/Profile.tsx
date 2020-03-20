import React, { useCallback, useEffect } from 'react';
import { FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultTheme, withTheme } from 'styled-components/native';
import { Icon } from 'react-native-eva-icons';

import { Car } from '@app/models/Car';
import { profileSelectors } from '@app/redux/ducks/profile';
import { useNavigation } from '@react-navigation/native';
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
import { fetchMyCars as fetchMyCarsRedux } from '@app/redux/ducks/profile/actions';
import CarNumberRow from './CarNumberRow';

type Props = {
  theme: DefaultTheme;
};

const Profile = ({ theme }: Props) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const myCars = useSelector(profileSelectors.getMyCars);
  const myCarsLoading = useSelector(profileSelectors.getIsMyCarsLoading);
  const myCarsLoaded = useSelector(profileSelectors.getIsMyCarsLoaded);

  useEffect(() => {
    dispatch(fetchMyCarsRedux());
  }, [dispatch]);

  const navigateToAddEditCar = useCallback(
    (data?: Car) => {
      navigation.navigate('Profile:AddEditCar', data);
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
        <Card size={1}>
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

          <If condition={myCarsLoading}>
            <ActivityIndicator />
          </If>

          <If condition={myCarsLoaded}>
            <FlatList
              // style={{ shrink: 1 }}
              data={myCars}
              ItemSeparatorComponent={() => <Line spacer={{ y: 'lg' }} />}
              ListEmptyComponent={() => <NoData message="You do not have any car yet" />}
              renderItem={({ item }: { item: Car }) => (
                <CarNumberRow data={item} navigateToEdit={navigateToAddEditCar} />
              )}
              keyExtractor={item => String(item.pk)}
            />
          </If>
        </Card>
      </Layout>
    </Container>
  );
};

export default withTheme(Profile);
