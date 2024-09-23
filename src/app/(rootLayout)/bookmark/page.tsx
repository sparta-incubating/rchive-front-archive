'use client';

import MyPageHeader from '@/components/molecules/mypageHeader';
import MainPage from '@/components/pages/mainPage';
import BookMarkPage from '@/components/pages/bookMarkPage';
import React, { useState } from 'react';
import MyProfile from '@/components/pages/myProfile';

const BookMark = () => {
  const [isActive, setIsActive] = useState<string>('북마크 관리');

  return (
    <MainPage>
      <MyPageHeader isActive={isActive} setIsActive={setIsActive} />
      {isActive === '프로필 관리' ? <MyProfile /> : <BookMarkPage />}
    </MainPage>
  );
};

export default BookMark;
