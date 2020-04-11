import React, { useCallback } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  Layout,
  // Avatar,
  Text,
} from '@app/components';

type Props = {
  pk: Id;
  eventPk: Id;
  carNumber: string;
  sentAt: string;
  message: string;
};

const EventsItem = ({
  // participant,
  carNumber,
  sentAt,
  message,
  eventPk,
}: Props) => {
  const navigation = useNavigation();
  const navigateToRegister = useCallback(() => {
    navigation.navigate('Events:Event', { id: eventPk, title: carNumber });
  }, [navigation, eventPk, carNumber]);

  return (
    <TouchableWithoutFeedback onPress={navigateToRegister}>
      <View style={styles.container}>
        <Layout layout="row">
          <Layout spacer={{ b: 'md' }} size={1}>
            <Text size="sm">{carNumber}</Text>
          </Layout>
          <Text size="sm">{sentAt}</Text>
        </Layout>

        <Text numberOfLines={2}>{message}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default EventsItem;
