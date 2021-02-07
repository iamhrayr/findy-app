import React, { memo } from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { Box, Text } from 'react-native-magnus';

type Props = {
  value: string;
  cellCount: number;
  setValue: (value: string) => any;
};

const CELL_COUNT = 4;

const VerificationCodeField = ({ value, cellCount, setValue }: Props) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [fieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <CodeField
      ref={ref}
      {...fieldProps}
      value={value}
      onChangeText={setValue}
      cellCount={cellCount}
      keyboardType="number-pad"
      renderCell={({ index, symbol, isFocused }) => (
        <Box
          key={index}
          w={60}
          h={60}
          borderWidth={1}
          borderColor={isFocused ? 'gray900' : 'gray500'}
          rounded="xl"
          justifyContent="center">
          <Text
            fontSize="5xl"
            textAlign="center"
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        </Box>
      )}
    />
  );
};

export default memo(VerificationCodeField);
