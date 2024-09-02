'use client';

import { setAuth } from '@/redux/slice/auth.slice';
import { LastConnectRoleDataType, trackRole } from '@/types/auth.types';
import { TrackType } from '@/types/posts.types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface SetAuthInfoProps {
  accessToken: string;
  trackName: TrackType;
  trackRole: trackRole;
  period: string;
  myRoles: LastConnectRoleDataType | undefined;
}

const SetAuthInfo = ({
  accessToken,
  trackName,
  trackRole,
  period,
  myRoles,
}: SetAuthInfoProps) => {
  const dispatch = useDispatch();
  dispatch(
    setAuth({
      accessToken,
      trackName,
      trackRole,
      period,
      myRoles: myRoles || undefined,
    }),
  );
  /*
    {
      "trackId": 11,
      "trackRoleEnum": "PM",
      "trackName": "ANDROID",
      "period": 1
    },
   */

  const router = useRouter();
  useEffect(() => {
    const handleAuthError = () => {
      router.push('/login');
    };

    window.addEventListener('AUTH_ERROR', handleAuthError);

    return () => {
      window.removeEventListener('AUTH_ERROR', handleAuthError);
    };
  }, [router]);

  return null;
};
export default SetAuthInfo;
