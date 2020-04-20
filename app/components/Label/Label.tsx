import { memo } from 'react';
import styled, { css } from 'styled-components/native';
import Text from '../Text';

type Props = {
  children?: React.ReactNode;
};

const Label = styled(Text)<Props>`
  ${({ theme }) => css`
    opacity: ${theme.form.label.opacity};
    color: ${theme.form.label.color};
  `}
`;

export default memo<Props>(Label);
