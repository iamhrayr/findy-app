import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import useMount from 'react-use/lib/useMount';
import { SwipeListView } from 'react-native-swipe-list-view';

import {
  Container,
  Content,
  Line,
  NoData,
  If,
  // Text,
  // Layout
} from '@app/components';
import { eventsSelectors, eventsActions } from '@app/redux/ducks/events';
import EventItem from './EventsItem';
import EventsPlaceholder from './EventsPlaceholder';

const Events = () => {
  const dispatch = useDispatch();
  const events = useSelector(eventsSelectors.getEvents);
  const { loading, loaded } = useSelector(eventsSelectors.getEventsStatus);
  console.log({ loading, loaded });

  useMount(() => {
    dispatch(eventsActions.fetchEvents());
  });

  return (
    <Container>
      <Content as={View}>
        <If condition={loading}>
          <EventsPlaceholder />
        </If>

        <If condition={loaded}>
          <SwipeListView
            useFlatList
            disableRightSwipe
            closeOnRowPress
            data={events}
            ItemSeparatorComponent={() => <Line spacer={{ y: 'lg' }} />}
            ListEmptyComponent={() => <NoData message="There is not anything to show" />}
            renderItem={({ item }) => <EventItem {...item} />}
            keyExtractor={item => String(item.pk)}
            // renderHiddenItem={(data, rowMap) => (
            //   <Layout layout="row" style={{ backgroundColor: 'red' }} reverse>
            //     <Text>Hi</Text>
            //   </Layout>
            // )}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </If>
      </Content>
    </Container>
  );
};

export default Events;
