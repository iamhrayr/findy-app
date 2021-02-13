import React from 'react';
import {
  Select as MagnusSelect,
  SelectProps,
  Icon,
  SelectRef,
} from 'react-native-magnus';
import Button, { Props as ButtonProps } from '../Button';

type Props = {
  buttonProps?: ButtonProps;
  children: React.ReactNode;
} & SelectProps;

const Select = ({ children, buttonProps, ...rest }: Props) => {
  const selectRef = React.createRef<SelectRef>();

  return (
    <>
      <Button
        ghost
        color="gray600"
        textTransform="none"
        suffix={
          <Icon name="keyboard-arrow-down" fontFamily="MaterialIcons" fontSize={20} />
        }
        onPress={() => selectRef.current?.open()}
        {...buttonProps}>
        {children}
      </Button>

      <MagnusSelect ref={selectRef} {...rest} />
    </>
  );
};

Select.Option = MagnusSelect.Option;

export default Select;
