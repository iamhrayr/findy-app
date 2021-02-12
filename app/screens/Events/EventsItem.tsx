import React, { useCallback, memo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Box } from 'react-native-magnus';

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
      <Box bg="white">
        <Box flexDir="row" mb="md">
          <Text fontSize="xl" fontWeight="500" flex={1}>
            {carNumber}
          </Text>
          <Text fontSize="md" color="gray700">
            {sentAt}
          </Text>
        </Box>

        <Text fontSize="lg" numberOfLines={2}>
          {message}
        </Text>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default memo(EventsItem);
