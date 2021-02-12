/* global WebSocket */
import React, { useRef, useCallback, useReducer, useMemo, memo } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import useMount from 'react-use/lib/useMount';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import camelCaseKeys from 'camelcase-keys';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAwareScrollView,
  KeyboardAwareFlatList,
} from 'react-native-keyboard-aware-scroll-view';
import { Box } from 'react-native-magnus';

import { If, NoData } from '@app/components';
import { Message } from '@app/types/Message';
import { RootState } from '@app/redux/rootReducer';
import { withInteractionsComplete } from '@app/HoCs';
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

const INITIAL_FLATLIST_COUNT = 12;

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
    wsRef.current.onerror = (e) => {
      console.log('error', e);
    };
    wsRef.current.onclose = (e) => {
      console.log('connection closed', e, { code: e.code, reason: e.reason });
    };
    wsRef.current.onmessage = (e) => {
      const message = camelCaseKeys(JSON.parse(e.data));
      dispatchMessage({ type: 'add', message });
    };
  });

  const handleSendMessage = useCallback((message) => {
    wsRef.current.send(JSON.stringify({ message }));
  }, []);

  // const allMessages = res ? [...socketMessages, ...res] : socketMessages;
  const allMessages = useMemo(
    () => (res ? [...socketMessages, ...res] : socketMessages),
    [res, socketMessages],
  );

  const renderNoData = useCallback(() => <NoData message={t('no_data_text')} />, [t]);
  const renderItem = useCallback(
    ({ item }: { item: Message }) => (
      <SingleMessage
        isTypeReceived={item.sender !== auth?.user?.pk}
        text={item.message}
        date={item.sentAt}
      />
    ),
    [auth],
  );
  const extractKey = useCallback((item) => String(item.pk), []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={sytles.scrollView}
      extraHeight={200}
      scrollEnabled={false}>
      <Box bg="white" px="lg" flex={1}>
        <If condition={loading}>
          <MessagePlaceholder />
        </If>

        <If condition={res}>
          <KeyboardAwareFlatList
            inverted
            // scrollEnabled={false}
            data={allMessages}
            ListEmptyComponent={renderNoData}
            ListHeaderComponent={<Box mt="md" />}
            ListFooterComponent={<Box mt="md" />}
            initialNumToRender={INITIAL_FLATLIST_COUNT}
            renderItem={renderItem}
            keyExtractor={extractKey}
          />
        </If>
      </Box>

      <Box>
        <WriteMessage onSendMessage={handleSendMessage} />
      </Box>
    </KeyboardAwareScrollView>
  );
};

const sytles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

export default withInteractionsComplete(memo(Event));
