import { createBox } from '@shopify/restyle';
import { Theme } from '@app/theme-new';

const Box = createBox<Theme>();

Box.defaultProps = {
  bg: 'white',
};

export default Box;
