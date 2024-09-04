'use client';

import React, { useState } from 'react';
import SelectTrackHeader from '../molecules/selectTrackHeader';
import SelectTrackAccount from '../molecules/selectTrackAccount';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/storeConfig';
import { useSession } from 'next-auth/react';
import { patchLastConnectRole } from '@/api/client/authApi';
import axios from 'axios';

const SelectAccountPage = () => {
  const [selectedTrackName, setSelectedTrackName] = useState<string | null>(
    null,
  );
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
  const router = useRouter();
  const { update, data: session } = useSession();

  const { myRoles } = useAppSelector((state) => state.authSlice);

  const handleSelect = (trackName: string, period: number) => {
    setSelectedTrackName(trackName);
    setSelectedPeriod(period);
  };

  const handleLoginWithSelectedAccount = async () => {
    if (selectedTrackName && selectedPeriod !== null) {
      const selectedAccount = myRoles.find(
        (role) =>
          role.trackName === selectedTrackName &&
          role.period === selectedPeriod,
      );

      console.log(selectedPeriod, '선택된 정보');
      console.log(selectedAccount, '선택한 계정');

      if (selectedAccount) {
        try {
          await update({
            ...session,
            user: {
              ...session?.user,
              trackName: selectedAccount.trackName,
              period: selectedAccount.period,
            },
          });
          await patchLastConnectRole(
            selectedAccount.trackName,
            selectedAccount.period,
          );

          console.log(session?.user, '업데이트된 세션');
          router.refresh();
          router.push('/');
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(error);
          }
        }
      } else {
        alert('계정을 선택하세요.');
      }
    }
  };

  return (
    <main className="flex h-screen w-full items-center justify-center bg-archive-gradient">
      <section className="flex h-[730px] w-[1200px] items-center justify-center rounded-[40px] border bg-white p-[10px] shadow-archiveShadow">
        <section className="h-[690px] w-[1157px] rounded-[40px] bg-blue-50">
          <SelectTrackHeader />
          <SelectTrackAccount onGetId={handleSelect} />
          <section className="flex h-[60px] justify-end px-[40px]">
            <button
              className="w-[190px]"
              onClick={handleLoginWithSelectedAccount}
            >
              확인
            </button>
          </section>
        </section>
      </section>
    </main>
  );
};

export default SelectAccountPage;
