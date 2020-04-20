import React, { memo } from 'react';

type Props = {
  condition: any;
  children?: React.ReactNode;
};

const If = ({ condition, children }: Props): any => {
  if (condition) {
    return children;
  }
  return null;
};

export default memo<Props>(If);
