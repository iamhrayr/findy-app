import { View } from 'react-native';
import styled, { css } from 'styled-components/native';
import { s } from 'react-native-size-matters';

type Props = {
  radius?: number;
  noShadow?: boolean;
  size?: number;
};

const CardWrapper = styled(View)<Props>`
  /* TODO: transfer all the data into theme configs */
  padding: ${s(20)}px;
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
      shadow-radius: ${s(15)}px;
      shadow-offset: 0px ${s(7)}px;
      elevation: 14;
    `};
  border-radius: ${({ radius }) => radius || s(10)}px;
`;

export default CardWrapper;
