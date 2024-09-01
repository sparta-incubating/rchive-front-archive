import { PropsWithChildren } from 'react';
import CompoundProvider from '@/provider/compoundProvider';
import MainHeader from '@/components/molecules/mainHeader';
import Footer from '@/components/molecules/footer';
import Toast from '@/components/molecules/toast';

/**
 * Root layout component
 * 여기에 Provider를 추가하거나 공통 Component(ex: Header, Footer)를 추가할 수 있습니다.
 *
 * @param{PropsWithChildren} children
 * @constructor
 */
const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <CompoundProvider>
      <div className="flex flex-col">
        <div className="mx-auto flex w-[1152px] flex-col">
          <MainHeader />
          {children}
        </div>
        <Footer />
      </div>
      <Toast />
    </CompoundProvider>
  );
};

export default RootLayout;
