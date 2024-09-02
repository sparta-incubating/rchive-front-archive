import { PropsWithChildren } from 'react';
import CompoundProvider from '@/provider/compoundProvider';
import Toast from '@/components/molecules/toast';
import Container from '@/components/common/container';

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
      <Container>{children}</Container>
      <Toast />
    </CompoundProvider>
  );
};

export default RootLayout;
