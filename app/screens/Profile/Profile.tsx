import React, { useCallback, useEffect } from 'react';
import { FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultTheme, withTheme } from 'styled-components/native';
import { Icon } from 'react-native-eva-icons';

import { Car } from '@app/models/Car';
import { profileSelectors } from '@app/redux/ducks/profile';
import { removeCar } from '@app/redux/ducks/profile/actions';
import { useNavigation } from '@react-navigation/native';
import { useAsyncFn } from '@app/hooks';
import api from '@app/api';
import { Container, Card, Layout, Text, Line, NoData, If } from '@app/components';
import { fetchMyCars as fetchMyCarsRedux } from '@app/redux/ducks/profile/actions';
import CarNumberRow from './CarNumberRow';
import UserDetails from './UserDetails';

type Props = {
  theme: DefaultTheme;
};

const Profile = ({ theme }: Props) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const myCars = useSelector(profileSelectors.getMyCars);
  const { loading, loaded } = useSelector(profileSelectors.getMyCarsStatus);

  const [{}, removeCarMutation] = useAsyncFn(api.removeCar);

  useEffect(() => {
    dispatch(fetchMyCarsRedux());
  }, [dispatch]);

  const navigateToAddEditCar = useCallback(
    (data?: Car) => {
      navigation.navigate('Profile:AddEditCar', data);
    },
    [navigation],
  );

  const removeCarHandler = useCallback(
    id => {
      removeCarMutation(id).then(() => {
        dispatch(removeCar({ id }));
      });
    },
    [dispatch, removeCarMutation],
  );

  return (
    <Container>
      <UserDetails />

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

          <If condition={loading}>
            <ActivityIndicator />
          </If>

          <If condition={loaded}>
            <FlatList
              // style={{ shrink: 1 }}
              data={myCars}
              ItemSeparatorComponent={() => <Line spacer={{ y: 'lg' }} />}
              ListEmptyComponent={() => <NoData message="You do not have any car yet" />}
              renderItem={({ item }: { item: Car }) => (
                <CarNumberRow
                  data={item}
                  navigateToEdit={navigateToAddEditCar}
                  onRemove={removeCarHandler}
                />
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
