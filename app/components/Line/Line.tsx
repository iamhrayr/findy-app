import { View } from 'react-native';
import styled, { css } from 'styled-components/native';

type Props = {
  vertical?: boolean;
  size?: string | number;
};

const Line = styled(View)<Props>`
  ${({ vertical, size, theme }) => css`
    ${vertical ? 'width' : 'height'}: 1px;
    flex: ${size || 1};
    background: ${theme.colors.gray};
    height: 100%;
  `}
`;

export default Line;
