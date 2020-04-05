import React, { forwardRef } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';

import Text from '../Text';
import Label from '../Label';
import styled, { css } from 'styled-components/native';

import { SpacerProps, generateSpaces } from '../Spacer/Spacer';

type LabelProps = {};
type WrapperProps = { spacer: Partial<LabelProps> };

export type Props = TextInputProps & {
  label?: React.ReactNode;
  labelProps?: LabelProps;
  spacer?: Partial<SpacerProps>;
  errorMessage?: string | false | null;
  addonRight?: React.ReactNode;
  addonLeft?: React.ReactNode;
};

// TODO: add sizes for input component

const Wrapper = styled(View)<WrapperProps>`
  ${({ spacer, theme }) => css`
    /* spaces */
    ${generateSpaces(spacer, theme)}
  `}
`;

const InputContainer = styled(View)`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    border-color: ${theme.form.border.color};
    border-bottom-width: ${theme.form.border.width}px;
  `}
`;

const StyledInput = styled(TextInput)`
  flex: 1;
  height: 50px; /* TODO: take from theme variables */
`;

const ErrorMessage = styled(Text)`
  ${({ theme }) => css`
    margin-top: 5px;
    color: ${theme.colors.danger};
    font-size: ${theme.form.error.fontSize}px;
  `}
`;

const Input = (
  {
    spacer = { b: 'md' },
    label,
    labelProps,
    addonRight,
    addonLeft,
    errorMessage,
    ...props
  }: Props,
  ref: any,
) => {
  const labelContent =
    typeof label === 'string' ? <Label {...labelProps}>{label}</Label> : label;

  return (
    <Wrapper spacer={spacer}>
      {labelContent}
      <InputContainer>
        {addonLeft}
        <StyledInput {...props} ref={ref} />
        {addonRight}
      </InputContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Wrapper>
  );
};

export default forwardRef(Input);
