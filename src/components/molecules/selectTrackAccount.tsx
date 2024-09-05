'use client';

import { useState } from 'react';

import Button from '../atoms/button';

export type RoleList = {
  trackId: number;
  trackRoleEnum: string;
  trackName: string;
  period: number;
};

type SelectTrackAccountProps = {
  paginatedRoleList: RoleList[];
};

const SelectTrackAccount = ({ paginatedRoleList }: SelectTrackAccountProps) => {
  const [clickedId, setClickedId] = useState<number | null>(null);
  return (
    <>
      <main className="w-full border py-[100px]">
        <div className="h-auto border px-[40px]">
          <div className="grid grid-cols-3 gap-[42px] border px-[40px]">
            {paginatedRoleList.map((items: RoleList) => (
              <button key={items.trackId} onClick={() => alert('hi')}>
                <div
                  className={`flex h-[83px] w-[254px] items-center gap-[12px] rounded-[16px] px-[20px] text-2xl font-bold ${
                    clickedId === items.trackId
                      ? `border border-point-color bg-primary-50 text-point-color`
                      : `border text-gray-400`
                  }`}
                >
                  <p className="flex h-[42px] w-[70px] items-center justify-center rounded-[16px] bg-white">
                    {items.trackRoleEnum === 'STUDENT'
                      ? '수강생'
                      : items.trackRoleEnum}
                  </p>
                  <p className="w-[130px] border text-center">{`${items.trackName} ${items.period}기`}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
      <section className="flex justify-end border px-[40px]">
        <Button className="h-[60px] w-[190px]" onClick={() => alert('hiiii')}>
          확인
        </Button>
      </section>
    </>
  );
};

export default SelectTrackAccount;
