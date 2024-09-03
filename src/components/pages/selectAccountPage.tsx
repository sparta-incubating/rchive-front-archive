'use client';

import React, { useState } from 'react';
import SelectTrackHeader from '../molecules/selectTrackHeader';
import SelectTrackAccount from '../molecules/selectTrackAccount';

const SelectAccountPage = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  return (
    <main className="flex h-screen w-full items-center justify-center bg-archive-gradient">
      <section className="flex h-[730px] w-[1200px] items-center justify-center rounded-[40px] border bg-white p-[10px] shadow-archiveShadow">
        <section className="h-[690px] w-[1157px] rounded-[40px] bg-blue-50">
          {/*1 */}
          <SelectTrackHeader />
          {/*1 */}

          {/*2 */}
          <SelectTrackAccount onGetId={handleSelect} />

          {/*버튼 */}
          <section className="flex h-[60px] justify-end px-[40px]">
            <button>확인</button>
            {/* <Button
              size="sm"
              className="w-[190px]"
              type="submit"
              onClick={handleSelect}
            >
              확인
            </Button> */}
          </section>
          {/*버튼 */}
        </section>
      </section>
    </main>
  );
};

export default SelectAccountPage;
