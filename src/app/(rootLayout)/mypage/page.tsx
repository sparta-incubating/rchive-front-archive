'use client';

import MainPage from '@/components/pages/mainPage';
import MyProfile from '@/components/pages/myProfile';
import React, { useState } from 'react';
import BookMark from '../bookmark/page';
import ProfileTabMenu from '../test/profileTabMenu';

const MyPage = () => {
  const [isActive, setIsActive] = useState<string>('프로필 관리');

  return (
    <MainPage>
      <ProfileTabMenu />
      {isActive === '프로필 관리' ? <MyProfile /> : <BookMark />}
    </MainPage>
  );
};

export default MyPage;
