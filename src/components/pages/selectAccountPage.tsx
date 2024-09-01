'use client';

import React from 'react';
import SelectTrackHeader from '../molecules/selectTrackHeader';
import SelectTrackAccount from '../molecules/selectTrackAccount';
import Button from '../atoms/button';

import { useSession } from 'next-auth/react';

const SelectAccountPage = () => {
  const { data: session } = useSession();
  const name = session?.user?.name as string;

  return (
    <main className="flex h-screen w-full items-center justify-center bg-custom-gradient">
      <section className="flex h-[730px] w-[1200px] items-center justify-center rounded-[40px] border bg-white p-[10px] shadow-archiveShadow">
        <section className="h-[690px] w-[1157px] rounded-[40px] bg-blue-50">
          {/*1 */}
          {/*username={username}*/}
          <SelectTrackHeader name={name} />
          {/*1 */}

          {/*2 */}
          {/*session={session.track}*/}
          <SelectTrackAccount />

          {/*버튼 */}
          <section className="flex h-[60px] justify-end px-[40px]">
            <Button size="sm" className="w-[190px]" type="submit">
              확인
            </Button>
          </section>
          {/*버튼 */}
        </section>
      </section>
    </main>
  );
};

export default SelectAccountPage;
