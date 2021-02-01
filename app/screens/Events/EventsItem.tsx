import React, { useCallback, memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BoxNew, TextNew } from '@app/components';

type Props = {
  pk: Id;
  eventPk: Id;
  carNumber: string;
  sentAt: string;
  message: string;
};

const EventsItem = ({ carNumber, sentAt, message, eventPk }: Props) => {
  const navigation = useNavigation();
  const navigateToRegister = useCallback(() => {
    navigation.navigate('Events:Event', { id: eventPk, title: carNumber });
  }, [navigation, eventPk, carNumber]);

  return (
    <TouchableOpacity onPress={navigateToRegister}>
      <BoxNew>
        <BoxNew flexDirection="row" mb="s" alignItems="center">
          <BoxNew flex={1}>
            <TextNew variant="subtitle">{carNumber}</TextNew>
          </BoxNew>
          <TextNew variant="tiny">{sentAt}</TextNew>
        </BoxNew>

        <TextNew numberOfLines={2}>{message}</TextNew>
      </BoxNew>
    </TouchableOpacity>
  );
};

export default memo(EventsItem);
