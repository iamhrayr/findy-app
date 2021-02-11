import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import { Box } from 'react-native-magnus';

import { withInteractionsComplete } from '@app/HoCs';
// import { useHideTabBar } from '@app/hooks';

import PersonalDetailsForm from './PersonalDetailsForm';
import NotificationSettings from './NotificationSettings';

const EditProfile: React.FC = () => {
  // useHideTabBar();

  return (
    <ScrollView>
      <Box p="lg">
        <PersonalDetailsForm />
        <Box mb="lg" />
        <NotificationSettings />
      </Box>
    </ScrollView>
  );
};

export default withInteractionsComplete(memo(EditProfile));
