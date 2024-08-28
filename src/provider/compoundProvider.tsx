import { PropsWithChildren } from 'react';
import StoreProvider from '@/provider/storeProvider';
import TanstackQueryProvider from '@/provider/tanstackQueryProvider/TanstackQueryProvider';
import NextAuthProvider from '@/provider/nextAuthProvider/nextAuthProvider';

const CompoundProvider = async ({ children }: PropsWithChildren) => {
  // login 완료되면 주석 해제하세요.
  /*const session = await auth();
  const accessToken = session?.user.accessToken || '';
  const trackName = session?.user.trackName || '';
  const trackRole = session?.user.trackRole || 'USER';
  const period = String(session?.user.loginPeriod) || '';*/
  return (
    <StoreProvider>
      <TanstackQueryProvider>
        {/*<SetAuthInfo
          accessToken={accessToken}
          trackName={trackName}
          trackRole={trackRole}
          period={String(period)}
        />*/}
        <NextAuthProvider>{children}</NextAuthProvider>
      </TanstackQueryProvider>
    </StoreProvider>
  );
};

export default CompoundProvider;
