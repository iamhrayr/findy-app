import React, { useCallback, useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultTheme, withTheme } from 'styled-components/native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';

import { Car } from '@app/types/Car';
import { profileSelectors } from '@app/redux/ducks/profile';
import { authSelectors, authActions } from '@app/redux/ducks/auth';
import { removeCar } from '@app/redux/ducks/profile/actions';
import { useNavigation } from '@react-navigation/native';
import { useAsyncFn } from '@app/hooks';
import api from '@app/api';
import { Container, Card, Layout, Text, Button, Line, NoData, If } from '@app/components';
import { fetchMyCars as fetchMyCarsRedux } from '@app/redux/ducks/profile/actions';
import CarNumberRow from './CarNumberRow';
import UserDetails from './UserDetails';
import CarNumberPlaceholder from './CarNumberPlaceholder';

type Props = {
  theme: DefaultTheme;
};

const Profile = ({ theme }: Props) => {
  const { t } = useTranslation();

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);
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

  const logoutHandler = useCallback(() => {
    dispatch(authActions.logout());
  }, [dispatch]);

  return (
    <Container>
      <UserDetails isAuthenticated={isAuthenticated} />

      <Layout size={1} spacer={{ x: 'md', b: 'md' }}>
        <Card size={1}>
          <Layout layout="row" justify="between" spacer={{ b: 'md' }}>
            <Text spacer={{ b: 'sm' }}>{t('profile:my_cars')}</Text>
            <TouchableOpacity onPress={() => navigateToAddEditCar()}>
              <Layout layout="row" align="center">
                <Text color="primary" transform="uppercase" spacer={{ r: 'xs' }}>
                  {t('add')}
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
            <CarNumberPlaceholder />
          </If>

          <If condition={loaded}>
            <FlatList
              data={myCars}
              ItemSeparatorComponent={() => <Line spacer={{ y: 'lg' }} />}
              ListEmptyComponent={() => <NoData message={t('no_data_text')} />}
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

      <Button type="link" size="sm" onPress={logoutHandler}>
        {t('logout')}
      </Button>
    </Container>
  );
};

export default withTheme(Profile);
