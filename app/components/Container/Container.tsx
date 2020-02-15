import { ScrollView } from 'react-native';
import styled, { css } from 'styled-components/native';

type Props = {
  noPadding?: boolean;
};

const Container = styled(ScrollView)<Props>`
  ${({ noPadding, theme }) => css`
    padding: ${noPadding ? 0 : theme.container.padding}px;
    flex: 1;
    background: ${theme.container.bgColor};
  `}
`;

export default Container;
