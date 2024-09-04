'use client';

import { useState } from 'react';

const MyPageHeader = () => {
  const [isActive, setIsActive] = useState<string>('프로필 관리');
  return (
    <header className="shadow-myPageShadow mx-auto flex h-[100px] w-full justify-center border-b-4 border-gray-50 bg-white px-[144px]">
      <button
        className={`justify-content flex h-[102px] w-[128px] items-center p-[18px] text-xl ${isActive === '북마크 관리' ? 'border-b-2 border-gray-900 font-semibold hover:cursor-pointer' : 'font-normal text-gray-400'}`}
        onClick={() => setIsActive('북마크 관리')}
      >
        북마크 목록
      </button>
      <button
        className={`justify-content flex h-[102px] w-[128px] items-center p-[18px] text-xl ${isActive === '프로필 관리' ? 'border-b-2 border-gray-900 font-semibold hover:cursor-pointer' : 'font-normal text-gray-400'}`}
        onClick={() => setIsActive('프로필 관리')}
      >
        프로필 관리
      </button>
    </header>
  );
};

export default MyPageHeader;
