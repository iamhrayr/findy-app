import React, { memo } from 'react';
import App from './App';

const HeadlessCheck = ({ isHeadless }: { isHeadless: boolean }) => {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
};

export default memo(HeadlessCheck);
