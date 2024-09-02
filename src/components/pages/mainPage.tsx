import MainHeader from '@/components/molecules/mainHeader';
import Footer from '@/components/molecules/footer';
import { PropsWithChildren } from 'react';

const MainPage = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col">
      <div className="mx-auto flex w-[1152px] flex-col">
        <MainHeader />
        {children}
      </div>
      <Footer />
    </div>
  );
};
export default MainPage;
