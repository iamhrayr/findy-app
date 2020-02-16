import { ScrollView, ScrollViewProps } from 'react-native';
import styled, { css } from 'styled-components/native';

type Props = ScrollViewProps & {};

const Container = styled(ScrollView)`
  ${({ theme }) => css`
    background: ${theme.content.bgColor};
  `}
`;

Container.defaultProps = {
  contentContainerStyle: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },
};

export default Container;
