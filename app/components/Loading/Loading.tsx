import React, { memo } from 'react';
import { View, Text } from 'react-native';

const Loading = () => {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default memo(Loading);
