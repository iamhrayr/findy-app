import { createText } from '@shopify/restyle';
import { Theme } from '@app/theme-new';

const Text = createText<Theme>();

Text.defaultProps = {
  variant: 'body',
};

export default Text;

// import {
//   createRestyleComponent,
//   createVariant,
//   spacing,
//   SpacingProps,
//   VariantProps,
// } from '@shopify/restyle';
// import { Theme } from '@app/theme-new';

// type Props = SpacingProps<Theme> & VariantProps<Theme, 'textVariants'>;

// const Card = createRestyleComponent<Props, Theme>([
//   spacing,
//   createVariant({ themeKey: 'textVariants' }),
// ]);

// export default Card;
