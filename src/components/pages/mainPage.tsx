'use client';

import MainHeader from '@/components/molecules/mainHeader';
import Footer from '@/components/molecules/footer';
import { PropsWithChildren } from 'react';

import MyProfile from './myProfile';
import { usePathname } from 'next/navigation';

const MainPage = ({ children }: PropsWithChildren) => {
  const path = usePathname();

  return (
    <div className="flex flex-col">
      {path === '/mypage' ? (
        <main className="relative mx-auto flex w-full flex-col items-center justify-center">
          <section className="w-[1152px]">
            <MainHeader />
          </section>
          <MyProfile />
        </main>
      ) : (
        <div className="relative mx-auto flex w-[1152px] flex-col">
          <MainHeader />
          {children}
        </div>
      )}
      <Footer />
    </div>
  );
};
export default MainPage;
