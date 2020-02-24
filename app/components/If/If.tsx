import React from 'react';

const If = ({
  condition,
  children,
}: {
  condition: any;
  children: React.ReactNode;
}): any => {
  if (condition) {
    return children;
  }
  return null;
};

export default If;
