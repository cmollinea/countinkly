'use client';
import { AppProgressBar } from 'next-nprogress-bar';

export const ProgressBar = () => {
  return (
    <AppProgressBar
      height='4px'
      color='#525ceb'
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};
