'use client';

import { useState } from 'react';

const MyPageHeader = () => {
  const [isActive, setIsActive] = useState<string>('프로필 관리');
  return (
    <header className="z-0 mx-auto flex h-[100px] w-full justify-center bg-white px-[144px] shadow-myPageBottomShadow">
      <button
        className={`justify-content flex w-[128px] items-center p-[18px] text-xl ${isActive === '북마크 관리' ? 'border-b-2 border-gray-900 font-semibold hover:cursor-pointer' : 'font-normal text-gray-400'}`}
        onClick={() => setIsActive('북마크 관리')}
      >
        북마크 목록
      </button>
      <button
        className={`justify-content flex w-[128px] items-center p-[18px] text-xl ${isActive === '프로필 관리' ? 'border-b-2 border-gray-900 font-semibold hover:cursor-pointer' : 'font-normal text-gray-400'}`}
        onClick={() => setIsActive('프로필 관리')}
      >
        프로필 관리
      </button>
    </header>
  );
};

export default MyPageHeader;
