/* global WebSocket */
import React, { useRef, useCallback, useReducer, useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import useMount from 'react-use/lib/useMount';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import camelCaseKeys from 'camelcase-keys';
import { useTranslation } from 'react-i18next';

import { Message } from '@app/types/Message';
import { RootState } from '@app/redux/rootReducer';
import { Container, Content, If, Spacer, NoData, KeyboardShift } from '@app/components';
import api from '@app/api';
import { useAsyncFn } from '@app/hooks';
import configs from '@app/configs';
import SingleMessage from './SingleMessage';
import MessagePlaceholder from './MessagePlaceholder';
import WriteMessage from './WriteMessage';

// TODO: RouteProps should be defined globally in the root navigator
type RoutePropType = RouteProp<
  { 'Events:Event': { id: Id; title: string } },
  'Events:Event'
>;

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
  const { t } = useTranslation();
  const auth = useSelector((state: RootState) => state.auth);
  const { params } = useRoute<RoutePropType>();
  const navigation = useNavigation();

  const wsEndpoint = `${configs.ws.url}chat/${params.id}/?token=${auth.accessToken}`;
  const wsRef = useRef<WebSocket>(new WebSocket(wsEndpoint));

  const [{ loading, res }, fetchMessages] = useAsyncFn(api.fetchThreadMessages);

  const [socketMessages, dispatchMessage] = useReducer(reducer, initialState);

  useMount(() => {
    fetchMessages(params.id);
    navigation.setOptions({ title: params.title });

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
    <KeyboardShift extraSpace={20}>
      <Container>
        <Content full noPaddingY scrollable={false}>
          <If condition={loading}>
            <MessagePlaceholder />
          </If>

          <If condition={res}>
            <FlatList
              inverted
              data={allMessages}
              ListEmptyComponent={() => <NoData message={t('no_data_text')} />}
              ListHeaderComponent={<Spacer t="md" />}
              ListFooterComponent={<Spacer t="md" />}
              contentContainerStyle={sytles.flatList}
              renderItem={({ item }: { item: Message }) => (
                <SingleMessage
                  isTypeReceived={item.sender !== auth?.user?.pk}
                  text={item.message}
                  date={item.sentAt}
                />
              )}
              keyExtractor={item => String(item.pk)}
            />
          </If>

          <WriteMessage onSendMessage={handleSendMessage} />
        </Content>
      </Container>
    </KeyboardShift>
  );
};

const sytles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
});

export default Event;
