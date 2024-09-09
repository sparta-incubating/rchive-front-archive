'use client';

import ProfileImage from '@/components/atoms/profile/profileImage';
import Image from 'next/image';
import ProfileDropDown from '@/components/atoms/profile/profileDropDown';
import ProfileDropDownItem from '@/components/atoms/profile/profileDropDownItem';
import ProfileDropDownItemCard from '@/components/atoms/profile/ProfileDropDownItemCard';
import useDropDownOpen from '@/hooks/useDropDownOpen';
import { useAppSelector } from '@/redux/storeConfig';
import { getTrackName } from '@/utils/setAuthInfo/post.util';
import { TrackType } from '@/types/posts.types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { patchLastConnectRole } from '@/api/client/authApi';
import { useQueryClient } from '@tanstack/react-query';

const HeaderProfileContainer = () => {
  const { isOpen, dropdownRef, handleClick } = useDropDownOpen();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { period, trackRole, myRoles, profileImg, username } = useAppSelector(
    (state) => state.authSlice,
  );

  const { update, data: session } = useSession();
  const handleToTrack = async (trackName: TrackType, period: number) => {
    await update({
      ...session,
      user: {
        ...session?.user,
        trackName,
        loginPeriod: period,
      },
    });

    try {
      await patchLastConnectRole(trackName, period);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
    window.location.reload();
  };

  return (
    <article
      className="relative flex cursor-pointer gap-2.5 rounded-[14px] border border-gray-100 bg-gray-50 p-2"
      onClick={handleClick}
    >
      <ProfileImage imageUrl={`/assets/icons/${profileImg}.svg`} size="sm" />

      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-gray-700">{username}님</span>
        <div
          data-clicked={true}
          className="flex h-3.5 w-3.5 rotate-0 items-center justify-center transition-transform duration-500 ease-in-out data-[clicked=false]:rotate-0"
        >
          <Image
            src={'/assets/icons/selectArrow.svg'}
            alt={'select arrow icon'}
            fill
          />
        </div>
      </div>
      <ProfileDropDown clicked={isOpen} ref={dropdownRef}>
        {myRoles.map((role) => (
          <ProfileDropDownItem
            variant="primary"
            selected={
              role.period === Number(period) && role.trackRoleEnum === trackRole
            }
            key={role.trackId + role.trackName}
            onClick={() => handleToTrack(role.trackName, role.period)}
          >
            <ProfileDropDownItemCard
              profileImage={`/assets/icons/${profileImg}.svg`}
              nickname={username}
              role={
                role.trackRoleEnum === 'STUDENT' ? '수강생' : role.trackRoleEnum
              }
              track={`${getTrackName(role.trackName as TrackType)} ${role.period}기`}
              selected={
                role.period === Number(period) &&
                role.trackRoleEnum === trackRole
              }
            />
          </ProfileDropDownItem>
        ))}
      </ProfileDropDown>
    </article>
  );
};
export default HeaderProfileContainer;
