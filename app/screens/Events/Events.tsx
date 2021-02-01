import React, { useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import useMount from 'react-use/lib/useMount';
// import { SwipeListView } from 'react-native-swipe-list-view';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';

import {
  Line,
  NoData,
  If,
  BoxNew,
  // Text, Layout
} from '@app/components';
import { withInteractionsComplete } from '@app/HoCs';
import { eventsSelectors, eventsActions } from '@app/redux/ducks/events';
import EventItem from './EventsItem';
import EventsPlaceholder from './EventsPlaceholder';

const INITIAL_FLATLIST_COUNT = 10;

const Events = () => {
  const dispatch = useDispatch();
  const events = useSelector(eventsSelectors.getEvents);
  const { loading, loaded } = useSelector(eventsSelectors.getEventsStatus);
  const { t } = useTranslation();

  const fetchData = useCallback(() => {
    dispatch(eventsActions.fetchEvents());
  }, [dispatch]);

  useMount(fetchData);

  useFocusEffect(useCallback(fetchData, [fetchData]));

  const renderLine = useCallback(() => <Line spacer={{ y: 'md' }} />, []);
  const renderNoData = useCallback(() => <NoData message={t('no_data_text')} />, [t]);
  const renderItem = useCallback(({ item }) => <EventItem {...item} />, []);
  const extractKey = useCallback((item) => String(item.pk), []);

  return (
    <BoxNew p="m" flex={1}>
      <If condition={loading}>
        <EventsPlaceholder />
      </If>

      <If condition={loaded}>
        <FlatList
          data={events}
          ItemSeparatorComponent={renderLine}
          ListEmptyComponent={renderNoData}
          renderItem={renderItem}
          keyExtractor={extractKey}
          onRefresh={fetchData}
          initialNumToRender={INITIAL_FLATLIST_COUNT}
          refreshing={loading}
        />
      </If>
    </BoxNew>
  );
};

export default withInteractionsComplete(memo(Events));
