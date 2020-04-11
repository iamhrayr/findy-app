import React from 'react';
import styled from 'styled-components/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { s } from 'react-native-size-matters';

import { Text } from '@app/components';

type Props = {
  value: string;
  cellCount: number;
  setValue: (value: string) => any;
};

const CELL_COUNT = 4;

const Cell = styled(Text)<{ isFocused: boolean }>`
  width: ${s(60)}px;
  height: ${s(60)}px;
  line-height: ${s(52)}px;
  margin-top: ${s(10)}px;
  font-size: ${s(24)}px;
  border-radius: ${({ theme }) => theme.borderRadius.round}px;
  border-width: ${s(2)}px;
  border-color: ${({ isFocused, theme }) =>
    isFocused ? theme.colors.darkGray : theme.colors.gray};
  text-align: center;
`;

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
        <Cell key={index} isFocused={isFocused} onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </Cell>
      )}
    />
  );
};

export default VerificationCodeField;
