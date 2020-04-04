import React, { memo } from 'react';

import { Container, Content, Spacer } from '@app/components';
import { useHideTabBar } from '@app/hooks';

import PersonalDetailsForm from './PersonalDetailsForm';
import NotificationSettings from './NotificationSettings';

const EditProfile: React.FC = () => {
  useHideTabBar();

  return (
    <Container>
      <Content>
        <PersonalDetailsForm />
        <Spacer b="lg" />
        <NotificationSettings />
      </Content>
    </Container>
  );
};

export default memo(EditProfile);
