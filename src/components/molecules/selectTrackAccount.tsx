'use client';

import { useState } from 'react';

import Button from '../atoms/button';
import { useSession } from 'next-auth/react';
import { patchLastConnectRole } from '@/api/client/authApi';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/storeConfig';
import { SelectProfileRole } from '@/types/auth.types';

type SelectTrackAccountProps = {
  paginatedRoleList: SelectProfileRole[];
};

const SelectTrackAccount = ({ paginatedRoleList }: SelectTrackAccountProps) => {
  const { period, trackName } = useAppSelector((state) => state.authSlice);

  const [clickedPeriod, setClickPeriod] = useState<number>(parseInt(period));
  const [clickedTrackName, setClickedTrackName] = useState<string>(trackName);

  const router = useRouter();

  const handleClick = (id: number, name: string) => {
    setClickPeriod(id);
    setClickedTrackName(name);
  };

  const { update, data: session } = useSession();
  const handleToTrack = async (trackName: string, period: number) => {
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
    router.push('/');
    router.refresh();
  };

  return (
    <>
      <main className="w-full py-[100px]">
        <div className="h-auto px-[40px]">
          <div className="grid grid-cols-3 gap-[42px] px-[40px]">
            {paginatedRoleList.map((items: SelectProfileRole) => (
              <button
                key={items.trackId}
                onClick={() => handleClick(items.period, items.trackName.key)}
              >
                <div
                  className={`flex h-[83px] w-[254px] items-center gap-[12px] rounded-[16px] px-[20px] text-xl font-bold ${
                    clickedPeriod === items.period
                      ? `border-2 border-point-color bg-primary-50 text-point-color`
                      : `border-2 text-gray-400`
                  }`}
                >
                  <p className="flex h-[42px] w-[70px] items-center justify-center rounded-[16px] bg-white">
                    {items.trackRoleEnum === 'STUDENT'
                      ? '수강생'
                      : items.trackRoleEnum}
                  </p>
                  <p className="w-[130px] text-center">{`${items.trackName.key === 'SPRING_DEEP' ? '심화' : items.trackName.value} ${items.period}기`}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
      <section className="flex justify-end px-[40px]">
        <Button
          className="h-[60px] w-[190px]"
          onClick={() => handleToTrack(clickedTrackName, clickedPeriod)}
        >
          확인
        </Button>
      </section>
    </>
  );
};

export default SelectTrackAccount;
