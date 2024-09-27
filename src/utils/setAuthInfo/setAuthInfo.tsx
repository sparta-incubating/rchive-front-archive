'use client';

import { setAuth } from '@/redux/slice/auth.slice';
import { MyRoleDataType, trackRole } from '@/types/auth.types';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface SetAuthInfoProps {
  accessToken: string;
  trackName: string;
  trackLabel: string;
  trackRole: trackRole;
  period: string;
  nickname: string;
  username: string;
  birth: string;
  profileImg: string;
  myRoles: MyRoleDataType[];
  roleData: boolean;
  email: string;
}

const SetAuthInfo = ({
  accessToken,
  trackName,
  trackLabel,
  trackRole,
  period,
  nickname,
  username,
  birth,
  profileImg,
  myRoles,
  roleData,
  email,
}: SetAuthInfoProps) => {
  const dispatch = useDispatch();
  dispatch(
    setAuth({
      accessToken,
      trackName,
      trackLabel,
      trackRole,
      period,
      nickname,
      username,
      birth,
      profileImg,
      myRoles: myRoles,
      roleData,
      email,
    }),
  );

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
