'use client';

import MyPageHeader from '@/components/molecules/mypageHeader';
import MainPage from '@/components/pages/mainPage';
import MyProfile from '@/components/pages/myProfile';
import React, { useState } from 'react';
import BookMark from '../bookmark/page';

const MyPage = () => {
  const [isActive, setIsActive] = useState<string>('프로필 관리');

  return (
    <MainPage>
      <MyPageHeader isActive={isActive} setIsActive={setIsActive} />
      {isActive === '프로필 관리' ? <MyProfile /> : <BookMark />}
    </MainPage>
  );
};

export default MyPage;
