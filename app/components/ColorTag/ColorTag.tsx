import { View } from 'react-native';
import styled, { css } from 'styled-components/native';
import { s } from 'react-native-size-matters';

const ColorTag = styled(View)<{ color: string }>`
  ${({ color }) => css`
    background-color: ${color};
    width: ${s(100)}px;
    height: ${s(14)}px;
    border-radius: ${s(3)}px;
  `}
`;

ColorTag.defaultProps = {
  color: '#fff',
};

export default ColorTag;
