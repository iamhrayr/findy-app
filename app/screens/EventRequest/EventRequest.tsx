import React from 'react';

import { Container, Content, Avatar, Layout, Text, Line, Button } from '@app/components';

const EventRequest = () => {
  return (
    <Container>
      <Content extraPadded>
        <Layout align="center">
          <Avatar
            clickable
            onPress={() => {}}
            // source={
            //   values.avatar && {
            //     uri: `data:${values.avatar.mime};base64,${values.avatar.data}`,
            //   }
            // }
          />
          <Text size="h2" spacer={{ t: 'sm' }}>
            Isaak Albenis
          </Text>
        </Layout>

        <Layout size={1} align="center" spacer={{ y: 'lg' }}>
          <Line vertical />
        </Layout>

        <Text align="center">
          <Text weight="600">Isaak Albenis</Text> needs to connect with you regarding your
          car <Text weight="600">77 SZ 877</Text>
        </Text>

        <Layout layout="row" justify="between" spacer={{ y: 'lg' }}>
          <Layout size={47}>
            <Button block outline shape="circle">
              Decline
            </Button>
          </Layout>
          <Layout size={6} />
          <Layout size={47}>
            <Button block shape="circle">
              Accept
            </Button>
          </Layout>
        </Layout>
      </Content>
    </Container>
  );
};

export default EventRequest;
