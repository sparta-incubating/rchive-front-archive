'use client';

import MainPage from '@/components/pages/mainPage';
import BookMarkPage from '@/components/pages/bookMarkPage';
import React, { useState } from 'react';
import MyProfile from '@/components/pages/myProfile';
import ProfileTabMenu from '@/components/atoms/profileTabMenu';

const BookMark = () => {
  const [isActive, setIsActive] = useState<string>('북마크 목록');

  return (
    <MainPage>
      <ProfileTabMenu />
      {isActive === '프로필 관리' ? <MyProfile /> : <BookMarkPage />}
    </MainPage>
  );
};

export default BookMark;
