import { View } from 'react-native';
import styled, { css } from 'styled-components/native';

const ColorTag = styled(View)<{ color: string }>`
  ${({ color }) => css`
    background-color: ${color};
    width: 100px;
    height: 14px;
    border-radius: 3px;
  `}
`;

ColorTag.defaultProps = {
  color: '#fff',
};

export default ColorTag;
