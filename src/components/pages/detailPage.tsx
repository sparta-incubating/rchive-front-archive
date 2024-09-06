import Footer from '@/components/molecules/footer';
import { ReactNode } from 'react';

interface DetailPageProps {
  children: ReactNode;
  theme?: string;
}

const DetailPage = ({ children, theme }: DetailPageProps) => {
  return (
    <div className="flex flex-col">
      {children}
      <Footer theme={theme} />
    </div>
  );
};
export default DetailPage;
