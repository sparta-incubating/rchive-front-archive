import { auth } from '@/auth';
import { ConfirmProvider } from '@/context/ConfirmContext';

import { ModalContextProvider } from '@/context/modal.context';
import NextAuthProvider from '@/provider/nextAuthProvider/nextAuthProvider';
import StoreProvider from '@/provider/reduxProvider/storeProvider';
import TanstackQueryProvider from '@/provider/tanstackQueryProvider/TanstackQueryProvider';
import SetAuthInfo from '@/utils/setAuthInfo/setAuthInfo';
import { PropsWithChildren } from 'react';
import { getAllMyRoles } from '@/api/server/authApi';

const CompoundProvider = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  const accessToken = session?.user.accessToken || '';
  const trackName = session?.user.trackName || '';
  const trackRole = session?.user.trackRole || '';
  const period = String(session?.user.loginPeriod) || '';
  const getRoles = await getAllMyRoles();

  return (
    <StoreProvider>
      <TanstackQueryProvider>
        <ModalContextProvider>
          <ConfirmProvider>
            <SetAuthInfo
              accessToken={accessToken}
              trackName={trackName}
              trackRole={trackRole}
              period={String(period)}
              myRoles={getRoles?.data.data}
            />
            <NextAuthProvider>{children}</NextAuthProvider>
          </ConfirmProvider>
        </ModalContextProvider>
      </TanstackQueryProvider>
    </StoreProvider>
  );
};

export default CompoundProvider;
