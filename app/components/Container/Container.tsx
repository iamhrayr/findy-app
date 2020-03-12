import { View, ViewProps } from 'react-native';
import styled, { css } from 'styled-components/native';

type Props = ViewProps & {};

const Container = styled(View)`
  ${({ theme }) => css`
    background: ${theme.content.bgColor};
    flex: 1;
  `}
`;

export default Container;
