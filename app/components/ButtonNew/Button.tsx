// import {
//   ColorProps,
//   VariantProps,
//   createBox,
//   createRestyleComponent,
//   createVariant,
//   useTheme,
// } from '@shopify/restyle';
// import React from 'react';
// import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';

// import { Theme } from '@app/theme-new';
// import TextNew from '../TextNew';

// const BaseButton = createBox<Theme, TouchableOpacityProps>(TouchableOpacity);

// const ButtonMain = createRestyleComponent<
//   VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof BaseButton>,
//   Theme
// >([createVariant({ themeKey: 'buttonVariants' })], BaseButton);

// type Props = React.ComponentProps<typeof BaseButton> &
//   ColorProps<Theme> & {
//     children: React.ReactNode;
//     isLoading?: boolean;
//   };

// const Button = ({ children, isLoading, color, ...props }: Props) => {
//   const theme = useTheme<Theme>();

//   return (
//     <ButtonMain {...props}>
//       {/* <BaseButton flexDirection="row" {...props} borderRadius={100}> */}
//       <TextNew color={color} mr={isLoading ? 's' : undefined}>
//         {children}
//       </TextNew>
//       {isLoading ? <ActivityIndicator color={theme.colors.primary} /> : null}
//       {/* </BaseButton> */}
//     </ButtonMain>
//   );
// };

// // Button.defaultProps = {
// //   color: 'white',
// //   type: 'primary',
// // };

// export default Button;

import {
  ColorProps,
  TextProps,
  VariantProps,
  createRestyleComponent,
  createVariant,
  createBox,
  useTheme,
} from '@shopify/restyle';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Theme } from '@app/theme-new';
import TextNew from '../TextNew';

const BaseButton = createBox<Theme, TouchableOpacityProps>(TouchableOpacity);

const ButtonMain = createRestyleComponent<
  VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof BaseButton>,
  Theme
>(
  [
    createVariant({ themeKey: 'buttonVariants', property: 'variant' }),
    createVariant({ themeKey: 'buttonSizes', property: 'size' }),
  ],
  BaseButton,
);

type Props = React.ComponentProps<typeof BaseButton> &
  ColorProps<Theme> & {
    children: React.ReactNode;
    textTransform?: TextProps<Theme>['textTransform'];
    outline?: boolean;
    isLoading?: boolean;
  };

const Button: React.FC<Props> = ({
  children,
  isLoading,
  color,
  textTransform,
  outline,
  ...props
}: Props) => {
  const theme = useTheme<Theme>();

  return (
    <ButtonMain {...props} backgroundColor={outline ? 'transparent' : null}>
      <TextNew
        color={color}
        mr={isLoading ? 's' : undefined}
        textTransform={textTransform}>
        {children}
      </TextNew>
      {isLoading ? <ActivityIndicator color={theme.colors.primary} /> : null}
    </ButtonMain>
  );
};

Button.defaultProps = {
  variant: 'primary',
  color: 'white',
  size: 'xs',
  textTransform: 'uppercase',
  borderRadius: 100,
  alignItems: 'center',
  outline: true,
};

export default Button;
