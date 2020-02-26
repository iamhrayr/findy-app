import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ViewProps,
  TouchableOpacityProps,
  ImageSourcePropType,
} from 'react-native';
import styled from 'styled-components/native';

import noAvatarImg from '@app/assets/no-avatar.png';

type Props = {
  source?: ImageSourcePropType | null;
  clickable?: boolean;
} & (TouchableOpacityProps | ViewProps);

const AvatarWrapper = styled(View)``;

const AvatarImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 20px;
`;

const Avatar = ({ source, clickable, ...rest }: Props) => {
  return (
    <AvatarWrapper {...rest} as={clickable ? TouchableOpacity : View}>
      <AvatarImage source={source || noAvatarImg} />
    </AvatarWrapper>
  );
};

export default Avatar;
