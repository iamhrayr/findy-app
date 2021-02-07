import React from 'react';
import { Button as BaseButton, ButtonProps, useTheme } from 'react-native-magnus';

type Props = ButtonProps & {
  size?: keyof typeof SIZES;
  outline?: boolean;
  ghost?: boolean;
};

const SIZES = {
  sm: {
    // p: 'lg',
    // fontSize: 'lg',
  },
  md: {
    // p: 'md',
    // fontSize: 'xl',
  },
  xl: {
    // p: 'xl',
    // fontSize: '2xl',
  },
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
        ...SIZES[size],
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
