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

type KeyMap<T> = {
  [key: string]: T;
};

type NullableProps<T> = { [P in keyof T]: T[P] | null };

// Redux types
// interface BaseAction<T = any> {
//   type: string;
//   payload?: T;
// }
interface BaseAction {
  type: string;
}
interface Action<Payload = any> extends BaseAction {
  payload: Payload;
  error?: boolean;
}
interface ActionMeta<Payload, Meta> extends Action<Payload> {
  meta: Meta;
}
