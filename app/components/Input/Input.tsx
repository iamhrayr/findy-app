import React, { memo } from 'react';

import {
  Box,
  Text,
  TextProps,
  Input as BaseInput,
  InputProps,
} from 'react-native-magnus';

export type Props = InputProps & {
  label?: React.ReactNode;
  errorMessage?: string | false | null;
  labelProps?: TextProps;
  errorMessageProps?: TextProps;
};

const Input = ({
  label,
  labelProps,
  errorMessage,
  errorMessageProps,
  ...props
}: Props) => {
  const { m, mb, mt, ml, mr, p, pt, pb, pl, pr, ...rest } = props;
  const labelContent =
    typeof label === 'string' ? (
      <Text variant="label" {...labelProps}>
        {label}
      </Text>
    ) : (
      label
    );

  return (
    <Box {...{ m, mb, mt, ml, mr, p, pt, pb, pl, pr }}>
      {labelContent}
      <BaseInput {...rest} />
      {errorMessage && (
        <Text color="red500" mt="md" fontSize="lg" {...errorMessageProps}>
          {errorMessage}
        </Text>
      )}
    </Box>
  );
};

Input.defaultProps = {
  variant: 'underline',
};

export default memo<Props>(Input);
