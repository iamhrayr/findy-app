import React from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';

import NoAvatarImg from '@app/assets/no-avatar.png';

type Props = {};

const AvatarWrapper = styled(View)``;

const AvatarImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 20px;
`;

const Avatar = () => {
  return (
    <AvatarWrapper>
      <AvatarImage source={NoAvatarImg} />
    </AvatarWrapper>
  );
};

export default Avatar;
