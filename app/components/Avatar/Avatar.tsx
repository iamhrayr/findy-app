import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ViewProps,
  TouchableOpacityProps,
  ImageURISource,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import { s } from 'react-native-size-matters';

import noAvatarImg from '@app/assets/no-avatar.png';

type Props = {
  source?: ImageURISource;
  clickable?: boolean;
  size?: number | string;
  circle?: boolean;
} & (TouchableOpacityProps | ViewProps);

const DEFAULT_SIZE = s(100);

const AvatarWrapper = styled(View)<Props>`
  ${({ size = DEFAULT_SIZE }) => css`
    width: ${size}px;
    height: ${size}px;
  `}
`;

const AvatarImage = styled(Image)<Props>`
  ${({ size = DEFAULT_SIZE, circle }) => css`
    width: ${size}px;
    height: ${size}px;
    border-radius: ${circle ? size : Number(size) / 5}px;
  `}
`;

const Avatar = ({ source, clickable, circle, ...rest }: Props) => {
  const avatarSource = source && source.uri ? source : noAvatarImg;

  return (
    <AvatarWrapper {...rest} as={clickable ? TouchableOpacity : View}>
      <AvatarImage source={avatarSource} size={rest.size} circle={circle} />
    </AvatarWrapper>
  );
};

export default Avatar;
