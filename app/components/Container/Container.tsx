import React from 'react';
import { ScrollView, View, ViewProps } from 'react-native';
import styled, { css } from 'styled-components/native';

type Props = ViewProps & {
  noPadding?: boolean;
  scrollView?: boolean;
  extraPadded?: boolean;
  children?: React.ReactNode;
};

const Container = styled(View)<Props>`
  ${({ noPadding, extraPadded, theme }) => css`
    padding: ${noPadding ? 0 : theme.container.padding}px;
    ${extraPadded && `padding: ${theme.container.padding}px`};
    flex: 1;
    background: ${theme.container.bgColor};
  `}
  ${({ extraPadded, theme }) =>
    extraPadded &&
    css`
      padding: ${theme.container.paddingExtra}px;
    `}
`;

const ContainerOuter = ({ scrollView, ...rest }: Props) => {
  return scrollView ? <Container as={ScrollView} {...rest} /> : <Container {...rest} />;
};

export default ContainerOuter;
