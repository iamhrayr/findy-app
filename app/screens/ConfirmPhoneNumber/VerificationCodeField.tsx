import React, { memo } from 'react';
import styled from 'styled-components/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { Text } from '@app/components';

type Props = {
  value: string;
  cellCount: number;
  setValue: (value: string) => any;
};

const CELL_COUNT = 4;

const Cell = styled(Text)<{ isFocused: boolean }>`
  width: 60px;
  height: 60px;
  line-height: 52px;
  margin-top: 10px;
  font-size: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.round}px;
  border-width: 2px;
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

export default memo(VerificationCodeField);
