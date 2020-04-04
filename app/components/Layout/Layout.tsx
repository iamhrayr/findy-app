import { memo } from 'react';
import { View } from 'react-native';
import styled, { css } from 'styled-components/native';

import { SpacerProps, generateSpaces } from '../Spacer/Spacer';

enum JustifyOptions {
  start = 'flex-start',
  end = 'flex-end',
  center = 'center',
  between = 'space-between',
  around = 'space-around',
  default = 'flex-start',
}

enum AlignOptions {
  start = 'flex-start',
  end = 'flex-end',
  center = 'center',
  stretch = 'stretch',
  default = 'flex-start',
}

type Props = {
  layout?: 'row' | 'col';
  reverse?: boolean;
  size?: number;
  justify?: keyof typeof JustifyOptions;
  align?: keyof typeof AlignOptions;
  noShrink?: boolean;
  grow?: number;
  shrink?: number;
  spacer?: Partial<SpacerProps>;
};

const Layout = styled(View)<Props>`
  ${({ layout, reverse }) =>
    reverse
      ? `flex-direction: ${layout === 'col' ? 'column-reverse' : 'row-reverse'}`
      : `flex-direction: ${layout === 'col' ? 'column' : 'row'}`}

  ${({ justify, align, noShrink, spacer = {}, theme }) => css`
    justify-content: ${(justify && JustifyOptions[justify]) || JustifyOptions.default};
    align-items: ${(align && AlignOptions[align]) || AlignOptions.default};
    flex-shrink: ${noShrink ? 0 : 1};
    ${generateSpaces(spacer, theme)}
  `}

  ${({ size }) =>
    size &&
    css`
      flex: ${size};
    `}

  ${({ grow }) =>
    grow &&
    css`
      flex-grow: ${grow};
    `}

  ${({ shrink }) =>
    shrink &&
    css`
      flex-shrink: ${shrink};
    `}
`;

Layout.defaultProps = {
  layout: 'col',
  reverse: false,
  justify: 'start',
  align: 'stretch',
  noShrink: false,
  spacer: {},
};

export default memo(Layout);
