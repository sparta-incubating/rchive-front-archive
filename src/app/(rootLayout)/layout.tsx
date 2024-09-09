import { PropsWithChildren } from 'react';
import Toast from '@/components/molecules/toast';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <Toast />
    </>
  );
};

export default RootLayout;
