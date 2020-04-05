import React from 'react';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

import Input, { Props } from './Input';

const MaskedInput = ({
  type,
  options,
  checkText,
  onChangeText,
  refInput,
  includeRawValueInChangeText,
  value,
  ...props
}: TextInputMaskProps & Props) => (
  <TextInputMask
    type={type}
    options={options}
    checkText={checkText}
    onChangeText={onChangeText}
    refInput={refInput}
    value={value}
    includeRawValueInChangeText={includeRawValueInChangeText}
    customTextInput={Input}
    customTextInputProps={props}
  />
);

MaskedInput.defaultProps = {
  type: 'custom',
};

export default MaskedInput;
