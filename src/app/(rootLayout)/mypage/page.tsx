import MyPageHeader from '@/components/molecules/myPageHeader';
import MainPage from '@/components/pages/mainPage';
import MyProfile from '@/components/pages/myProfile';
import React from 'react';

const MyPage = () => {
  return (
    <MainPage>
      <MyPageHeader />
      <MyProfile />
    </MainPage>
  );
};

export default MyPage;
