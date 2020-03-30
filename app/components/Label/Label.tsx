import Text from '../Text';
import styled, { css } from 'styled-components/native';

export const Label = styled(Text)`
  ${({ theme }) => css`
    opacity: ${theme.form.label.opacity};
    color: ${theme.form.label.color};
  `}
`;
export default Label;
