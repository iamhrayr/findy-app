import React, { useCallback, memo } from 'react';
import {
  // StyleSheet,
  TouchableWithoutFeedback,
  // View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  View,
  Text,
  Avatar,
  KeyboardAwareFlatList,
  Incubator,
} from 'react-native-ui-lib';

// import {
// Layout,
// Avatar,
// Text,
// } from '@app/components';

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
    <Incubator.TouchableOpacity onPress={navigateToRegister}>
      <View>
        <View row>
          <View marginB-10 flex-1>
            <Text text70M primary>
              {carNumber}
            </Text>
          </View>
          <Text text90L grey30>
            {sentAt}
          </Text>
        </View>

        <Text numberOfLines={2}>{message}</Text>
      </View>
    </Incubator.TouchableOpacity>
  );
};

export default memo(EventsItem);
