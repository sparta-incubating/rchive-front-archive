import React, { FC } from 'react';
import notFound from '@/../public/assets/icons/not-found.svg';
import Image from 'next/image';
import MainHeader from '@/components/molecules/mainHeader';
import Footer from '@/components/molecules/footer';

const NotFound: FC = () => {
  return (
    <>
      <div className="mx-auto flex min-h-screen w-[1152px] flex-col">
        <MainHeader />
        <div className="flex flex-grow items-center justify-center">
          <Image src={notFound} alt="not-found" width={270} height={258} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
