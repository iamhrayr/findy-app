/* global WebSocket */
import React, { useRef, useCallback, useReducer, useMemo, memo } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import useMount from 'react-use/lib/useMount';
import { useRoute, RouteProp } from '@react-navigation/native';
import camelCaseKeys from 'camelcase-keys';

import { Message } from '@app/models/Message';
import { RootState } from '@app/redux/rootReducer';
import { Container, Content, If, Spacer } from '@app/components';
import api from '@app/api';
import { useAsyncFn, useHideTabBar } from '@app/hooks';
import configs from '@app/configs';
import SingleMessage from './SingleMessage';
import MessagePlaceholder from './MessagePlaceholder';
import WriteMessage from './WriteMessage';

// TODO: I think RouteProps should be defined globally in the root navigator
type RoutePropType = RouteProp<{ 'Events:Event': { id: Id } }, 'Events:Event'>;

const initialState: Array<Message> = [];

function reducer(state: Array<Message>, action: any) {
  switch (action.type) {
    case 'add':
      return [action.message, ...state];
    default:
      return state;
  }
}

const Event = () => {
  const flatLsitRef = useRef<FlatList<any>>(null);

  const auth = useSelector((state: RootState) => state.auth);

  const { params } = useRoute<RoutePropType>();

  const wsEndpoint = `${configs.ws.url}chat/${params.id}/?token=${auth.accessToken}`;
  const wsRef = useRef<WebSocket>(new WebSocket(wsEndpoint));

  const [{ loading, res }, fetchMessages] = useAsyncFn(api.fetchThreadMessages);

  const [socketMessages, dispatchMessage] = useReducer(reducer, initialState);

  useHideTabBar();

  useMount(() => {
    fetchMessages(params.id);

    wsRef.current.onopen = () => {
      console.log('socket connection opened');
    };
    wsRef.current.onerror = e => {
      console.log('error', e);
    };
    wsRef.current.onclose = e => {
      console.log('connection closed', e, { code: e.code, reason: e.reason });
    };
    wsRef.current.onmessage = e => {
      const message = camelCaseKeys(JSON.parse(e.data));
      dispatchMessage({ type: 'add', message });
    };
  });

  const handleSendMessage = useCallback(message => {
    wsRef.current.send(JSON.stringify({ message }));
  }, []);

  // const allMessages = res ? [...socketMessages, ...res] : socketMessages;
  const allMessages = useMemo(
    () => (res ? [...socketMessages, ...res] : socketMessages),
    [res, socketMessages],
  );

  return (
    <Container>
      <Content as={View} full noPaddingY>
        <If condition={loading}>
          <Spacer t="md" />
          <MessagePlaceholder />
          <Spacer t="md" />
        </If>

        <If condition={res}>
          <FlatList
            inverted
            ref={flatLsitRef}
            data={allMessages}
            ListHeaderComponent={<Spacer t="md" />}
            ListFooterComponent={<Spacer t="md" />}
            renderItem={({ item }: { item: Message }) => (
              <SingleMessage
                isTypeReceived={item.sender !== auth.user?.pk}
                text={item.message}
                date={item.sentAt}
              />
            )}
            keyExtractor={item => String(item.pk)}
          />
        </If>
      </Content>

      <WriteMessage onSendMessage={handleSendMessage} />
    </Container>
  );
};

export default memo(Event);
