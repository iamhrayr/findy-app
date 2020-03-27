import React from 'react';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

import Input, { Props } from './Input';

const MaskedInput = (props: TextInputMaskProps & Props) => (
  <TextInputMask {...props} customTextInput={Input} />
);

// const MaskedInput = React.forwardRef((props: TextInputMaskProps & Props, ref) => {
//   const innerRef = React.useRef(ref);
//   return <TextInputMask ref={innerRef} {...props} customTextInput={Input} />;
// });

MaskedInput.defaultProps = {
  type: 'custom',
};

export default MaskedInput;
