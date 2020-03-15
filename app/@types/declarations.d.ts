// import React from 'react'

declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
declare module '*.png';
declare module '*.jpg';

declare module '*.html' {
  const value: string;
  export default value;
}

declare module 'react-native-render-html' {
  const value: any;
  export default value;
}

declare module 'react-native-countdown-component' {
  const value: any;
  export default value;
}

declare module 'react-native-color-palette' {
  const value: any;
  export default value;
}

declare function If(condition: any): any;
declare var Choose: any;
declare function When(condition: any): any;
declare var Otherwise: any;

type FormikOnCange = (value: string) => void;

type Id = string | number;
