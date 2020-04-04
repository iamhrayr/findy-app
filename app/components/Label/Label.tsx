import { memo } from 'react';
import styled, { css } from 'styled-components/native';
import Text from '../Text';

const Label = styled(Text)`
  ${({ theme }) => css`
    opacity: ${theme.form.label.opacity};
    color: ${theme.form.label.color};
  `}
`;

export default memo(Label);
