import Footer from '@/components/molecules/footer';
import { PropsWithChildren } from 'react';

const MainPage = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col">
      {children}
      <Footer />
    </div>
  );
};
export default MainPage;
