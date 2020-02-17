import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import Text from '../Text';
import styled, { css } from 'styled-components/native';

import { SpacerProps, generateSpaces } from '../Spacer/Spacer';

type LabelProps = {};
type WrapperProps = { spacer: Partial<LabelProps> };

type Props = TextInputProps & {
  label: React.ReactNode;
  labelProps?: LabelProps;
  spacer?: Partial<SpacerProps>;
  errorMessage?: string | false | null;
};

// TODO: add sizes for input component

const Wrapper = styled(View)<WrapperProps>`
  ${({ spacer, theme }) => css`
    /* spaces */
    ${generateSpaces(spacer, theme)}
  `}
`;

const Label = styled(Text)<LabelProps>`
  ${({ theme }) => css`
    opacity: ${theme.form.label.opacity};
    color: ${theme.form.label.color};
  `}
`;

const StyledInput = styled(TextInput)`
  ${({ theme }) => css`
    border-color: ${theme.form.border.color};
    border-bottom-width: ${theme.form.border.width}px;
    height: 50px; /* TODO: take from theme variables */
  `}
`;

const ErrorMessage = styled(Text)`
  ${({ theme }) => css`
    margin-top: 5px;
    color: ${theme.colors.danger};
    font-size: ${theme.form.error.fontSize}px;
  `}
`;

const Input = ({
  spacer = { b: 'md' },
  label,
  labelProps,
  errorMessage,
  ...props
}: Props) => {
  const labelContent =
    typeof label === 'string' ? <Label {...labelProps}>{label}</Label> : label;

  return (
    <Wrapper spacer={spacer}>
      {labelContent}
      <StyledInput {...props} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Wrapper>
  );
};

export default Input;
