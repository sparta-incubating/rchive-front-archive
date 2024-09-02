'use client';

import React from 'react';
import MainHeader from '../molecules/mainHeader';
import Footer from '../molecules/footer';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Container = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const path = usePathname();
  const session = useSession();
  const layout =
    !session || !['/login', '/role', '/role/result'].includes(path);
  return (
    <>
      {layout ? (
        <>
          <div className="mx-auto flex w-[1152px] flex-col">
            <MainHeader />
            {children}
          </div>
          <Footer />
        </>
      ) : (
        children
      )}
    </>
  );
};

export default Container;
