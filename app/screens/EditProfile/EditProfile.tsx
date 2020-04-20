import React, { memo } from 'react';

import { Container, Content, Spacer } from '@app/components';
import { withInteractionsComplete } from '@app/HoCs';
// import { useHideTabBar } from '@app/hooks';

import PersonalDetailsForm from './PersonalDetailsForm';
import NotificationSettings from './NotificationSettings';

const EditProfile: React.FC = () => {
  // useHideTabBar();

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

export default withInteractionsComplete(memo(EditProfile));
