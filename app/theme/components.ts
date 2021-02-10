export default {
  components: {
    Text: {
      fontSize: 'xl',
      color: 'gray800',
      variants: {
        label: {
          mb: 'sm',
          textTransform: 'uppercase',
          color: 'gray500',
          fontWeight: '600',
        },
      },
    },
    Button: {
      textTransform: 'uppercase',
      rounded: 'circle',
      fontSize: 'xl',
      variants: {
        primary: {
          bg: 'primary',
          borderColor: 'primary',
        },
        secondary: {
          bg: 'secondary',
          borderColor: 'secondary',
        },
        danger: {
          bg: 'red600',
          borderColor: 'red600',
        },
        success: {
          bg: 'green600',
          borderColor: 'green600',
        },
      },
    },
    Input: {
      variants: {
        regular: {},
        underline: {
          borderColor: 'transparent',
          bg: 'transparent',
          borderBottomColor: 'gray400',
          px: 'none',
          borderBottomWidth: 1,
        },
      },
    },
  },
};
