import React from 'react';
import { Button as BaseButton, ButtonProps, useTheme } from 'react-native-magnus';

type Props = ButtonProps & {
  size?: string | number;
  outline?: boolean;
  ghost?: boolean;
};

const getSizes = (size: string | number) => {
  if (!size) {
    return;
  }

  return {
    p: size,
    fontSize: size,
    loaderSize: size,
  };
};

const Button = ({ size, outline, ghost, ...rest }: Props) => {
  const { theme } = useTheme();

  const computedProps = React.useMemo(() => {
    let newProps = { ...rest };

    const { variant, bg } = rest;

    if (outline && variant) {
      const variants = theme.components?.Button?.variants ?? {};
      newProps = {
        ...newProps,
        bg: 'transparent',
        borderWidth: 1,
        borderColor: bg ?? variants[variant].bg,
        color: bg ?? variants[variant].bg,
      };
    }

    if (ghost && variant) {
      const variants = theme.components?.Button?.variants ?? {};
      newProps = {
        ...newProps,
        bg: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent',
        color: bg ?? variants[variant].bg,
      };
    }

    if (size) {
      newProps = {
        ...getSizes(size),
        ...newProps,
      };
    }

    return newProps;
  }, [ghost, outline, rest, size, theme.components]);

  return <BaseButton {...computedProps} />;
};

Button.defaultProps = {
  variant: 'primary',
};

export default Button;
