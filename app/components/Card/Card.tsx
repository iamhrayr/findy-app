import { memo } from 'react';
import { View } from 'react-native';
import styled, { css } from 'styled-components/native';

type Props = {
  radius?: number;
  noShadow?: boolean;
  size?: number;
};

const CardWrapper = styled(View)<Props>`
  /* TODO: transfer all the data into theme configs */
  padding: 20px;
  background-color: #fff;

  ${({ size }) =>
    size &&
    css`
      flex: ${size};
    `}

  ${({ noShadow }) =>
    !noShadow &&
    css`
      shadow-color: ${({ theme }) => theme.colors.darkGray};
      shadow-opacity: 0.12;
      shadow-radius: 15px;
      shadow-offset: 0px 7px;
      elevation: 14;
    `};
  border-radius: ${({ radius }) => radius || 10}px;
`;

export default memo(CardWrapper);
