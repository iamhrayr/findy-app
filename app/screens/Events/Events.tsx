import React from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import useMount from 'react-use/lib/useMount';

// import { Car } from '@app/models/Car';
import { Container, Content, Line, NoData, Loading, If } from '@app/components';
import { eventsSelectors, eventsActions } from '@app/redux/ducks/events';
// import avatarImage from '@app/assets/no-avatar.png';
import EventItem from './EventsItem';

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
          <Loading />
        </If>

        <If condition={loaded}>
          <FlatList
            // style={{ shrink: 1 }}
            data={events}
            // data={items}
            ItemSeparatorComponent={() => <Line spacer={{ y: 'lg' }} />}
            ListEmptyComponent={() => <NoData message="There is not anything to show" />}
            renderItem={({ item }) => <EventItem {...item} />}
            keyExtractor={item => String(item.pk)}
          />

          {/* <List
            virtualized
            bordered
            // data={items}
            data={events}
            keyExtractor={item => String(item.pk)}
            renderItem={item => <EventItem {...item} />}
          /> */}
        </If>
      </Content>
    </Container>
  );
};

export default Events;
