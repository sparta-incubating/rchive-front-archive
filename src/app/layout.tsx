import type { Metadata } from 'next';
import './globals.css';
import CompoundProvider from '@/provider/compoundProvider';
import Toast from '@/components/molecules/toast';

export const metadata: Metadata = {
  title: '르탄이의 아카이브',
  description: '내일배움캠프 학습자료를 모아서 볼 수 있는 아카이브 서비스',
  icons: {
    icon: '/archive.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <CompoundProvider>
          {children}
          <Toast />
        </CompoundProvider>
      </body>
    </html>
  );
}
