// import React from 'react';
// import { TouchableOpacity, View } from 'react-native';
// import {
//   useRestyle,
//   spacing,
//   border,
//   backgroundColor,
//   SpacingProps,
//   BorderProps,
//   BackgroundColorProps,
// } from '@shopify/restyle';

// import Text from '../TextNew';
// import { Theme } from '@app/theme-new';

// type Props = SpacingProps<Theme> &
//   BorderProps<Theme> &
//   BackgroundColorProps<Theme> & {
//     label: string;
//     onPress: () => void;
//   };

// const Button = ({ onPress, label, ...rest }: Props) => {
//   const props = useRestyle([spacing, border, backgroundColor], rest);

//   return (
//     <TouchableOpacity onPress={onPress}>
//       <View {...props}>
//         <Text variant="body">{label}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default Button;
