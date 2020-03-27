/* global WebSocket */
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import useMount from 'react-use/lib/useMount';
import { useRoute, RouteProp } from '@react-navigation/native';

import { RootState } from '@app/redux/rootReducer';
import { Container, Content, If } from '@app/components';
import api from '@app/api';
import { useAsyncFn } from '@app/hooks';
import configs from '@app/configs';

import Message from './Message';
import MessagePlaceholder from './MessagePlaceholder';

// TODO: I think RouteProps should be defined globally in the root navigator
type RoutePropType = RouteProp<{ 'Events:Event': { id: Id } }, 'Events:Event'>;

const Event = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { params } = useRoute<RoutePropType>();

  const wsEndpoint = `${configs.ws.url}chat/${params.id}/?token=${accessToken}`;
  const wsRef = useRef<WebSocket>(new WebSocket(wsEndpoint));

  const [{ loading, res }, fetchMessages] = useAsyncFn(api.fetchThreadMessages);

  useMount(() => {
    fetchMessages(params.id);

    wsRef.current.onopen = () => {
      console.log('socket connection opened');
    };
    // wsRef.current.onerror = e => {
    //   console.log('error', e);
    // };
    // wsRef.current.onclose = e => {
    //   console.log('connection closed', {code: e.code, reason: e.reason});
    // };
    // wsRef.current.onmessage = e => {
    //   console.log('incoming message', e);
    // };
  });

  return (
    <Container>
      <Content>
        <If condition={loading}>
          <MessagePlaceholder />
        </If>

        <If condition={res}>
          <Message
            isTypeReceived
            text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
          tempor invidunt ut labore et dolore"
          />
          <Message isTypeReceived text="Elitr, sed diam nonumy eirmod" />
          <Message text="Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore" />
          <Message text="Sed diam nonumy eirmod tempor" />
          <Message text="Elitr, sed diam nonumy eirmod" />
        </If>
      </Content>
    </Container>
  );
};

export default Event;
