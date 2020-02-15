import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

type Props = {
  noPadding?: boolean;
};

const Container = styled(ScrollView)<Props>`
  padding: ${({ noPadding, theme }) =>
    noPadding ? 0 : theme.container.padding}px;
  flex: 1;
`;

export default Container;
