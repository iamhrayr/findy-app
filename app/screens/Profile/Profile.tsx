import React, { useCallback, useEffect, memo } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import { Box, Text, Icon } from 'react-native-magnus';

import { Car } from '@app/types/Car';
import { profileSelectors } from '@app/redux/ducks/profile';
import { authSelectors, authActions } from '@app/redux/ducks/auth';
import { removeCar } from '@app/redux/ducks/profile/actions';
import { useNavigation } from '@react-navigation/native';
import { useAsyncFn } from '@app/hooks';
import api from '@app/api';
import { Button, NoData, If } from '@app/components';
import { withInteractionsComplete } from '@app/HoCs';
import { fetchMyCars as fetchMyCarsRedux } from '@app/redux/ducks/profile/actions';
import CarNumberRow from './CarNumberRow';
import UserDetails from './UserDetails';
import CarNumberPlaceholder from './CarNumberPlaceholder';

const INITIAL_FLATLIST_COUNT = 10;

const Profile = () => {
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
    (id) => {
      removeCarMutation(id).then(() => {
        dispatch(removeCar({ id }));
      });
    },
    [dispatch, removeCarMutation],
  );

  const logoutHandler = useCallback(() => {
    dispatch(authActions.logout());
  }, [dispatch]);

  const renderNoData = useCallback(() => <NoData message={t('no_data_text')} />, [t]);
  const renderLine = useCallback(() => <Box h={1} bg="gray300" my="xl" />, []);
  const extractKey = useCallback((item) => String(item.pk), []);
  const renderItem = useCallback(
    ({ item }: { item: Car }) => (
      <CarNumberRow
        data={item}
        navigateToEdit={navigateToAddEditCar}
        onRemove={removeCarHandler}
      />
    ),
    [navigateToAddEditCar, removeCarHandler],
  );

  return (
    <Box flex={1}>
      <UserDetails isAuthenticated={isAuthenticated} />

      <Box flex={1} mb="md" mx="md" bg="white" rounded="xl" p="xl" shadow="md">
        <Box flexDir="row" justifyContent="space-between" mb="md">
          <Text mb="sm">{t('profile:my_cars')}</Text>

          <TouchableOpacity onPress={() => navigateToAddEditCar()}>
            <Box flexDir="row" alignItems="center">
              <Text color="primary" textTransform="uppercase" mr="xs">
                {t('add')}
              </Text>
              <Icon name="plus" w={20} h={20} color="primary" />
            </Box>
          </TouchableOpacity>
        </Box>

        <If condition={loading}>
          <CarNumberPlaceholder />
        </If>

        <If condition={loaded}>
          <FlatList
            data={myCars}
            ItemSeparatorComponent={renderLine}
            ListEmptyComponent={renderNoData}
            initialNumToRender={INITIAL_FLATLIST_COUNT}
            renderItem={renderItem}
            keyExtractor={extractKey}
          />
        </If>
      </Box>

      <Button ghost fontSize="lg" alignSelf="center" onPress={logoutHandler}>
        {t('logout')}
      </Button>
    </Box>
  );
};

export default withInteractionsComplete(memo(Profile));
