import { auth } from '@/auth';
import { ConfirmProvider } from '@/context/ConfirmContext';

import { ModalContextProvider } from '@/context/modal.context';
import NextAuthProvider from '@/provider/nextAuthProvider/nextAuthProvider';
import TanstackQueryProvider from '@/provider/tanstackQueryProvider/TanstackQueryProvider';
import SetAuthInfo from '@/utils/setAuthInfo/setAuthInfo';
import { PropsWithChildren } from 'react';
import StoreProvider from '@/provider/reduxProvider/storeProvider';

const CompoundProvider = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  console.log(session, 'session');

  const accessToken = session?.user.accessToken || '';
  const trackName = session?.user.trackName || '';
  const trackLabel = session?.user.trackLabel || '';
  const trackRole = session?.user.trackRole || '';
  const period = String(session?.user.loginPeriod) || '';
  const nickname = session?.user.nickname || '';
  const username = session?.user.username || '';
  const birth = session?.user.birth || '';
  const profileImg = session?.user.profileImg || '';
  const myRoles = session?.user.myRoles || [];
  const email = session?.user.email || '';

  return (
    <StoreProvider>
      <TanstackQueryProvider>
        <ModalContextProvider>
          <ConfirmProvider>
            <SetAuthInfo
              accessToken={accessToken}
              trackName={trackName}
              trackLabel={trackLabel}
              trackRole={trackRole}
              period={String(period)}
              nickname={nickname}
              username={username}
              birth={birth}
              profileImg={profileImg}
              myRoles={myRoles}
              email={email}
            />
            <NextAuthProvider>{children}</NextAuthProvider>
          </ConfirmProvider>
        </ModalContextProvider>
      </TanstackQueryProvider>
    </StoreProvider>
  );
};

export default CompoundProvider;
