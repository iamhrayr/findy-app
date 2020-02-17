declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.html' {
  const value: string;
  export default value;
}

declare module 'react-native-render-html' {
  const value: any;
  export default value;
}

type FormikOnCange = (value: string) => void;
