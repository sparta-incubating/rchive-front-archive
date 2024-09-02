'use client';

import { setAuth } from '@/redux/slice/auth.slice';
import { MyRoleDataType, trackRole } from '@/types/auth.types';
import { TrackType } from '@/types/posts.types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface SetAuthInfoProps {
  accessToken: string;
  trackName: TrackType;
  trackRole: trackRole;
  period: string;
  nickname: string;
  username: string;
  birth: string;
  profileImg: string;
  myRoles: MyRoleDataType[];
}

const SetAuthInfo = ({
  accessToken,
  trackName,
  trackRole,
  period,
  nickname,
  username,
  birth,
  profileImg,
  myRoles,
}: SetAuthInfoProps) => {
  const dispatch = useDispatch();

  console.log('setauthinfo---------------------');
  console.log(nickname, username, birth, profileImg, myRoles);
  console.log('setauthinfo---------------------');

  dispatch(
    setAuth({
      accessToken,
      trackName,
      trackRole,
      period,
      nickname,
      username,
      birth,
      profileImg,
      myRoles: myRoles,
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
